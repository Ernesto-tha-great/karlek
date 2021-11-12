import React from 'react'
import { View, Text, Button } from 'react-native'
import useAuth from '../hooks/useAuth'

const HomeScreen = () => {
    const { logout } = useAuth()
    return (
        <View>
            <Text>Hey there</Text>
            <Button title="Log out" onPress={logout} />

        </View>
    )
}

export default HomeScreen
