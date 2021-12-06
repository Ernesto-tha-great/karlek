import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity} from 'react-native'
import ChatList from '../components/ChatList'
import Header from '../components/Header'

const ChatScreen = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView>
           <Header title="chat" callEnabled={true} />
           <ChatList />
        </SafeAreaView>
    )
}

export default ChatScreen
