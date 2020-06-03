import React, { createContext, useState } from 'react';

export const ActualScreen = createContext();

export default function ActualScreenProvider({ children }) {
  const [actualScreen, setActualScreen] = useState('');

  return (
    <ActualScreen.Provider
      value={{
        actualScreen,
        setActualScreen
      }}
    >
      {children}
    </ActualScreen.Provider>
  );
}
