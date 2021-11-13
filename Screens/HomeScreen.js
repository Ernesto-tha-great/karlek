import React from 'react'
import { View, Text, Button, SafeAreaView} from 'react-native'
import useAuth from '../hooks/useAuth'


const HomeScreen = () => {
    const { logout } = useAuth()
    return (
        <SafeAreaView>
            <Text>Hey there</Text>
            <Button title="Log out" onPress={logout} />

        </SafeAreaView>
    )
}

export default HomeScreen
