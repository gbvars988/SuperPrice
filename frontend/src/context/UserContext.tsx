import React from 'react';

export type User = {
    email: string;
    userID: number;
    firstName: string;
    lastName: string;
};

export type UserContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserContext = React.createContext<UserContextType>({
    user: null,
    setUser: () => {
    }
});

interface UserProviderProps {
    children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
    const [user, setUser] = React.useState<User | null>(null);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};
