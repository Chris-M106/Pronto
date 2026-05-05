import React from 'react';
import { Platform, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from '../screens/Home/HomeScreen';
import SearchScreen from '../screens/Home/SearchScreen';
import ConversationListScreen from '../screens/Messages/ConversationListScreen';
import AccountScreen from '../screens/Account/AccountScreen';
import { colors } from '../utils/colors';
import { fontWeight } from '../utils/spacing';
import type { CustomerTabParamList } from '../types';

const Tab = createBottomTabNavigator<CustomerTabParamList>() as any;

const icon = (emoji: string) => ({ color, size }: { color: string; size: number }) => (
  <Text style={{ fontSize: size, color }}>{emoji}</Text>
);

export default function CustomerTabs() {
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, Platform.OS === 'android' ? 48 : 8);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: colors.textLight,
        tabBarLabelStyle: { fontSize: 11, fontWeight: fontWeight.semibold as any },
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.border,
          paddingTop: 6,
          paddingBottom: bottomPad,
          height: 56 + bottomPad,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: icon('🏠') }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarIcon: icon('🔍') }} />
      <Tab.Screen name="Messages" component={ConversationListScreen} options={{ tabBarIcon: icon('💬') }} />
      <Tab.Screen name="Account" component={AccountScreen} options={{ tabBarIcon: icon('👤') }} />
    </Tab.Navigator>
  );
}
