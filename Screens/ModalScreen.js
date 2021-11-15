import { useNavigation } from '@react-navigation/core';
import React, {useState} from 'react'
import { View, Text, Image, TextInput, TouchableOpacity} from 'react-native'
import tw from 'tailwind-rn';
import useAuth from '../hooks/useAuth';

const ModalScreen = () => {
    const {user} = useAuth();
    const [image, setImage] = useState('');
    const [occupation, setOccupation] = useState('');
    const [age, setAge] = useState('');

    const navigation = useNavigation();
    const incompleteForm = !image || !occupation || !age;
    const updateUserProfile = () => {

    }
    return (
        <View style={tw("flex-1 items-center p-2 relative ")}>
            <Image
             resizeMode="contain"
             source={require('../assets/karlekImg/cover.png')}
             style={tw("h-20 w-40 pt-2  rounded-3xl")}
             />

             <Text style={tw("text-xl text-gray-500 p-2 font-semibold")}>
                 Welcome  {user?.displayName}
             </Text>

             <Text style={tw("text-center p-4 font-semibold text-red-400 text-lg")}>
                 Step: 1
             </Text>

             <TextInput 
              value={image}
              onChangeText={text => setImage(text)}
              placeholder="Enter your profile picture url"
              style={tw("text-center text-xl pb-2")}
             />

            <Text style={tw("text-center p-4 font-semibold text-red-400 text-lg")}>
                 Step: 2
             </Text>

             <TextInput 
              value={occupation}
              onChangeText={text => setOccupation(text)}
              placeholder="Enter your occupation"
              style={tw("text-center text-xl pb-2")}
             />

             <Text style={tw("text-center p-4 font-semibold text-red-400 text-lg")}>
                 Step: 3
             </Text>

             <TextInput 
              value={age}
              onChangeText={text => setAge(text)}
              placeholder="Enter your age"
              keyboardType="numeric"
              maxLength={2}
              style={tw("text-center text-xl pb-2")}
             />


             {incompleteForm ? (
                   <TouchableOpacity
                   disabled
                   activeOpacity={0.8}
                    style={tw("absolute  w-64 p-3 rounded-xl  bottom-10 bg-gray-400 ")}>
                          <Text style={tw("text-xl text-white text-center font-semibold")}>
                              Update your profile
                          </Text>
                   </TouchableOpacity>
             ) : (
                <TouchableOpacity
                activeOpacity={0.8}
                 style={tw("absolute w-64 p-3 rounded-xl  bottom-10 bg-red-400 ")}>
                       <Text style={tw("text-xl text-white text-center font-semibold")}>
                           Update your profile
                       </Text>
                </TouchableOpacity>
             )}
            

        </View>
    )
}

export default ModalScreen
