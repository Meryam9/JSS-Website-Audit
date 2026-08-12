// ---------------------------------------------------------------------------
// DEMO AUTH ONLY.
// This site has no backend/database, so "accounts" here are simulated by
// storing them in the browser's localStorage. This is enough to demo a real
// create-account -> auto-login -> logged-in-header flow, but it is NOT secure
// storage (passwords are stored in plain text in the browser) and accounts
// only exist on the device/browser that created them. Swap this file out for
// real API calls (fetch to your backend) when you're ready to go live —
// every function below is a natural place to do that.
// ---------------------------------------------------------------------------

const AuthDemo = (function () {
  const USERS_KEY = "jss_demo_users";
  const SESSION_KEY = "jss_demo_session";

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function normalize(value) {
    return (value || "").trim().toLowerCase();
  }

  function findUser(identifier) {
    const id = normalize(identifier);
    return getUsers().find(
      (u) => normalize(u.username) === id || normalize(u.email) === id
    );
  }

  function getSession() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY));
    } catch (e) {
      return null;
    }
  }

  function setSession(user) {
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ username: user.username, email: user.email, plan: user.plan || "free" })
    );
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = "index.html";
  }

  // Returns { ok: true } on success, or { ok: false, reason: "..." } on failure.
  function registerUser({ username, email, password, plan }) {
    const users = getUsers();
    const usernameTaken = users.some((u) => normalize(u.username) === normalize(username));
    const emailTaken = users.some((u) => normalize(u.email) === normalize(email));

    if (usernameTaken) return { ok: false, reason: "username" };
    if (emailTaken) return { ok: false, reason: "email" };

    const newUser = { username, email, password, plan: plan || "free" };
    users.push(newUser);
    saveUsers(users);
    setSession(newUser);
    return { ok: true };
  }

  // Returns { ok: true } on success, or { ok: false } if credentials don't match.
  function login(identifier, password) {
    const user = findUser(identifier);
    if (!user || user.password !== password) return { ok: false };
    setSession(user);
    return { ok: true };
  }

  return { getUsers, findUser, getSession, setSession, logout, registerUser, login };
})();
