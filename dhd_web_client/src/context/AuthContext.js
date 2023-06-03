import React, {createContext, useEffect, useState} from 'react';
import api from "~/api/api";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    // const [user_id, setUser_id] = useState('');
    const [userImage, setUserImage] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        console.log('userId: ', userId);

        if (userId) {
            api.get(`/user/${userId}`)
                .then((response) => {
                    setUser(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [setUser]);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn, setIsLoggedIn,
                user, setUser,
                userImage, setUserImage,
                // user_id, setUser_id
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
