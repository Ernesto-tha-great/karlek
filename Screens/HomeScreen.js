import { useNavigation } from '@react-navigation/core'
import React, {useRef, useState, useEffect, useLayoutEffect} from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image} from 'react-native'
import useAuth from '../hooks/useAuth'
import tw from 'tailwind-rn';
import {AntDesign, Entypo, Ionicons} from '@expo/vector-icons'
import Swiper from 'react-native-deck-swiper';
import { collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, where } from '@firebase/firestore';
import { db } from '../firebase';
import generateId from '../Lib/generateId';



const HomeScreen = () => {
    const navigation = useNavigation()
    const {user, logout } = useAuth()
    const [profiles,setProfiles] = useState([])
    //use ref allows you to point at element/objectn in the screen
    const swipeRef = useRef(null);

        useLayoutEffect(() => 
            onSnapshot(doc(db, "users", user.uid), snapshot => {
                if(!snapshot.exists()){
                    navigation.navigate('Modal')
            }}
            )
           
        ,[])
            //handling pulling swipes from the database
        useEffect(() => {
            let unsub;

            const fetchCards = async () => {
                const passes = getDocs(collection(db, "users", user.uid, "passes")).then(snapshot => snapshot.docs.map(doc => doc.id))
                const swipes = getDocs(collection(db, "users", user.uid, "swipes")).then(snapshot => snapshot.docs.map(doc => doc.id))

                const passedUserIds = (await passes).length > 0 ? passes : ['test']
                const swipedUserIds = (await swipes).length > 0 ? swipes : ['test']

                unsub = onSnapshot(query(collection(db, "users"), where("id", "not-in", [...passedUserIds, ...swipedUserIds])), snapshot => {
                    setProfiles(snapshot.docs.filter(doc => doc.id !== user.uid).map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    })))
                })  
            }

            fetchCards();
            return unsub;
        },[])

        const swipeLeft =  (cardIndex)  => {
            if (!profiles[cardIndex]) return;
            const userSwiped = profiles[cardIndex];
            console.log(`you swiped pass on ${userSwiped.displayName}`)

            setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped)
        }

        const swipeRight = async (cardIndex) => {
            if (!profiles[cardIndex]) return;
          
            // get all relevant user data
            const userSwiped = profiles[cardIndex];
            const loggedInProfile = await(
                await getDoc(doc(db, "users", user.uid))
            ).data()
            // check if the user swiped on you..
            getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(snapshot => {
                if(snapshot.exists()) {
                    //user has matched with you before
                    //create a match
                    console.log(`Hurray! you matched with ${userSwiped.displayName}`)
                    setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id), userSwiped)

                    // creaye a match
                    setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
                        users: {
                            [user.uid]: loggedInProfile,
                            [userSwiped.id]: userSwiped
                        },
                        usersMatched: [user.uid, userSwiped.id],
                        timestamp: serverTimestamp()
                    });
                    navigation.navigate('Match', {
                        loggedInProfile,
                        userSwiped
                    })
                } else {
                    //user has not matched with you before
                    console.log(`You swiped on ${userSwiped.displayName} ${userSwiped.occupation}`)
                    setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id), userSwiped)
        
                }

            })
           
        }
    return ( 
        <SafeAreaView style={tw("flex-1")}>
            {/* header */}
            <View style={tw("flex-row justify-between  px-4 py-2")}>
                <TouchableOpacity onPress={logout} activeOpacity={0.7} style={tw("")}>
                    <Image source={{uri: user.photoURL}} style={tw("h-10 w-10 rounded-full ")} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Modal")} activeOpacity={0.7} style={tw("")}>
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
                cards={profiles}
                stackSize={3}
                cardIndex={0}
                verticalSwipe={false}
                animateCardOpacity={true}
                backgroundColor={"#4FD"}
                onSwipedLeft={(cardIndex) => {console.log('swipped pass'), swipeLeft(cardIndex)}}
                onSwipedRight={(cardIndex) => {console.log('swipped match'), swipeRight(cardIndex)}}
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
                renderCard={(card) => card ?  (
                    <View key={card.id} style={tw(" relative bg-white h-3/4 rounded-xl ")}>
                        <Image 
                        source={{uri: card.photoURL}} 
                         style={tw("absolute top-0 h-full w-full rounded-xl")}
                          />

                        <View style={[tw("absolute bottom-0 bg-white w-full h-20 items-center flex-row justify-between px-6 py-2 rounded-b-xl"), styles.cardShadow]}>
                            <View>
                                <Text style={tw("text-xl font-semibold")}>{card.displayName}</Text>
                                <Text style={tw("font-semibold text-xs")}>{card.occupation}</Text>
                            </View>
                            <Text style={tw("text-2xl font-semibold")}>{card.age}</Text>
                        </View>
                    </View>
                ) : (
                    <View style={[tw("relative bg-white h-3/4 rounded-xl justify-center items-center"), styles.cardShadow]}>
                        <Text style={tw("font-semibold pb-5")}>No more profiles</Text>

                        <Image
                          style={tw("h-20 w-full")}
                          height={100}
                          width={100}
                          source={{uri:"https://links.papareact.com/6gb"}}
                          />
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