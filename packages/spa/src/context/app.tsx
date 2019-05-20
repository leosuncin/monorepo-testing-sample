import React, { createContext, useState, useEffect } from 'react';

import { IUser } from '../services/api-client';

export interface IAuthContext {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
}

export const AppContext = createContext<IAuthContext>({} as IAuthContext);

export const AppContextProvider: React.FC = ({ children }) => {
  const prevUser = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const [user, setUser] = useState<IUser>(prevUser);

  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }, [user]);

  const defaultContext = { user, setUser };

  return (
    <AppContext.Provider value={defaultContext}>{children}</AppContext.Provider>
  );
};

export const AppContextConsumer = AppContext.Consumer;
