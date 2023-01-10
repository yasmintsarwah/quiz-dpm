import { StyleSheet, Text, View,SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React,{useEffect, useLayoutEffect, useState} from 'react'
import CustomListItem from '../components/CustomListItem'
import { Avatar } from '@rneui/base';
import { auth,db } from '../firebase';
import { Icon } from '@rneui/themed';

const HomeScreen = ({navigation}) => {
  const [chats, setChats] = useState([])

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login');
        })
    }

    useEffect(() => {
      const unsubribe = db.collection("chats").onSnapshot((snapshot) => {
        setChats(
          snapshot.docs.map((doc) => ({
            id:doc.id,
            data: doc.data(),
          }))
        )
      })

      return unsubribe
    },[])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Signal',
            headerStyle : {backgroudColor: '#fff'},
            headerTitleStyle: {color: 'black'},
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                  <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                    <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }}/>
                  </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View 
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: 80,
                  marginRight: 20,
                }}
                >
                  <TouchableOpacity activeOpacity={0.5}>
                    <Icon name="camerao" type='antdesign' size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                  onPress={() => navigation.navigate('AddChat')} 
                  activeOpacity={0.5}>
                    <Icon type='simple-line-icon' name="pencil" size={24} color="black" />
                  </TouchableOpacity>
                </View>
            ),
        })
    },[navigation]);

    const enterChat = (id, chatName) => {
      navigation.navigate('Chat', {
        id,
        chatName
      })
    }

    return (
    <SafeAreaView>
        <ScrollView style={styles.container}>
          {chats.map(({id,data: {chatName}}) => (
            <CustomListItem id={id} chatName={chatName} key={id} enterChat={enterChat} />
          ))}
        </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
  }
})