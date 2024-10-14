'use client';

import { User } from 'lucia';
import { createContext, useContext } from 'react';

export const UserContext = createContext<User | null>(null);

export const UserContextProvider = ({
  value,
  children,
}: {
  value: User | null;
  children: React.ReactNode;
}) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
