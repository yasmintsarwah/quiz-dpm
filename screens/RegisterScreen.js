import { View,StyleSheet} from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Image, Input,Button, Text } from '@rneui/base';
import { auth } from '../firebase';

const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [imageUrl, setImageUrl] = useState("")

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back To Login",
        })
    },[navigation])

    const register = () => {
        auth
        .createUserWithEmailAndPassword(email,password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || 'https://i.postimg.cc/gJ3tBTMQ/Who-s-Your-Anime-Boyfriend.png'
            })
        })
        .catch(error => alert(error.message))
    };
  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <StatusBar style="Light"/>
        <Text h3 style={{marginBottom: 50}}>Create a Signal Account</Text>
        <View style={styles.inputContainer}>
            <Input placeholder='Full Name' autoFocus type='text' value={name} onChangeText={text => setName(text)} />
            <Input placeholder='Email'  type='email' value={email} onChangeText={text => setEmail(text)} />
            <Input placeholder='Password'  type='text' value={password} onChangeText={text => setPassword(text)} secureTextEntry/>
            <Input placeholder='Profile Picture URL (Optional)'  type='text' value={imageUrl} onChangeText={text => setImageUrl(text)} onSubmitEditing={register} />
        </View>
        <Button title='Register' onPress={register} raised containerStyle={styles.button} />
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: "white",
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    inputContainer : {
        width: 300,
    }
})