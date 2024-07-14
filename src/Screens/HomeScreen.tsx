// HomeScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard, Platform, Modal, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../Firebase/firebase';
import { fetchTodos, addTodo, updateTodo, deleteTodo, toggleTodoStatus } from '../Firebase/firebaseService';
import DateTimePicker from '@react-native-community/datetimepicker';

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
    const user = auth.currentUser; 

    useEffect(() => {
        fetchTodosData();
    }, []);

    const fetchTodosData = async () => {
        try {
            const todosList = await fetchTodos();
            setTodos(todosList);
        } catch (error) {
            console.error("Error fetching todos: ", error);
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
                };
                await addTodo(newTodo);
                setAddData('');
                setDeadline(new Date());
                Keyboard.dismiss();
                fetchTodosData(); 
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
            fetchTodosData(); 
        } catch (error) {
            console.error("Error editing todo: ", error);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await deleteTodo(id);
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
        <View style={styles.container}>
            <Text style={styles.header}>Home</Text>
            <TextInput
                style={styles.input}
                placeholder="Add a new todo"
                value={addData}
                onChangeText={(text) => setAddData(text)}
            />
            <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
                <Text style={styles.dateButtonText}>
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
            <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
                <Text style={styles.addButtonText}>Add Todo</Text>
            </TouchableOpacity>
            <FlatList
                data={todos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.todoItem}>
                        <TouchableOpacity onPress={() => toggleComplete(item.id, item.status)}>
                            <FontAwesome
                                name={item.status === 'complete' ? 'check-square-o' : 'square-o'}
                                size={24}
                                color={item.status === 'complete' ? 'green' : '#1e90ff'}
                                style={styles.checkbox}
                            />
                        </TouchableOpacity>
                        <TextInput
                            style={[styles.todoText, item.status === 'complete' ? styles.completedText : null]}
                            value={item.text}
                            editable={false} // Make text non-editable directly in the list
                        />
                        <TouchableOpacity onPress={() => openEditModal(item.id, item.text, item.deadline)}>
                            <FontAwesome name="edit" size={24} color="#1e90ff" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeleteTodo(item.id)}>
                            <FontAwesome name="trash" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                )}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={editModalVisible}
                onRequestClose={() => setEditModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Edit Todo</Text>
                        <TextInput
                            style={styles.modalInput}
                            value={editTodoText}
                            onChangeText={(text) => setEditTodoText(text)}
                        />
                        <DateTimePicker
                            value={editTodoDeadline}
                            mode="datetime"
                            display="default"
                            onChange={(event, date) => setEditTodoDeadline(date || editTodoDeadline)}
                        />
                        <View style={styles.modalButtonContainer}>
                            <Pressable style={[styles.modalButton, styles.modalButtonClose]} onPress={() => setEditModalVisible(false)}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                            <Pressable style={[styles.modalButton, styles.modalButtonSave]} onPress={handleEditTodo}>
                                <Text style={styles.textStyle}>Save</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 10,
    },
    dateButton: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        alignItems: 'center',
        marginBottom: 10,
    },
    dateButtonText: {
        color: '#000',
        fontSize: 18,
    },
    addButton: {
        backgroundColor: '#1e90ff',
        padding: 15,
        alignItems: 'center',
        marginBottom: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        borderRadius: 12,
    },
    todoText: {
        fontSize: 18,
        flex: 1,
        marginLeft: 10,
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#777',
    },
    checkbox: {
        marginRight: 10, 
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontSize: 20,
        marginBottom: 15,
        textAlign: 'center',
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 15,
        width: '100%',
        fontSize: 18,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 10,
    },
    modalButton: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
    },
    modalButtonClose: {
        backgroundColor: '#2196F3',
    },
    modalButtonSave: {
        backgroundColor: '#1e90ff',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default HomeScreen;
