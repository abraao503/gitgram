import React, { createContext, useState } from 'react';

export const AddRepositoryState = createContext();

export default function AddRepositoryStateProvider({ children }) {
  const [addRepositoryVisible, setAddRepositoryVisible] = useState(false);

  return (
    <AddRepositoryState.Provider
      value={{
        addRepositoryVisible,
        setAddRepositoryVisible
      }}
    >
      {children}
    </AddRepositoryState.Provider>
  );
}
