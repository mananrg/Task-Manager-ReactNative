import { StyleSheet  } from "react-native";

export default StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    
    imageContainer: {
        flex: 1,
        marginTop: 80,
        justifyContent: 'center',
        marginBottom: 0
    },
    image: {
        height: 250,
        width: 250,
    },
    containerButton: {
        backgroundColor: '#6C63FF',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginTop: 10,
        alignItems: 'center',
        width: '80%',
        maxWidth: 400
    },
    containerButtonText: {
        color: '#ffffff', // Text color
        fontSize: 16, // Text size
        fontWeight: 'bold', // Text weight
    }, 
    textButton: {
        color: '#6C63FF', // Text color
        fontSize: 16, // Text size
        fontWeight: 'bold', // Text weigh
        width: '100%', 
        paddingHorizontal: 16,
        alignItems: 'center',
    },
 
    forgotPasswordButton: {
        color: '#6C63FF', 
        fontSize: 16, 
        fontWeight: 'bold',
        width: '100%', 
        backgroundColor: '#eeeeee',
       
    },
    textRowContainer: {
        flexDirection: 'row', // Set direction to row to align children horizontally
        justifyContent: 'center', // Center children horizontally
        alignItems: 'center', // Center children vertically
        padding: 16,
    },
   
    inputContainer: {
        marginTop: 0,
        flex: 1, // Use flex to take up space and center inputs
        alignItems: 'center',
        width: '100%', // Ensure inputs take full width of the container
        maxWidth: 400, // Set a maximum width for the input container
    },
    modalTextHeadLine: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        height: '40%',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        width: '100%',
        borderRadius: 12 
    },
    inputFields: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 30, paddingHorizontal: 8, borderRadius: 8, width: '90%', maxWidth: 400 },

})