import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import * as Google from 'expo-google-app-auth'
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signOut} from '@firebase/auth'
import { auth } from '../firebase'

const AuthContext = createContext({})

const config = {
    androidClientId: '18962783514-t2as0e4249o3put7r49vbsb586ilscbs.apps.googleusercontent.com',
    iosClientId: '18962783514-o1nkenpamkbt96183i0fo0l70m6c2gk7.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    permissions: ["public_profile", "email", "gender", "location"]
}

export const AuthProvider = ({children}) => {
    const [error, setError] = useState("")
    const [user, setUser] = useState(null)
    const [loadingInitiial, setLoadingInitial] = useState(true)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
         onAuthStateChanged(auth, (user) => {
            if(user) {
                //logged in
                setUser(user);
            }else {
                //logged out
                setUser(null);
            }
            setLoadingInitial(false);
        })
        
    }, [])

    const logout =  () => {
        setLoading(true)
        signOut(auth)
            .catch((error) => {
                setError(error.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const signInWithGoogle = async () => {
        setLoading(true);
        await Google.logInAsync(config).then(async (loginResult) => {
            if(loginResult.type === 'success') {
                //login
                const {idToken, accessToken} =  loginResult;
                const credential = GoogleAuthProvider.credential(idToken, accessToken);
                 // firebase signin
                await signInWithCredential(auth, credential); 
            } 
                return Promise.reject();    
        }
        ).catch(error => setError(error))
        .finally(() => setLoading(false));   
    }

    const memoedValue = useMemo(() => ({
        user,
        signInWithGoogle,
         loading, 
         error, 
         logout
    }), [user, loading, error])

    return (
        <AuthContext.Provider value={memoedValue}>
            {!loadingInitiial && children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext)
}


