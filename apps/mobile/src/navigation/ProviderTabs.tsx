import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProviderHomeScreen from '../screens/Provider/ProviderHomeScreen';
import ProviderProfileScreen from '../screens/Provider/ProfileScreen';
import EarningsScreen from '../screens/Provider/EarningsScreen';
import ConversationListScreen from '../screens/Messages/ConversationListScreen';
import AccountScreen from '../screens/Account/AccountScreen';
import { colors } from '../utils/colors';
import { fontWeight } from '../utils/spacing';
import type { ProviderTabParamList } from '../types';

const Tab = createBottomTabNavigator<ProviderTabParamList>() as any;

const icon = (emoji: string) => ({ color, size }: { color: string; size: number }) => (
  <Text style={{ fontSize: size, color }}>{emoji}</Text>
);

export default function ProviderTabs() {
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, 8);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.teal,
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
      <Tab.Screen name="Jobs" component={ProviderHomeScreen} options={{ tabBarIcon: icon('🧰') }} />
      <Tab.Screen
        name="ProviderProfile"
        component={ProviderProfileScreen}
        options={{ tabBarIcon: icon('🪪'), title: 'Profile' }}
      />
      <Tab.Screen name="Earnings" component={EarningsScreen} options={{ tabBarIcon: icon('💰') }} />
      <Tab.Screen name="Messages" component={ConversationListScreen} options={{ tabBarIcon: icon('💬') }} />
      <Tab.Screen name="Account" component={AccountScreen} options={{ tabBarIcon: icon('👤') }} />
    </Tab.Navigator>
  );
}
