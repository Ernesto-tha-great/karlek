import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { View, Text, TouchableOpacity, ImageBackground} from 'react-native'
import useAuth from '../hooks/useAuth'
import tw from 'tailwind-rn';

const LoginScreen = () => {
    const {signInWithGoogle, loading} = useAuth();
    const  navigation = useNavigation();
    return (
        <View style={tw("flex-1 ")}>
            <ImageBackground 
            style={tw('flex-1')}
            resizeMode="cover"
            source={{uri: "https://cdn.pixabay.com/photo/2019/06/22/18/31/love-4292211_960_720.jpg" }}
            >
                
                <TouchableOpacity 
                activeOpacity={0.7}
                style={[tw('absolute bottom-36 w-52 bg-red-500 p-4 rounded-2xl  '), {marginHorizontal: "25%"}]}
                onPress={() => signInWithGoogle()}
                >
                <Text style={tw("text-xl text-center font-semibold text-white")}>Sign In & Explore</Text>    
                 </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}

export default LoginScreen
