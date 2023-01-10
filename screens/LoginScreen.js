import { View, Text, StyleSheet} from 'react-native'
import { KeyboardAvoidingView} from 'react-native'
import React, { useEffect, useState } from 'react';
import { Image, Input,Button } from '@rneui/base';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if(authUser){
        navigation.replace('Home');
      }
    });

    return unsubcribe;
  },[])

  const signIn = () => {
    auth.signInWithEmailAndPassword(email,password).catch((error) => alert(error));
  }
  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <StatusBar style="light"/>
        <Image source={{uri:'https://i.postimg.cc/bNDyWFww/download.png'}} style={{width:200,height:200}}/>
        <View style={styles.inputContainer}>
          <Input placeholder="Email" autoFocus type="email" value={email} onChangeText={(text) => setEmail(text)} />
          <Input placeholder="Password" secureTextEntry type="password" value={password} onChangeText={(text) => setPassword(text)} onSubmitEditing={signIn}/>
        </View>
        <Button title="Login" containerStyle={styles.button} onPress={signIn}/>
        <Button title="Register" containerStyle={styles.button} type="outline" onPress={() => navigation.navigate('Register')} />
        <View style={{height: 100}}/>
    </KeyboardAvoidingView>
  )
} 

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
})