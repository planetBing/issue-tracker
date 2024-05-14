import React, { createContext, useState, useContext, ReactNode } from "react";

interface User {
  name: string;
  image_path: string;
}

interface CurrentUserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

const CurrentUserContext = createContext<CurrentUserContextType | undefined>(
  undefined
);

export const CurrentUserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = (): CurrentUserContextType => {
  const context = useContext(CurrentUserContext);
  if (!context)
    throw new Error("useCurrentUser must be used within a CurrentUserProvider");
  return context;
};
