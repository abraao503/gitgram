import React from 'react';
import AddRepositoryStateProvider from './AddRepositoryState';
import ActualScreenProvider from './ActualScreen';
import RepositoriesProvider from './Repositories';

export default function ProviderContexts({ children }){
  return (
    <ActualScreenProvider>
      <AddRepositoryStateProvider>
        <RepositoriesProvider>
          {children}
        </RepositoriesProvider>
      </AddRepositoryStateProvider>
    </ActualScreenProvider>
  )
}
