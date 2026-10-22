import { createContext, useContext, useState, type ReactNode } from "react";

type MenuContextValue = { isOpen: boolean; toggleMenu: () => void };
const PersonalMenuContext = createContext<MenuContextValue | null>(null);

export function PersonalMenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <PersonalMenuContext.Provider value={{ isOpen, toggleMenu: () => setIsOpen((open) => !open) }}>
      {children}
    </PersonalMenuContext.Provider>
  );
}

export function usePersonalMenu() {
  const context = useContext(PersonalMenuContext);
  if (!context) throw new Error("usePersonalMenu deve ser usado dentro do PersonalMenuProvider");
  return context;
}
