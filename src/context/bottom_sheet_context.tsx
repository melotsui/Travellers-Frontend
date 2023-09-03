import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BottomSheetContextType {
  isVisible: boolean;
  showBottomSheet: () => void;
  hideBottomSheet: () => void;
  content: ReactNode;
  setBottomSheetContent: (content: ReactNode) => void;
}

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(undefined);

interface BottomSheetProviderProps {
  children: ReactNode;
}

export const BottomSheetProvider: React.FC<BottomSheetProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState<ReactNode>(<></>);

  const showBottomSheet = () => setIsVisible(true);
  const hideBottomSheet = () => setIsVisible(false);
  const setBottomSheetContent = (content: ReactNode) => setContent(content);

  return (
    <BottomSheetContext.Provider value={{ isVisible, showBottomSheet, hideBottomSheet, content, setBottomSheetContent}}>
      {children}
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = (): BottomSheetContextType => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error("useBottomSheet must be used within a BottomSheetProvider");
  }
  return context;
};
