// Import auth module
import {
  supabase,
  getCurrentUser,
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  signInWithGitHub,
  signOut,
  checkAuth
} from './auth.js';

// ==========================================================================
// State
// ==========================================================================

let currentUser = null;

// ==========================================================================
// Utility Functions
// ==========================================================================

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function updateCardCount(columnId) {
  const column = document.querySelector(`[data-column-id="${columnId}"]`);
  const cardsContainer = column.querySelector('.cards-container');
  const cardCount = cardsContainer.querySelectorAll('.card').length;
  const countElement = column.querySelector('.card-count');
  countElement.textContent = cardCount;
}

function showError(message) {
  const errorElement = document.getElementById('auth-error');
  errorElement.textContent = message;
  errorElement.style.display = 'block';
  setTimeout(() => {
    errorElement.style.display = 'none';
  }, 5000);
}

// ==========================================================================
// Database Functions
// ==========================================================================

// Fetch all cards for current user
async function fetchCards() {
  if (!currentUser) return;

  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .eq('user_id', currentUser.id)
    .order('position', { ascending: true });

  if (error) {
    console.error('Error fetching cards:', error);
    return [];
  }

  return data;
}

// Create new card in database
async function createCardInDB(content, columnId) {
  console.log('createCardInDB called with:', { content, columnId, currentUser });

  if (!currentUser) {
    console.error('No current user - cannot create card');
    showError('로그인이 필요합니다.');
    return null;
  }

  // Get current card count for this column to determine position
  const { count, error: countError } = await supabase
    .from('cards')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', currentUser.id)
    .eq('column_id', columnId);

  const position = (count || 0) + 1;
  console.log('Next position for column', columnId, ':', position);

  const { data, error } = await supabase
    .from('cards')
    .insert({
      user_id: currentUser.id,
      content,
      column_id: columnId,
      position: position
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating card:', error);
    showError('카드 생성 실패: ' + error.message);
    return null;
  }

  console.log('Card created in DB successfully:', data);
  return data;
}

// Update card column in database
async function updateCardColumnInDB(cardId, newColumnId) {
  // Get current card count for the new column
  const { count, error: countError } = await supabase
    .from('cards')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', currentUser.id)
    .eq('column_id', newColumnId);

  const position = (count || 0) + 1;

  const { error } = await supabase
    .from('cards')
    .update({
      column_id: newColumnId,
      position: position
    })
    .eq('id', cardId)
    .eq('user_id', currentUser.id);

  if (error) {
    console.error('Error updating card:', error);
    showError('카드 이동 실패: ' + error.message);
    return false;
  }

  return true;
}

// Delete card from database
async function deleteCardFromDB(cardId) {
  const { error } = await supabase
    .from('cards')
    .delete()
    .eq('id', cardId)
    .eq('user_id', currentUser.id);

  if (error) {
    console.error('Error deleting card:', error);
    showError('Failed to delete card. Please try again.');
    return false;
  }

  return true;
}

// ==========================================================================
// Card Management (UI)
// ==========================================================================

function createCardElement(cardData) {
  const card = document.createElement('div');
  card.className = 'card';
  card.draggable = true;
  card.id = `card-${cardData.id}`;
  card.dataset.cardId = cardData.id;
  card.setAttribute('role', 'article');
  card.setAttribute('aria-label', `Task: ${cardData.content}`);

  card.innerHTML = `
    <span class="card-content">${escapeHtml(cardData.content)}</span>
    <button class="delete-btn" aria-label="Delete card">&times;</button>
  `;

  addCardEventListeners(card);

  return card;
}

function addCardEventListeners(card) {
  card.addEventListener('dragstart', handleDragStart);
  card.addEventListener('dragend', handleDragEnd);

  const deleteBtn = card.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', handleDeleteClick);
}

async function addCardToColumn(columnId, content) {
  console.log('addCardToColumn called with:', { columnId, content, currentUser });

  // Create in database first
  const cardData = await createCardInDB(content, columnId);
  console.log('Card data from DB:', cardData);

  if (!cardData) {
    console.error('Failed to create card in DB');
    return null;
  }

  // Add to UI
  const cardsContainer = document.getElementById(`cards-${columnId}`);
  console.log('Cards container:', cardsContainer);

  const card = createCardElement(cardData);
  cardsContainer.appendChild(card);
  updateCardCount(columnId);
  return card;
}

async function deleteCard(card) {
  const column = card.closest('.column');
  const columnId = column.getAttribute('data-column-id');
  const cardId = card.dataset.cardId;

  // Delete from database
  const success = await deleteCardFromDB(cardId);
  if (!success) return;

  // Remove from UI
  card.remove();
  updateCardCount(columnId);
}

// ==========================================================================
// Drag and Drop Handlers
// ==========================================================================

function handleDragStart(e) {
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', e.target.id);
  e.target.classList.add('dragging');
}

function handleDragEnd(e) {
  e.target.classList.remove('dragging');

  document.querySelectorAll('.column').forEach(column => {
    column.classList.remove('drag-over');
  });
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e) {
  e.preventDefault();
  const column = e.target.closest('.column');
  if (column) {
    column.classList.add('drag-over');
  }
}

function handleDragLeave(e) {
  const column = e.target.closest('.column');
  if (column && !column.contains(e.relatedTarget)) {
    column.classList.remove('drag-over');
  }
}

async function handleDrop(e) {
  e.preventDefault();

  const cardElementId = e.dataTransfer.getData('text/html');
  const card = document.getElementById(cardElementId);

  if (!card) return;

  const column = e.target.closest('.column');
  if (!column) return;

  const cardsContainer = column.querySelector('.cards-container');
  const oldColumnId = card.closest('.column').getAttribute('data-column-id');
  const newColumnId = column.getAttribute('data-column-id');

  // If same column, no need to update
  if (oldColumnId === newColumnId) {
    column.classList.remove('drag-over');
    return;
  }

  // Update in database
  const cardId = card.dataset.cardId;
  const success = await updateCardColumnInDB(cardId, newColumnId);

  if (!success) {
    column.classList.remove('drag-over');
    return;
  }

  // Update UI
  cardsContainer.appendChild(card);
  column.classList.remove('drag-over');

  updateCardCount(oldColumnId);
  updateCardCount(newColumnId);
}

// ==========================================================================
// Delete Handler
// ==========================================================================

function handleDeleteClick(e) {
  const card = e.target.closest('.card');
  if (card) {
    deleteCard(card);
  }
}

// ==========================================================================
// Add Card Form Handlers
// ==========================================================================

function setupAddCardForm(column) {
  const columnId = column.getAttribute('data-column-id');
  console.log('[setupAddCardForm] Setting up form for column:', columnId);

  const addCardBtn = column.querySelector('.add-card-btn');
  const inputContainer = column.querySelector('.add-card-input-container');
  const input = column.querySelector('.add-card-input');
  const submitBtn = column.querySelector('.add-card-submit');
  const cancelBtn = column.querySelector('.add-card-cancel');

  // Check if already has event listeners
  if (submitBtn.dataset.listenerAttached) {
    console.warn('[setupAddCardForm] Listeners already attached for column:', columnId);
    return;
  }

  console.log('[setupAddCardForm] Attaching event listeners for column:', columnId);

  addCardBtn.addEventListener('click', () => {
    addCardBtn.style.display = 'none';
    inputContainer.style.display = 'block';
    input.focus();
  });

  submitBtn.addEventListener('click', async () => {
    console.log('[submitBtn click] Event fired for column:', columnId);
    const content = input.value.trim();
    console.log('Add button clicked, content:', content);

    if (!content) {
      input.classList.add('error');
      console.log('Empty content, showing error');
      return;
    }

    console.log('Adding card to column:', columnId);

    // Disable button while creating
    submitBtn.disabled = true;
    submitBtn.textContent = 'Adding...';

    try {
      const card = await addCardToColumn(columnId, content);
      console.log('Card created:', card);

      if (card) {
        input.value = '';
        input.classList.remove('error');
        inputContainer.style.display = 'none';
        addCardBtn.style.display = 'block';
      }
    } catch (error) {
      console.error('Error adding card:', error);
      showError('카드 추가 실패: ' + error.message);
    }

    submitBtn.disabled = false;
    submitBtn.textContent = 'Add';
  });

  // Mark as listener attached
  submitBtn.dataset.listenerAttached = 'true';
  console.log('[setupAddCardForm] Listeners attached successfully for column:', columnId);

  cancelBtn.addEventListener('click', () => {
    input.value = '';
    input.classList.remove('error');
    inputContainer.style.display = 'none';
    addCardBtn.style.display = 'block';
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitBtn.click();
    } else if (e.key === 'Escape') {
      cancelBtn.click();
    }
  });

  input.addEventListener('input', () => {
    input.classList.remove('error');
  });
}

// ==========================================================================
// Authentication Event Handlers
// ==========================================================================

function setupAuthEventHandlers() {
  const authTabs = document.querySelectorAll('.auth-tab');
  const emailAuthForm = document.getElementById('email-auth-form');
  const emailAuthBtn = document.getElementById('email-auth-btn');
  const googleLoginBtn = document.getElementById('google-login-btn');
  const githubLoginBtn = document.getElementById('github-login-btn');
  const logoutBtn = document.getElementById('logout-btn');

  let isSignupMode = false;

  // Auth tabs switching
  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      authTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      isSignupMode = tab.dataset.tab === 'signup';
      emailAuthBtn.textContent = isSignupMode ? '회원가입' : '로그인';
    });
  });

  // Email auth form
  emailAuthForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;

    emailAuthBtn.disabled = true;
    emailAuthBtn.textContent = isSignupMode ? '가입 중...' : '로그인 중...';

    try {
      if (isSignupMode) {
        await signUpWithEmail(email, password);
        showError('회원가입 완료! 이메일을 확인해주세요.');
      } else {
        await signInWithEmail(email, password);
      }
    } catch (error) {
      showError(error.message);
      emailAuthBtn.disabled = false;
      emailAuthBtn.textContent = isSignupMode ? '회원가입' : '로그인';
    }
  });

  // Google login
  googleLoginBtn.addEventListener('click', async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      showError(error.message);
    }
  });

  // GitHub login
  githubLoginBtn.addEventListener('click', async () => {
    try {
      await signInWithGitHub();
    } catch (error) {
      showError(error.message);
    }
  });

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      try {
        await signOut();
      } catch (error) {
        showError(error.message);
      }
    });
  }
}

// ==========================================================================
// Kanban Board Initialization
// ==========================================================================

async function renderCards() {
  // Clear all columns
  document.querySelectorAll('.cards-container').forEach(container => {
    container.innerHTML = '';
  });

  // Fetch and render cards from database
  const cards = await fetchCards();

  if (cards && cards.length > 0) {
    cards.forEach(cardData => {
      const cardsContainer = document.getElementById(`cards-${cardData.column_id}`);
      const card = createCardElement(cardData);
      cardsContainer.appendChild(card);
    });
  }

  // Update card counts
  ['todo', 'in-progress', 'done'].forEach(columnId => {
    updateCardCount(columnId);
  });
}

function attachKanbanEventListeners() {
  console.log('[attachKanbanEventListeners] Starting...');

  document.querySelectorAll('.column').forEach(column => {
    const columnId = column.getAttribute('data-column-id');
    console.log('[attachKanbanEventListeners] Processing column:', columnId);

    // Check if already attached
    if (column.dataset.listenersAttached) {
      console.warn('[attachKanbanEventListeners] Listeners already attached to column:', columnId);
      return;
    }

    column.addEventListener('dragover', handleDragOver);
    column.addEventListener('dragenter', handleDragEnter);
    column.addEventListener('dragleave', handleDragLeave);
    column.addEventListener('drop', handleDrop);

    setupAddCardForm(column);

    // Mark as attached
    column.dataset.listenersAttached = 'true';
    console.log('[attachKanbanEventListeners] Listeners attached to column:', columnId);
  });

  console.log('[attachKanbanEventListeners] Complete');
}

// Track if kanban board is already initialized
let isKanbanInitialized = false;

async function initializeKanbanBoard() {
  console.log('[initializeKanbanBoard] Starting initialization...');
  console.log('[initializeKanbanBoard] Already initialized?', isKanbanInitialized);

  if (isKanbanInitialized) {
    console.warn('[initializeKanbanBoard] Already initialized, skipping...');
    return;
  }

  currentUser = await getCurrentUser();
  console.log('[initializeKanbanBoard] Current user:', currentUser ? currentUser.email : 'null');

  if (currentUser) {
    console.log('[initializeKanbanBoard] Rendering cards...');
    await renderCards();
    console.log('[initializeKanbanBoard] Attaching event listeners...');
    attachKanbanEventListeners();
    console.log('[initializeKanbanBoard] Kanban Board initialized successfully!');
    isKanbanInitialized = true;
  } else {
    console.warn('[initializeKanbanBoard] No current user, skipping initialization');
  }
}

// ==========================================================================
// Application Initialization
// ==========================================================================

async function initializeApp() {
  console.log('[initializeApp] Starting app initialization...');

  // Setup authentication handlers
  setupAuthEventHandlers();

  // Check authentication and show appropriate page
  const user = await checkAuth();

  if (user) {
    console.log('[initializeApp] User found, initializing kanban board...');
    await initializeKanbanBoard();
  } else {
    console.log('[initializeApp] No user, showing login page...');
  }
}

// ==========================================================================
// Start Application
// ==========================================================================

document.addEventListener('DOMContentLoaded', initializeApp);

// Listen for kanban board initialization event (triggered after login)
window.addEventListener('kanban:init', async () => {
  console.log('[kanban:init] Event received, initializing kanban board...');
  await initializeKanbanBoard();
});
