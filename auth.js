const SUPABASE_URL = https://rvexvzbvbqqryoyxmzfn.supabase.co/rest/v1/";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_vuWNc7-03iNi3LlXk38M1w_pBoxx5k6";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

document.body.insertAdjacentHTML(
  "afterbegin",
  `
  <section id="fitoxy-auth" style="
    position:fixed; inset:0; z-index:99999;
    display:flex; align-items:center; justify-content:center;
    background:#10131b; color:white; font-family:Arial,sans-serif;
    padding:20px; box-sizing:border-box;">
    <div style="width:100%;max-width:380px;">
      <h1 style="color:#8ee6b0;">Fitoxy AI</h1>
      <p>Create your account or sign in.</p>
      <input id="auth-email" type="email" placeholder="Email"
        style="width:100%;padding:13px;margin:8px 0;box-sizing:border-box;">
      <input id="auth-password" type="password" placeholder="Password (at least 6 characters)"
        style="width:100%;padding:13px;margin:8px 0;box-sizing:border-box;">
      <button id="auth-signup" style="padding:12px;width:100%;margin:6px 0;">
        Create account
      </button>
      <button id="auth-login" style="padding:12px;width:100%;margin:6px 0;">
        Sign in
      </button>
      <p id="auth-message" role="status"></p>
    </div>
  </section>
  `
);

const authScreen = document.getElementById("fitoxy-auth");
const appShell = document.querySelector(".app-shell");

if (appShell) appShell.style.display = "none";

async function showDashboardIfSignedIn() {
  const { data, error } = await supabaseClient.auth.getSession();

  if (error) {
    document.getElementById("auth-message").textContent = error.message;
    return;
  }

  if (data.session) {
    authScreen.style.display = "none";
    if (appShell) appShell.style.display = "";
  } else {
    authScreen.style.display = "flex";
    if (appShell) appShell.style.display = "none";
  }
}

document.getElementById("auth-signup").addEventListener("click", async () => {
  const email = document.getElementById("auth-email").value.trim();
  const password = document.getElementById("auth-password").value;
  const message = document.getElementById("auth-message");

  if (!email || password.length < 6) {
    message.textContent = "Enter a valid email and a password of at least 6 characters.";
    return;
  }

  message.textContent = "Creating account…";

  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password
  });

  if (error) {
    message.textContent = error.message;
  } else if (data.session) {
    message.textContent = "Account created!";
    await showDashboardIfSignedIn();
  } else {
    message.textContent = "Check your email to confirm your account, then sign in.";
  }
});

document.getElementById("auth-login").addEventListener("click", async () => {
  const email = document.getElementById("auth-email").value.trim();
  const password = document.getElementById("auth-password").value;
  const message = document.getElementById("auth-message");

  message.textContent = "Signing in…";

  const { error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    message.textContent = error.message;
  } else {
    await showDashboardIfSignedIn();
  }
});

supabaseClient.auth.onAuthStateChange((_event, session) => {
  if (session) {
    authScreen.style.display = "none";
    if (appShell) appShell.style.display = "";
  }
});

showDashboardIfSignedIn();
