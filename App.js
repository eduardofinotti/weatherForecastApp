import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './src/screens/HomeScreen';
import CityDetailScreen from './src/screens/CityDetailScreen';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true }} >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CityDetailScreen" component={CityDetailScreen}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
