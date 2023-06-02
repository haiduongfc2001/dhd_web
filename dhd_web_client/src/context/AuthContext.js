import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    // const [user_id, setUser_id] = useState('');
    const [userImage, setUserImage] = useState('');

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, userImage, setUserImage }}>
            {children}
        </AuthContext.Provider>
    );
};
