import { createContext, ReactNode, useContext, useRef } from 'react';

interface ReturnUrlContext {
  getReturnUrl: () => string;
  setReturnUrl: (returnUrl: string) => void;
}

const ReturnUrlContext = createContext<Readonly<ReturnUrlContext> | undefined>(
  undefined,
);

export function useReturnUrlContext() {
  const context = useContext(ReturnUrlContext);

  if (!context) {
    throw new Error(
      'useReturnUrlContext must be used within a ReturnUrlContextProvider',
    );
  }

  return context;
}

export function ReturnUrlContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const returnUrlRef = useRef('');

  function getReturnUrl() {
    return returnUrlRef.current;
  }

  function setReturnUrl(returnUrl: string) {
    returnUrlRef.current = returnUrl;
  }

  return (
    <ReturnUrlContext.Provider
      value={{
        getReturnUrl,
        setReturnUrl,
      }}
    >
      {children}
    </ReturnUrlContext.Provider>
  );
}
