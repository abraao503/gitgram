import React, { createContext, useState } from 'react';

export const Repositories = createContext();

export default function RepositoriesProvider({ children }) {
  const [repositories, setRepositories] = useState([]);

  return (
    <Repositories.Provider
      value={{
        repositories,
        setRepositories
      }}
    >
      {children}
    </Repositories.Provider>
  );
}
