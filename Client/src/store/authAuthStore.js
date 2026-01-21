import { create } from "zustand";

const tokenFromStorage = localStorage.getItem("token");

export const useAuthStore = create((set) => ({
  token: tokenFromStorage,
  isAuthenticated: !!tokenFromStorage,

  login: (token) => {
    localStorage.setItem("token", token);
    set({
      token,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({
      token: null,
      isAuthenticated: false,
    });
  },
}));
