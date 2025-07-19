export default function logout(navigate) {
  localStorage.removeItem("token");
  navigate("/");
}
