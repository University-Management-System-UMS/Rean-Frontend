import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BackHandler } from 'react-native';
import { BottomSheet } from '@/components/action-sheets/bottom-sheet';

type BottomSheetOptions = {
  content: ReactNode;
  height?: number;
  showHandle?: boolean;
  borderRadius?: number;
  closeOnSwipeDown?: boolean;
};

type ContextType = {
  showBottomSheet: (options: BottomSheetOptions) => void;
  hideBottomSheet: () => void;
};

const BottomSheetContext = createContext<ContextType | null>(null);

export const useBottomSheet = () => {
  const ctx = useContext(BottomSheetContext);
  if (!ctx) throw new Error('useBottomSheet must be used inside BottomSheetProvider');
  return ctx;
};

export const GlobalBottomSheetProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<BottomSheetOptions | null>(null);

  const showBottomSheet = (opts: BottomSheetOptions) => {
    setOptions(opts);
    setVisible(true);
  };

  const hideBottomSheet = () => {
    setVisible(false);
  };

  // Intercept Android back button when the sheet is visible
  useEffect(() => {
    const onBackPress = () => {
      if (visible) {
        hideBottomSheet();
        return true; // prevent default behavior (navigation pop)
      }
      return false;
    };

    if (visible) {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => backHandler.remove();
    }
  }, [visible]);

  return (
    <BottomSheetContext.Provider value={{ showBottomSheet, hideBottomSheet }}>
      {children}
      {options && (
        <BottomSheet
          visible={visible}
          onClose={hideBottomSheet}
          height={options.height}
          showHandle={options.showHandle}
          borderRadius={options.borderRadius}
          closeOnSwipeDown={options.closeOnSwipeDown}
        >
          {options.content}
        </BottomSheet>
      )}
    </BottomSheetContext.Provider>
  );
};
