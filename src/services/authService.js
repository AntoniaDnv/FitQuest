export function loginAsAdmin() {
  localStorage.setItem("token", "demo-token");
  localStorage.setItem("role", "admin");
}

export function loginAsUser() {
  localStorage.setItem("token", "demo-token");
  localStorage.setItem("role", "user");
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
}

export function getCurrentRole() {
  return localStorage.getItem("role");
}

export function isLoggedIn() {
  return Boolean(localStorage.getItem("token"));
}
