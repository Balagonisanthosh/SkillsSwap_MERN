import { create } from "zustand";
import axios from "axios";

const tokenFromStorage = localStorage.getItem("token");

export const useAuthStore = create((set, get) => ({
  token: tokenFromStorage,
  isAuthenticated: !!tokenFromStorage,
  user: null,
  loading: false,
  error: null,

  login: async (token) => {
    localStorage.setItem("token", token);
    set({
      token,
      isAuthenticated: true,
    });

    await get().fetchUser();
  },

  fetchUser: async () => {
    try {
      set({ loading: true, error: null });

      const token = localStorage.getItem("token");
      if (!token) {
        set({ loading: false });
        return;
      }

      const res = await axios.get(
        "http://localhost:5000/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ IMPORTANT FIXES HERE
      set({
        user: {
          username: res.data.user.username,
          email: res.data.user.email,
          skillsKnown: res.data.user.skillsYouKnown,
          skillsToLearn: res.data.user.skillsYouWantToLearn,
        },
        loading: false,
      });
    } catch (error) {
      console.error(error);
      set({
        user: null,
        loading: false,
        error: error.response?.data?.message || "failed to fetch",
        isAuthenticated: false,
      });
      localStorage.removeItem("token");
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  },
}));
