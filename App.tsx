import React from "react";
import { LogBox } from 'react-native';
import Navigation from './src/Support/Navigation';

// Ignore specific logs and warnings
LogBox.ignoreLogs([
  'Warning: ...', // add specific warnings here
]);
LogBox.ignoreLogs([
    'Console Warning: ...'
])
LogBox.ignoreAllLogs()

const App = () => {
    return <Navigation />;
}

export default App;
