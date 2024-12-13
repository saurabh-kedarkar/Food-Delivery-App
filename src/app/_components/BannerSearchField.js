import { create } from "zustand";

const useFoodStore = create((set) => ({
  searchField: {}, // Initial state as an empty object
  addSearchField: (newSearchField) =>
    set((state) => ({
      searchField: { ...state.searchField, ...newSearchField },
    })), // Merge new data into the searchField object
  loading: true, // Initial state
  setLoading: (newState) => set(() => ({ loading: newState })),
  addToCard: undefined,
  setAddToCard: (item) =>
    set(() => ({
      addToCard: item,
    })),
  removeCard: undefined,
  setRemoveCard: (itemId) =>
    set(() => ({
      removeCard: itemId,
    })),
  loginUser: JSON.parse(localStorage.getItem("User")) || null,
  setLoginUser: (user) =>
    set(() => ({
      loginUser: user || JSON.parse(localStorage.getItem("User")),
    })),
}));

export default useFoodStore;
