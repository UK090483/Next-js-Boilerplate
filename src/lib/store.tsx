import create from 'zustand';

type AppState = {
  menuOpen: boolean;
  setMenu: (direction?: 'open' | 'close') => void;
};

const useStore = create<AppState>((set) => ({
  menuOpen: false,
  setMenu: () =>
    set((state) => ({
      menuOpen: !state.menuOpen,
    })),
}));

export const useMenu = () => {
  const isOpen = useStore((state) => state.menuOpen);
  const toggle = useStore((state) => state.setMenu);

  return { isOpen, toggle };
};
