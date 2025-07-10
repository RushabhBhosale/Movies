import axios from "axios";
import { useUserStore } from "@/store/userStore";

export async function logoutUser() {
  try {
    await axios.post("/api/auth/logout");
    useUserStore.getState().clearUser();
    window.location.href = "/login";
  } catch (err) {
    console.error("Logout failed:", err);
  }
}
