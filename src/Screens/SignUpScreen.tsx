import React, { useState } from "react";
import { View, TextInput, Image, StyleSheet, TouchableOpacity, Alert, Text, SafeAreaView } from 'react-native';
import { signUp } from '../Firebase/auth';
import globalStyles from '../styles';

const SignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    function validateEmail(email) {
        return emailRegex.test(email);
    }


    const handleSignUp = async () => {
        if (!email) {
            Alert.alert("Email is Empty");
            return;
        } else if (!validateEmail(email)) {
            Alert.alert("Enter a valid Email!");
            return;
        }
        else if (!name) {
            Alert.alert("Name is Empty");
            return;
        }
        else if (!validateEmail(email)) {
            console.log("Enter a valid Email");
        }
        else if (!password) {
            Alert.alert("Password is Empty");
            return;
        }
        else if (password.length < 8) {
            Alert.alert("Enter a strong password!");
        }
        else if (!confirmPassword) {
            Alert.alert("ConfirmPassword is Empty");
            return;
        }
        else if (password !== confirmPassword) {
            Alert.alert("Passwords do not match!");
            return;
        } else {
            try {
                await signUp(email, password, name);
                setEmail('')
                setPassword('')
                setName('')
                setconfirmPassword('')
                navigation.navigate('Main', { screen: 'HomeScreen' });
                Alert.alert("SignUp Successful!")
            }
            catch (error) {
                Alert.alert(error.message)
            }
        }

    }


    return (
        <SafeAreaView style={globalStyles.screenContainer}>
            {/* <View style={globalStyles.imageContainer}>
                <Image source={require('../../assets/task_management.png')} style={globalStyles.image} />
            </View> */}
            <Text style={globalStyles.headerText}>Welcome</Text>
            <Text style={globalStyles.headerSubText}>Please enter your details!</Text>

            <View style={globalStyles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={globalStyles.inputFields}
                />
                <TextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                    style={globalStyles.inputFields}
                />
                {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}> */}
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    // secureTextEntry={true}
                    style={globalStyles.inputFields}
                />
                <TextInput
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setconfirmPassword}
                    //  secureTextEntry={true}
                    style={globalStyles.inputFields}
                />
                <TouchableOpacity style={globalStyles.containerButton} onPress={handleSignUp}>
                    <Text style={globalStyles.containerButtonText}>SignUp</Text>
                </TouchableOpacity>
            </View>



            <View style={globalStyles.textRowContainer}>
                <Text >Dont have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={globalStyles.textButton}>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default SignUpScreen;
