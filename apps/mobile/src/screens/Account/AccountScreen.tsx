import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Screen from '../../components/Screen';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import { colors } from '../../utils/colors';
import { fontSize, fontWeight, spacing } from '../../utils/spacing';
import { useAuth } from '../../hooks/useAuth';
import { useUser } from '../../hooks/useUser';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import type { CustomerStackParamList } from '../../types';

type Nav = NativeStackNavigationProp<CustomerStackParamList, 'CustomerTabs'>;

export default function AccountScreen() {
  const navigation = useNavigation<Nav>();
  const { user, signOut, role } = useAuth();
  const { profile } = useUser();
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <Screen padded={false}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: tabBarHeight + spacing.lg }}>
        <View style={styles.header}>
          <Avatar name={profile?.full_name ?? user?.email ?? '?'} size={72} />
          <View style={{ marginLeft: spacing.lg, flex: 1 }}>
            <Text style={styles.name}>{profile?.full_name ?? 'Your account'}</Text>
            <Text style={styles.email}>{user?.email ?? ''}</Text>
            <Text style={styles.role}>{role === 'provider' ? 'Provider' : 'Customer'}</Text>
          </View>
        </View>

        <Card style={{ marginTop: spacing.xl }}>
          <Section title="Profile" desc="Name, photo, contact info" onPress={() => navigation.navigate('Settings')} />
          <Section title="Payment methods" desc="Manage saved cards" />
          <Section title="Booking history" desc="All your past jobs" />
          <Section title="Notifications" desc="Email, push, SMS" />
          <Section title="Privacy" desc="Data, sharing, account deletion" />
          <Section title="Support" desc="Get help, contact us" />
        </Card>

        <View style={{ height: spacing.lg }} />
        <Button label="Sign out" variant="outline" fullWidth onPress={signOut} />
      </ScrollView>
    </Screen>
  );
}

function Section({ title, desc, onPress }: { title: string; desc: string; onPress?: () => void }) {
  return (
    <View style={styles.section}>
      <View style={{ flex: 1 }}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionDesc}>{desc}</Text>
      </View>
      <Text style={{ color: colors.textLight, fontSize: 18 }}>›</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center' },
  name: { fontSize: fontSize.xl, fontWeight: fontWeight.bold, color: colors.navy },
  email: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 2 },
  role: { fontSize: fontSize.xs, color: colors.blue, fontWeight: fontWeight.bold, textTransform: 'uppercase', marginTop: 4, letterSpacing: 0.5 },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomColor: colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  sectionTitle: { fontSize: fontSize.md, fontWeight: fontWeight.semibold, color: colors.navy },
  sectionDesc: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
});
