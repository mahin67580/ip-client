import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import Swal from 'sweetalert2';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registration successful",
            showConfirmButton: false,
            timer: 1500
        });
        setLoading(true)

        return createUserWithEmailAndPassword(auth, email, password)

    }

    const login = (email, password) => {

        return signInWithEmailAndPassword(auth, email, password)
    }
    const logout = () => {
        return signOut(auth)
    }
    const updateUser = (updatedData) => {

        return updateProfile(auth.currentUser, updatedData)

    }

    useEffect(() => {
        const unsbscribe = onAuthStateChanged(auth, (CurrentUser) => {
            setUser(CurrentUser);
            setLoading(false)

        });
        return () => {
            unsbscribe();
        }
    }, [])

    const authdata = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        logout,
        login,
        updateUser
    }
    return (
        <AuthContext value={authdata}>{children}</AuthContext>
    );
};

export default AuthProvider;