/* eslint-disable react/prop-types */

import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword,  signOut, updateProfile } from "firebase/auth";
import app from "../config/firebase.config";
import useAxios from "../hooks/useAxios";
export const AuthContext = createContext({});


const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axios = useAxios();
    
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }
   
    const handleUpdateProfile = (name, photo, phone ) => {
        return updateProfile(auth.currentUser, {
            displayName: name, 
            photoURL: photo,
            // feature: future update phone number
            phoneNumber: phone
        })
    }

    const handleUpdatePassword = () => {
        sendPasswordResetEmail(auth, user?.email)
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log(currentUser);
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email: userEmail };
            setUser(currentUser);
            setLoading(false);
            if (currentUser) {
                axios.post('/auth/access-token', loggedUser)
                    .then(res => {
                        console.log('token response', res.data);
                        
                    })
            }
            else {
                axios.post('/auth/logout', loggedUser)
                    .then(() => {
                    })
            }
        });
        return () => {
            unSubscribe();
        }
    }, [axios, user?.email])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        handleUpdateProfile,
        handleUpdatePassword,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;