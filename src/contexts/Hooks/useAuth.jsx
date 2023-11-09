import { AuthContext } from '../auth';
import { useContext } from 'react';

export const UseAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
