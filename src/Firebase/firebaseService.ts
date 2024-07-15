// FirebaseService.ts

import { collection, getDocs, orderBy, query, addDoc, updateDoc, deleteDoc, doc, where } from 'firebase/firestore';
import { firestore, auth } from '../Firebase/firebase';

export const fetchTodos = async () => {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error('User not authenticated.');
        }
        
        const todoRef = collection(firestore, 'todos');
        const q = query(todoRef, where('userId', '==', user.uid), orderBy('createdAt', 'desc'));
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
export const fetchTodosUser = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user logged in');
  
      const todoRef = collection(firestore, 'todos');
      const q = query(todoRef, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
  
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        deadline: doc.data().deadline.toDate(),
        createdAt: doc.data().createdAt.toDate()
      }));
    } catch (error) {
      console.error("Error fetching todos: ", error);
      throw error;
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
