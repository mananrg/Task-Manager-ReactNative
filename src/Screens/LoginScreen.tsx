import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, Modal, SafeAreaView ,Button } from 'react-native';
import { signIn, sendPasswordReset } from '../Firebase/auth';
import globalStyles from '../styles';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    function validateEmail(email) {
        return emailRegex.test(email);
    }

    const handleLogin = async () => {
        if (!email) {
            Alert.alert("Email is Empty!");
            return;
        } else if (!validateEmail(email)) {
            Alert.alert("Enter a valid Email!");
            return;
        } else if (!password) {
            Alert.alert("Password is Empty!");
            return;
        }
        
        try {
            await signIn(email, password);
            setEmail('');
            setPassword('');
            navigation.navigate('Main', { screen: 'HomeScreen' }); // Navigate to 'HomeScreen' in 'MainTabNavigator'
            Alert.alert("Login Successful!");
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    const handleForgotPassword = () => {
        if (!forgotPasswordEmail) {
            Alert.alert("Email is Empty");
            return;
        }
        if (!validateEmail(forgotPasswordEmail)) {
            Alert.alert("Enter a valid Email");
            return;
        }
        
        sendPasswordReset(forgotPasswordEmail);
        setModalVisible(false);
        Alert.alert("Password reset link sent!");
    };

    return (
        <SafeAreaView style={globalStyles.screenContainer}>
            <View style={globalStyles.imageContainer}>
                <Image source={require('../../assets/task_management.png')} style={globalStyles.image} />
            </View>
            <Text style={globalStyles.headerText}>Welcome Back!</Text>
            <View style={globalStyles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    style={globalStyles.inputFields}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    style={globalStyles.inputFields}
                    secureTextEntry={true} // Ensure secureTextEntry is enabled for password input
                />
                
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={globalStyles.forgotPasswordButton}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalStyles.containerButton} onPress={handleLogin}>
                    <Text style={globalStyles.containerButtonText}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={globalStyles.textRowContainer}>
                <Text >Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={globalStyles.textButton}>Sign Up</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={globalStyles.modalOverlay}>
                    <View style={globalStyles.modalContainer}>
                        <Text style={globalStyles.modalTextHeadLine}>Reset Password</Text>
                        <TextInput
                            placeholder="Enter your email"
                            value={forgotPasswordEmail}
                            onChangeText={setForgotPasswordEmail}
                            style={globalStyles.modalInput}
                        />
                        <View style={globalStyles.textRowContainer}>
                            <Button title="Submit" onPress={handleForgotPassword} />
                            <Button title="Cancel" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default LoginScreen;
