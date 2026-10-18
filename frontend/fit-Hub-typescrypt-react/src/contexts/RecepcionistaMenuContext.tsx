import { createContext, useContext, useState, type ReactNode } from "react";

type RecepcionistaMenuContextValue = {
  isOpen: boolean;
  toggleMenu: () => void;
};

const RecepcionistaMenuContext = createContext<RecepcionistaMenuContextValue | null>(null);

export function RecepcionistaMenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <RecepcionistaMenuContext.Provider
      value={{ isOpen, toggleMenu: () => setIsOpen((open) => !open) }}
    >
      {children}
    </RecepcionistaMenuContext.Provider>
  );
}

export function useRecepcionistaMenu() {
  const context = useContext(RecepcionistaMenuContext);
  if (!context) throw new Error("useRecepcionistaMenu deve ser usado dentro do provider");
  return context;
}
