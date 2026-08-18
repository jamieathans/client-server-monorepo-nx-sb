import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface LoaderContext {
  showLoader: boolean;
  setShowLoader: Dispatch<SetStateAction<boolean>>;
}

const LoaderContext = createContext<Readonly<LoaderContext> | undefined>(
  undefined,
);

export function useLoaderContext() {
  const context = useContext(LoaderContext);

  if (!context) {
    throw new Error(
      'useLoaderContext must be used within a LoaderContextProvider',
    );
  }

  return context;
}

export function LoaderContextProvider({ children }: { children: ReactNode }) {
  const [showLoader, setShowLoader] = useState(false);

  return (
    <LoaderContext.Provider
      value={{
        showLoader,
        setShowLoader,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
}
