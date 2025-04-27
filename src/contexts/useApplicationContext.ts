import { ApplicationContext } from '@/contexts/ApplicationContextProvider';
import { useContext } from 'react';

export const useApplicationContext = () => {
  const context = useContext(ApplicationContext);

  if (context === undefined) {
    throw new Error('useApplicationContext must be used within a ApplicationContextProvider');
  }

  return context;
};

export default useApplicationContext;
