import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import AuthNavigator from './navigation/AuthNavigator';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import { useAuthBootstrap } from './hooks/useAuth';
import { useAuthStore } from './store/authStore';
import { colors } from './utils/colors';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.light,
    card: colors.white,
    primary: colors.blue,
    text: colors.textDark,
    border: colors.border,
  },
};

function Root() {
  useAuthBootstrap();
  const { initialized, session } = useAuthStore();

  if (!initialized) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.navy, justifyContent: 'center' }}>
        <LoadingSpinner message="Loading Pronto..." />
      </View>
    );
  }

  return (
    <NavigationContainer theme={theme}>
      {session ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ErrorBoundary>
          <Root />
          <StatusBar style="auto" />
        </ErrorBoundary>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
