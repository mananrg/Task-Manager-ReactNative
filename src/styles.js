import { StyleSheet  } from "react-native";

export default StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        width: '100%'
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor:'#ffffff',
        justifyContent: 'center'
    },
    headerText:{
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#6C63FF',
    },
    headerSubText:{
        fontSize: 17,
        textAlign: 'center',
        marginBottom: 20,
        color: '#6C63FF'
    },
    imageContainer: {
        flex: 1,
        marginTop: 80,
        alignItems:'center',
        marginBottom: 0,
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
        color: '#ffffff', 
        fontSize: 16, 
        fontWeight: 'bold', 
    }, 
    textButton: {
        color: '#6C63FF', 
        fontSize: 16, 
        fontWeight: 'bold', 
        width: '100%', 
        paddingHorizontal: 16,
        alignItems: 'center',
    },
 
    forgotPasswordButton: {
        color: '#6C63FF', 
        fontSize: 16, 
        fontWeight: 'bold',
        width: '100%', 
      //  backgroundColor: '#eeeeee',
    },
    textRowContainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingBottom: 16,
    },
   
    inputContainer: {
        marginTop: 0,
        flex: 1, 
        alignItems: 'center',
        width: '100%', 
        maxWidth: 400, 
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
    inputFields: { 
        height: 40, 
        borderColor: '#6C63FF', 
        borderWidth: 1, 
        marginTop: 15,
        marginBottom: 15, 
        paddingHorizontal: 8, 
        borderRadius: 8, 
        width: '90%', 
        maxWidth: 400 
    },
    /* {} */
    
    scrollViewContent: {
        flexGrow: 1,
width: '100%'
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
        borderRadius: 8,
        backgroundColor: '#6C63FF',
        marginTop: 10,
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
        marginBottom: 6,
    },
    todoContent: {
        flex: 1,
        marginLeft: 10,
    },
    todoText: {
        fontSize: 18,
    },
    todoDeadline: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#777',
    },
    checkbox: {
        marginRight: 10,
    },
    deleteIcon: {
        paddingLeft: 12,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
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
        width: '90%', // Ensure the modal takes up most of the screen width

    },
    modalText: {
        fontSize: 20,
        marginBottom: 15,
        textAlign: 'center',
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 8, 
        height: 40,
        paddingVertical: 20,
        borderRadius: 8,
        marginBottom: 15,
        width: '100%',
        fontSize: 18,
        flex: 1
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        width: '100%',
        marginTop: 10,
    },
    modalButton: {
        borderRadius: 5,
        padding: 10,
        elevation: 10,
    },
    modalButtonClose: {
        backgroundColor: '#6C63FF',
    },
    modalButtonSave: {
        backgroundColor: '#6C63FF',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },

    /*{ LeaderBoard Screen }*/
    leaderboardItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        borderRadius: 12,
        marginBottom: 6,
    },
    leaderboardName: {
        fontSize: 18,
    },
    leaderboardCount: {
        fontSize: 18,
        color: '#6C63FF',
    },
})