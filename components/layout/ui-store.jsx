import { create } from "zustand";

export const useUIStore = create((set) => ({
    collapsed: true,
    toggleSidebar: ()=> {
        set((state)=> ({collapsed: !state.collapsed}))
    }
}))