import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View,KeyboardAvoidingView, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useLayoutEffect, useState,  } from 'react'
import { Avatar, Icon } from '@rneui/base'
import { auth, db } from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const ChatScreen = ({navigation, route}) => {

    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerTitleAlign: "left",
            headerBackTitleVisible: false,
            headerTitle: () => (
                <View style={{flexDirection:"row",alignItems:"center"}}>
                    <Avatar rounded source={{uri: 'https://i.postimg.cc/65Htq3dH/bbf4623b-4679-4f78-871c-7f766dbefaae.jpg'}}/>
                    <Text style={{color:"white", marginLeft: 10,fontWeight:"700"}}>{route.params.chatName}</Text>
                </View>
            ),
            headerRight: () => (
                <View style={{flexDirection:"row",justifyContent:"space-between",width: 80,marginRight: 20}}>
                    <TouchableOpacity>
                        <Icon name="video-camera" type='font-awesome' color="white" size={24}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="call" type='ionicon' color="white" size={24}/>
                    </TouchableOpacity>
                </View>
            )
        })
    },[navigation, messages])

    const sendMessage = () => {
        Keyboard.dismiss();
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email:auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })

        setInput('')
    };

    useLayoutEffect(() => {
        const unsubcribe = db.collection('chats').doc(route.params.id).collection('messages').orderBy('timestamp','desc').onSnapshot((snapshot) => setMessages(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
            }))
        ))
        return unsubcribe;
    },[route])

  return (
    <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
        <StatusBar style="light"/>
        <KeyboardAvoidingView behavior={Platform.OS === "android" ? "height" : "padding"} style={styles.container} keyboardVerticalOffset={90}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
                <ScrollView contentContainerStyle={{paddingTop: 15}}>
                    {messages.map(({id,data}) => (
                        data.email === auth.currentUser.email ? (
                            <View key={id} style={styles.reciever}>
                                <Avatar source={{uri:messages[0]?.data.photoURL,}} rounded size={30}/>
                                <Text style={styles.recieverText}>{data.message}</Text>
                            </View>
                        ):(
                            <View key={id} stack={styles.sender}>
                                <Avatar source={{uri: data.photoURL}} rounded size={30} />
                                <Text style={styles.senderText}>{data.message}</Text>
                                <Text style={styles.senderName}>{data.displayName}</Text>
                            </View>
                        )
                    ))}
                </ScrollView>
                <View style={styles.footer}>
                    <TextInput value={input} onChangeText={(text) => setInput(text)} placeholder="Signal Message" style={styles.textInput} onSubmitEditing={sendMessage}/>
                    <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                        <Icon name='send' type='ionicon' size={24} color="#2B68E6"/>
                    </TouchableOpacity>
                </View>
                
                </>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
            
    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15,
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30,
    },
    reciever: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"
    },
    sender: {
        padding: 15,
        backgroundColor: "#2B68E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"
    },
    senderName: {
        left:10,
        paddingRight: 10,
        fontSize: 10,
        color: "white"
    },
    recieverText: {
        color:"black",
        fontWeight: "500",
        marginLeft: 10,
    }
})