import { useContext } from 'react';

import { authContext } from '../model/authContext';

export const useAuth = () => {
  return useContext(authContext);
};
