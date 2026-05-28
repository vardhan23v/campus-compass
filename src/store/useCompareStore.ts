// src/store/useCompareStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { College } from "@/types/college";

interface CompareState {
  colleges: College[];
  addCollege: (college: College) => void;
  removeCollege: (id: string) => void;
  clearAll: () => void;
  isInCompare: (id: string) => boolean;
  isFull: () => boolean;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      colleges: [],
      addCollege: (college) => {
        const { colleges } = get();
        if (colleges.length >= 3) return;
        if (colleges.find((c) => c.id === college.id)) return;
        set({ colleges: [...colleges, college] });
      },
      removeCollege: (id) => {
        set({ colleges: get().colleges.filter((c) => c.id !== id) });
      },
      clearAll: () => set({ colleges: [] }),
      isInCompare: (id) => get().colleges.some((c) => c.id === id),
      isFull: () => get().colleges.length >= 3,
    }),
    { name: "campus-compass-compare" }
  )
);
