import { createContext, ReactNode, useContext, useState } from 'react';

interface TitleContext {
  title: ReactNode;
  setTitle: (title: ReactNode) => void;
}

const TitleContext = createContext<Readonly<TitleContext> | undefined>(
  undefined,
);

export function useTitleContext() {
  const context = useContext(TitleContext);

  if (!context) {
    throw new Error(
      'useTitleContext must be used within a TitleContextProvider',
    );
  }

  return context;
}

export function TitleContextProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState<ReactNode>();

  return (
    <TitleContext.Provider
      value={{
        title,
        setTitle,
      }}
    >
      {children}
    </TitleContext.Provider>
  );
}
