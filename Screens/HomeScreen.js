import { useNavigation } from '@react-navigation/core'
import React, {useRef} from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image} from 'react-native'
import useAuth from '../hooks/useAuth'
import tw from 'tailwind-rn';
import {AntDesign, Entypo, Ionicons} from '@expo/vector-icons'
import Swiper from 'react-native-deck-swiper';

const DUMMY_DATA =[
    {
        id: "1",
        firstName: "Catherine",
        lastName: "pierce",
        age: "20",
        occupation: "Student",
        photoURL: "https://cdn.pixabay.com/photo/2018/11/28/19/53/woman-3844370__340.jpg",
    },
   
    {
        
        id: "2",
        firstName: "Micheal",
        lastName: "Burnes",
        age: "29",
        occupation: "accountant",
        photoURL: "https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358__340.jpg",
    },
    {
        id: '3',
        firstName: "kerry ",
        lastName: "holmes",
        age: "26",
        occupation: "chef",
        photoURL: "https://cdn.pixabay.com/photo/2017/11/02/14/36/model-2911363__340.jpg",
    },
    {
        id: '4',
        firstName: "Chloe",
        lastName: "kempt",
        age: "22",
        occupation: "journalist",
        photoURL: "https://cdn.pixabay.com/photo/2015/01/12/10/44/woman-597173__340.jpg",
    },
    {
        id: '5',
        firstName: "Amanda",
        lastName: "scheiner",
        age: "20",
        occupation: "Model",
        photoURL: "https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056__340.jpg",
    },
    {
        id: '6',
        firstName: "Stella",
        lastName: "murray",
        age: "28",
        occupation: "Software Developer",
        photoURL: "https://cdn.pixabay.com/photo/2018/07/25/08/58/business-3560917__340.jpg",
    },
    {
        id:' 7',
        firstName: "Loren",
        lastName: "fisher",
        age: "22",
        occupation: "Model",
        photoURL: "https://cdn.pixabay.com/photo/2014/08/20/18/08/woman-422706__340.jpg",
    },
    {
        id: '8',
        firstName: "John",
        lastName: "kean",
        age: "20",
        occupation: "math teacher",
        photoURL: "https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445__340.jpg",
    },
  
]

const HomeScreen = () => {
    const navigation = useNavigation()
    const {user, logout } = useAuth()
    //use ref allows you to point at element/objectn in the screen
    const swipeRef = useRef(null);
    return ( 
        <SafeAreaView style={tw("flex-1")}>
            {/* header */}
            <View style={tw("flex-row justify-between px-4")}>
                <TouchableOpacity onPress={logout} activeOpacity={0.7} style={tw("")}>
                    <Image source={{uri: user.photoURL}} style={tw("h-10 w-10 rounded-full ")} />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7} style={tw("")}>
                    <Text style={tw("text-3xl text-red-400 font-semibold ")}>Karlek</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Chat")} style={tw("")}>
                    <Ionicons name="chatbubbles" size={30} color="#FF5864" />
                </TouchableOpacity>

            </View>
            {/* end of header */}

            {/* cards*/}
            <View style={tw("flex-1 -mt-7    ")}>
            <Swiper
                ref={swipeRef}
                containerStyle={{backgroundColor: 'transparent'}}
                cards={DUMMY_DATA}
                stackSize={3}
                cardIndex={0}
                verticalSwipe={false}
                animateCardOpacity={true}
                backgroundColor={"#4FD"}
                onSwipedLeft={() => console.log('swipped pass')}
                onSwipedRight={() => console.log('swipped match')}
                overlayLabels={{
                    left: {
                        title: 'Nah',
                        style: {
                            label: {
                                textAlign: 'right',
                                color: 'red',
                            }
                        }
                    },
                    right: {
                        title: 'Match',
                        style: {
                            label: {
                               
                                color: '#4DED30',

                            }
                        }
                    }
                }}
                renderCard={(card) => (
                    <View key={card.id} style={tw(" relative bg-white h-3/4 rounded-xl ")}>
                        <Image 
                        source={{uri: card.photoURL}} 
                         style={tw("absolute top-0 h-full w-full rounded-xl")}
                          />

                        <View style={[tw("absolute bottom-0 bg-white w-full h-20 items-center flex-row justify-between px-6 py-2 rounded-b-xl"), styles.cardShadow]}>
                            <View>
                                <Text style={tw("text-xl font-semibold")}>{card.firstName} {card.lastName}</Text>
                                <Text style={tw("font-semibold text-xs")}>{card.occupation}</Text>
                            </View>
                            <Text style={tw("text-2xl font-semibold")}>{card.age}</Text>
                        </View>
                    </View>
                )}
            />
            </View>
            {/* end of card */}

            <View style={tw("flex-row justify-evenly ")}>
                <TouchableOpacity 
                onPress={() => swipeRef.current.swipeLeft()}
                activeOpacity={0.7} 
                style={tw("bg-red-200 w-16 h-16 items-center justify-center rounded-full ")}
                 >
                    <Entypo name="cross" size={35} color="#FF5864" />
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => swipeRef.current.swipeRight()}
                 activeOpacity={0.7}
                  style={tw("bg-green-200 w-16 h-16 items-center justify-center rounded-full ")}
                  >
                    <AntDesign name="heart" size={30} color="#FF5864" />
                </TouchableOpacity>
                
               
            </View>

        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
})