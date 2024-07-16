import React, { useState, useEffect } from 'react';
import {
    View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard, Alert,
    Platform, Modal, Pressable, KeyboardAvoidingView, ScrollView
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../Firebase/firebase';
import { addTodo, updateTodo, deleteTodo, toggleTodoStatus, fetchTodosUser, uploadImage } from '../Firebase/firebaseService';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyles from '../styles';
import * as ImagePicker from 'expo-image-picker';

const HomeScreen = () => {
    const [todos, setTodos] = useState([]);
    const [addData, setAddData] = useState('');
    const [deadline, setDeadline] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editTodoId, setEditTodoId] = useState('');
    const [editTodoText, setEditTodoText] = useState('');
    const [editTodoDeadline, setEditTodoDeadline] = useState(new Date());
    const navigation = useNavigation();
    const [imageUrl, setImageUrl] = useState(undefined);

    const user = auth.currentUser;

    useEffect(() => {
        fetchTodosData();
    }, []);

    const fetchTodosData = async () => {
        try {
            const todosList = await fetchTodosUser();
            setTodos(todosList);
        } catch (error) {
            console.error("Error fetching todos: ", error);
        }
    };

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled && result.assets.length > 0) {
                const response = await fetch(result.assets[0].uri);
                const blob = await response.blob();
                const imageUrl = await uploadImage(blob);
                setImageUrl(imageUrl);
            }
        } catch (error) {
            console.error('Error picking image: ', error);
            Alert.alert('Error', 'Failed to pick an image.');
        }
    };

    const handleAddTodo = async () => {
        try {
            if (addData && addData.length > 0 && user) {
                const timestamp = new Date();
                const newTodo = {
                    text: addData,
                    createdAt: timestamp,
                    deadline: deadline,
                    userId: user.uid,
                    status: 'pending',
                    imageUrl: imageUrl || '',

                };
                await addTodo(newTodo);
                setAddData('');
                setDeadline(new Date());
                setImageUrl(undefined);
                Keyboard.dismiss();
                fetchTodosData();
                Alert.alert("Item Added to List");
            } else {
                Alert.alert("Please enter a event");
                return;
            }
        } catch (error) {
            console.error("Error adding todo: ", error);
        }
    };

    const handleEditTodo = async () => {
        try {
            const updatedFields = {
                text: editTodoText,
                deadline: editTodoDeadline,
            };
            await updateTodo(editTodoId, updatedFields);
            setEditModalVisible(false);
            Alert.alert("Item Edited Successfully!");
            fetchTodosData();
        } catch (error) {
            console.error("Error editing todo: ", error);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await deleteTodo(id);
            Alert.alert("Item Deleted Successfully!");
            fetchTodosData();
        } catch (error) {
            console.error("Error deleting todo: ", error);
        }
    };

    const toggleComplete = async (id, currentStatus) => {
        try {
            const newStatus = currentStatus === 'pending' ? 'complete' : 'pending';
            await toggleTodoStatus(id, newStatus);
            fetchTodosData();
        } catch (error) {
            console.error("Error toggling status: ", error);
        }
    };

    const showDatePicker = () => {
        setShowPicker(true);
    };

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || deadline;
        setShowPicker(Platform.OS === 'ios');
        setDeadline(currentDate);
    };

    const openEditModal = (id, text, deadline) => {
        setEditTodoId(id);
        setEditTodoText(text);
        setEditTodoDeadline(deadline instanceof Date ? deadline : new Date(deadline));
        setEditModalVisible(true);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <SafeAreaView style={globalStyles.container}>
                <ScrollView contentContainerStyle={globalStyles.scrollViewContent}>
                    <Text style={globalStyles.headerText}>ToDo List</Text>
                    <TextInput
                        style={globalStyles.inputFields}
                        placeholder="Add a new todo"
                        value={addData}
                        onChangeText={(text) => setAddData(text)}
                    />
                        <Text style={globalStyles.deadlineText}>Select a Deadline:</Text>
                    <TouchableOpacity onPress={showDatePicker} style={globalStyles.dateButton}>
                        <Text style={globalStyles.dateButtonText}>
                            {deadline ? deadline.toLocaleDateString() + ' ' + deadline.toLocaleTimeString() : 'Set Deadline'}
                        </Text>
                    </TouchableOpacity>
                    {showPicker && deadline instanceof Date && (
                        <DateTimePicker
                            value={deadline}
                            mode="datetime"
                            display="default"
                            onChange={onDateChange}
                        />
                    )}
                    <TouchableOpacity style={globalStyles.addButton} onPress={handleAddTodo}>
                        <Text style={globalStyles.addButtonText}>Add Todo</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={todos}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={globalStyles.todoItem}>
                                <TouchableOpacity onPress={() => toggleComplete(item.id, item.status)}>
                                    <FontAwesome
                                        name={item.status === 'complete' ? 'check-square-o' : 'square-o'}
                                        size={24}
                                        color={item.status === 'complete' ? 'green' : '#6C63FF'}
                                        style={globalStyles.checkbox}
                                    />
                                </TouchableOpacity>
                                <View style={globalStyles.todoContent}>
                                    <TextInput
                                        style={[globalStyles.todoText, item.status === 'complete' ? globalStyles.completedText : null]}
                                        value={item.text}
                                        editable={false} // Make text non-editable directly in the list
                                    />
                                    <Text style={globalStyles.todoDeadline}>{item.deadline.toLocaleDateString() + ' ' + item.deadline.toLocaleTimeString()}</Text>
                                </View>
                                <View style={globalStyles.iconContainer}>
                                    <TouchableOpacity onPress={() => openEditModal(item.id, item.text, item.deadline)}>
                                        <FontAwesome name="edit" size={24} color= "#6C63FF" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={globalStyles.deleteIcon} onPress={() => handleDeleteTodo(item.id)}>
                                        <FontAwesome name="trash" size={22} color="#FF4848" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={editModalVisible}
                        onRequestClose={() => setEditModalVisible(false)}
                    >
                        <View style={globalStyles.centeredView}>
                            <View style={globalStyles.modalView}>
                                <Text style={globalStyles.modalText}>Edit Todo</Text>
                                <TextInput
                                    style={globalStyles.modalInput}
                                    value={editTodoText}
                                    onChangeText={(text) => setEditTodoText(text)}
                                />
                                <DateTimePicker
                                    value={editTodoDeadline}
                                    mode="datetime"
                                    display="default"
                                    onChange={(event, date) => setEditTodoDeadline(date || editTodoDeadline)}
                                />
                                <View style={globalStyles.modalButtonContainer}>
                                    <Pressable style={[globalStyles.modalButton, globalStyles.modalButtonClose]} onPress={() => setEditModalVisible(false)}>
                                        <Text style={globalStyles.textStyle}>Cancel</Text>
                                    </Pressable>
                                    <Pressable style={[globalStyles.modalButton, globalStyles.modalButtonSave]} onPress={handleEditTodo}>
                                        <Text style={globalStyles.textStyle}>Save</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
   
});

export default HomeScreen;
