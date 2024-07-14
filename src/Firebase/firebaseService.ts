// FirebaseService.js

import { collection, getDocs, orderBy, query, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../Firebase/firebase';

export const fetchTodos = async () => {
    try {
        const todoRef = collection(firestore, 'todos');
        const q = query(todoRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            deadline: doc.data().deadline ? doc.data().deadline.toDate() : new Date()
        }));
    } catch (error) {
        console.error("Error fetching todos: ", error);
        return [];
    }
};

export const addTodo = async (newTodo) => {
    try {
        await addDoc(collection(firestore, 'todos'), newTodo);
    } catch (error) {
        console.error("Error adding todo: ", error);
        throw error;
    }
};

export const updateTodo = async (todoId, updatedFields) => {
    try {
        const todoDoc = doc(firestore, 'todos', todoId);
        await updateDoc(todoDoc, updatedFields);
    } catch (error) {
        console.error("Error updating todo: ", error);
        throw error;
    }
};

export const deleteTodo = async (todoId) => {
    try {
        const todoDoc = doc(firestore, 'todos', todoId);
        await deleteDoc(todoDoc);
    } catch (error) {
        console.error("Error deleting todo: ", error);
        throw error;
    }
};

export const toggleTodoStatus = async (todoId, newStatus) => {
    try {
        const todoDoc = doc(firestore, 'todos', todoId);
        await updateDoc(todoDoc, { status: newStatus });
    } catch (error) {
        console.error("Error toggling todo status: ", error);
        throw error;
    }
};
