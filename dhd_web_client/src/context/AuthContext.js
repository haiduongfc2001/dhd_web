import React, {createContext, useEffect, useState} from 'react';
import api from "~/api/api";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    // const [user_id, setUser_id] = useState('');
    const [userImage, setUserImage] = useState('');

    useEffect(() => {
        const tokenUser = localStorage.getItem('token');
        const userId = localStorage.getItem('user_id');

        if (userId && tokenUser) {
            api.get(`/user/${userId}`)
                .then((response) => {
                    setUser(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setUser({});
        }
    }, []); // Add an empty dependency array here

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
