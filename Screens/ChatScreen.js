import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity} from 'react-native'

const ChatScreen = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView>
            <Text>Chat screen</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text>Go to home</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ChatScreen
