import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen'
import ChatScreen from '../Screens/ChatScreen';
import LoginScreen from '../Screens/LoginScreen';
import useAuth from '../hooks/useAuth';

const Stack = createNativeStackNavigator()

const Navigation = () => {
    const {user} = useAuth();
    return (
        <NavigationContainer>
        <Stack.Navigator>
            {user ? (
                <>
                    <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false }} />
                    <Stack.Screen name="Chat" component={ChatScreen} options={{headerShown: false }} />
                </>
            ) : (
                <>
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false}} />
                </>
            )}
          
            
        </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation
