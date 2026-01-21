import { create } from "zustand";

export const useMentorStore = create((set) => ({
  list: [],
  loading: false,
  error: null,

  fetchMentors: async () => {
    set({ loading: true, error: null });

    try {
      const res = await fetch("http://localhost:5000/api/mentors");
      const data = await res.json();

      set({
        list: data.mentors,
        loading: false,
      });
    } catch (err) {
      set({
        error: err.message,
        loading: false,
      });
    }
  },
}));
