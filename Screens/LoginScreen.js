import React from 'react'
import { View, Text, Button } from 'react-native'
import useAuth from '../hooks/useAuth'

const LoginScreen = () => {
    const {signInWithGoogle, loading} = useAuth();
    return (
        <View>
            <Text>{loading ? "loading......" : "login to the app"}</Text>
            <Button title="Login/Signup with google" onPress={signInWithGoogle} />
        </View>
    )
}

export default LoginScreen
