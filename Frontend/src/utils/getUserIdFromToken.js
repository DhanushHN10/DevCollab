import {jwtDecode} from "jwt-decode";

export default function getUserIdFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.id || decoded._id || decoded.userId;
  } catch (err) {
    console.error("Invalid token: ",err);
    return null;
  }
}
