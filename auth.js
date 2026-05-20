// auth.js - Authentication logic
import SUPABASE_CONFIG from './config.js';

// Supabase client initialization
const supabase = window.supabase.createClient(
  SUPABASE_CONFIG.url,
  SUPABASE_CONFIG.anonKey
);

// ==========================================================================
// Authentication Functions
// ==========================================================================

// Get current user
async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Get user error:', error.message);
    return null;
  }
  return user;
}

// Sign up with email
async function signUpWithEmail(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    console.error('Signup error:', error.message);
    throw error;
  }

  return data.user;
}

// Sign in with email
async function signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.error('Login error:', error.message);
    throw error;
  }

  return data.user;
}

// Sign in with Google
async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + window.location.pathname
    }
  });

  if (error) {
    console.error('Google login error:', error.message);
    throw error;
  }
}

// Sign in with GitHub
async function signInWithGitHub() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: window.location.origin + window.location.pathname
    }
  });

  if (error) {
    console.error('GitHub login error:', error.message);
    throw error;
  }
}

// Sign out
async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Logout error:', error.message);
    throw error;
  }

  return true;
}

// Check authentication status and redirect
async function checkAuth() {
  console.log('[checkAuth] Starting authentication check...');

  // First, wait for session restoration (important for OAuth redirects)
  const { data: { session } } = await supabase.auth.getSession();
  console.log('[checkAuth] Session:', session ? 'exists' : 'null');

  const user = session?.user || await getCurrentUser();
  console.log('[checkAuth] User:', user ? user.email : 'null');

  const loginPage = document.getElementById('login-page');
  const kanbanPage = document.getElementById('kanban-page');
  console.log('[checkAuth] DOM elements:', {
    loginPage: loginPage ? 'found' : 'missing',
    kanbanPage: kanbanPage ? 'found' : 'missing'
  });

  if (user) {
    // User is logged in
    console.log('[checkAuth] User authenticated, showing kanban page');
    loginPage.style.setProperty('display', 'none', 'important');
    kanbanPage.style.setProperty('display', 'block', 'important');

    // Display user info
    const userEmailElement = document.getElementById('user-email');
    if (userEmailElement) {
      userEmailElement.textContent = user.email;
      console.log('[checkAuth] User email displayed:', user.email);
    }

    // Verify display change
    console.log('[checkAuth] After change - loginPage display:', window.getComputedStyle(loginPage).display);
    console.log('[checkAuth] After change - kanbanPage display:', window.getComputedStyle(kanbanPage).display);

    return user;
  } else {
    // User is not logged in
    console.log('[checkAuth] No user, showing login page');
    loginPage.style.setProperty('display', 'flex', 'important');
    kanbanPage.style.setProperty('display', 'none', 'important');
    return null;
  }
}

// Listen for auth state changes
supabase.auth.onAuthStateChange(async (event, session) => {
  console.log('[onAuthStateChange] Auth state changed:', event, session?.user?.email);

  if (event === 'SIGNED_IN') {
    console.log('[onAuthStateChange] SIGNED_IN event detected, calling checkAuth()');
    const user = await checkAuth();
    console.log('[onAuthStateChange] checkAuth() returned user:', user ? user.email : 'null');

    if (user) {
      // Trigger kanban board initialization
      console.log('[onAuthStateChange] Dispatching kanban:init event');
      const kanbanInitEvent = new CustomEvent('kanban:init');
      window.dispatchEvent(kanbanInitEvent);
    }
  } else if (event === 'SIGNED_OUT') {
    console.log('[onAuthStateChange] SIGNED_OUT event, reloading page');
    window.location.reload();
  }
});

// Export functions and supabase client
export {
  supabase,
  getCurrentUser,
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  signInWithGitHub,
  signOut,
  checkAuth
};
