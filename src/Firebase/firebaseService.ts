import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, where, query } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, firestore, storage } from './firebase'; // Adjust path as per your project structure

export const uploadImage = async (blob: Blob): Promise<string> => {
    try {
        // Generate a unique image name
        const imageName = `${new Date().getTime()}_image`;

        // Create a reference to the image path
        const imageRef = ref(storage, `images/${imageName}`);

        // Upload blob to Firebase Storage
        const snapshot = await uploadBytes(imageRef, blob);

        // Get the download URL for the image
        const downloadURL = await getDownloadURL(snapshot.ref);

        return downloadURL;
    } catch (error) {
        console.error('Error uploading image: ', error);
        throw error; // Handle error appropriately in your application
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