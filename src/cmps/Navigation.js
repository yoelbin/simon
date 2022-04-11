import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import HighScoreScreen from '../screens/HighScoreScreen';

const Stack = createNativeStackNavigator()

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Game" component={GameScreen} />
                <Stack.Screen name="HighScore" component={HighScoreScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation

