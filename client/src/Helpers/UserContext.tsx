// userContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  userProfile: any; // Change 'any' to the type of your user profile
  setUserProfile: React.Dispatch<React.SetStateAction<any>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// This is a custom hook to make sure that the usercontext always has a value
// This will make sure that we don't have to put question mark (?) in the code
export const useUserContext = () => {

  const user = useContext(UserContext);

  if (user === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return user;
};


interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<any | null>(null);

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};
