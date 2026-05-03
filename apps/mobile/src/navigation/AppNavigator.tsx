import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerTabs from './CustomerTabs';
import ProviderTabs from './ProviderTabs';
import BookingFlow from '../screens/Booking/BookingFlow';
import ConfirmationScreen from '../screens/Booking/ConfirmationScreen';
import TrackingScreen from '../screens/Booking/TrackingScreen';
import JobDetailScreen from '../screens/Provider/JobDetailScreen';
import ChatScreen from '../screens/Messages/ChatScreen';
import SettingsScreen from '../screens/Account/SettingsScreen';
import { useAuthStore } from '../store/authStore';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const role = useAuthStore((s) => s.role);
  const isProvider = role === 'provider';

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={isProvider ? 'ProviderTabs' : 'CustomerTabs'}
        component={isProvider ? ProviderTabs : CustomerTabs}
      />
      <Stack.Screen
        name="BookingFlow"
        component={BookingFlow}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
      <Stack.Screen name="Tracking" component={TrackingScreen} options={{ headerShown: true, title: 'Tracking' }} />
      <Stack.Screen name="JobDetail" component={JobDetailScreen} options={{ headerShown: true, title: 'Job' }} />
      <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: true, title: 'Chat' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: true, title: 'Settings' }} />
    </Stack.Navigator>
  );
}
