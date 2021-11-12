import React, { createContext, useContext } from 'react'
import * as Google from 'expo-google-app-auth'

const AuthContext = createContext({})

const config = {
    androidClientId: '18962783514-t2as0e4249o3put7r49vbsb586ilscbs.apps.googleusercontent.com',
    iosClientId: '18962783514-o1nkenpamkbt96183i0fo0l70m6c2gk7.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    permissions: ["public_profile", "email", "gender", "location"]
}

export const AuthProvider = ({children}) => {
    const signInWithGoogle = async () => {
        Google.logInAsync(config).then(async (loginResult) => {
            if(loginResult.type === 'success') {
                //login

            }
        }) 
    }
    return (
        <AuthContext.Provider value={{user: null, signInWithGoogle}}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext)
}


