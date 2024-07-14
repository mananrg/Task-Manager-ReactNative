import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BottomNavigationBar = ({ navigation, state }) => {
  const [activeIcon, setActiveIcon] = useState(0);

  const handleIconPress = (index, routeName) => {
    setActiveIcon(index);
    navigation.navigate(routeName);
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

//   const renderIcon = (routeName, isActive) => {
//     const color = isActive ? '#6C63FF' : 'black';
//     switch (routeName) {
//       case 'HomeScreen':
//         return <Icon name="home" size={24} color={color} />;
//       case 'LeaderBoardScreen':
//         return <Icon name="leaderboard" size={24} color={color} />;
//       default:
//         return <Text>{routeName}</Text>; // Fallback to show route name if icon is missing
//     }
//   };

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => (
        <TouchableOpacity
          key={route.key}
          style={styles.icon}
          onPress={() => handleIconPress(index, route.name)}
        >
          {/* {renderIcon(route.name, activeIcon === index)} */}
          <Text style={[styles.label, { color: activeIcon === index ? '#6C63FF' : 'black' }]}>
            {route.name}
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.icon} onPress={handleLogout}>
        <Icon name="logout" size={24} color="black" />
        <Text style={styles.label}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#eeeeee',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  icon: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default BottomNavigationBar;