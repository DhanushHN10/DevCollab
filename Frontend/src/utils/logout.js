export default function logout(navigate) {
  localStorage.removeItem("token");
  window.dispatchEvent(new Event("auth-token-changed"));
  navigate("/");
}
