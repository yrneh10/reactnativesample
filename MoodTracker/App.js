import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddMoodScreen from './screens/AddMoodScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import * as Notifications from 'expo-notifications';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    Notifications.requestPermissionsAsync();
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Mood Tracker" component={HomeScreen} />
          <Stack.Screen name="Add Mood" component={AddMoodScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
