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
  const user = await getCurrentUser();

  const loginPage = document.getElementById('login-page');
  const kanbanPage = document.getElementById('kanban-page');

  if (user) {
    // User is logged in
    loginPage.style.display = 'none';
    kanbanPage.style.display = 'block';

    // Display user info
    const userEmailElement = document.getElementById('user-email');
    if (userEmailElement) {
      userEmailElement.textContent = user.email;
    }

    return user;
  } else {
    // User is not logged in
    loginPage.style.display = 'flex';
    kanbanPage.style.display = 'none';
    return null;
  }
}

// Listen for auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', event, session?.user?.email);

  if (event === 'SIGNED_IN') {
    checkAuth().then(user => {
      if (user) {
        // Reload kanban data
        window.location.reload();
      }
    });
  } else if (event === 'SIGNED_OUT') {
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
