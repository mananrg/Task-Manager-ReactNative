import React from "react";
import { LogBox } from 'react-native';
import Navigation from './src/Support/Navigation';
import messaging from '@react-native-firebase/messaging';


// Ignoring all screen warnings
LogBox.ignoreLogs([
  'Warning: ...', 
]);
LogBox.ignoreLogs([
    'Console Warning: ...'
])
LogBox.ignoreAllLogs()


const App = () => {

    return <Navigation />;
}

export default App;
