import React from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Screen from '../../components/Screen';
import Card from '../../components/Card';
import Button from '../../components/Button';
import BookingCard from '../../components/BookingCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { colors } from '../../utils/colors';
import { fontSize, fontWeight, spacing } from '../../utils/spacing';
import { useBookings } from '../../hooks/useBookings';
import { useUser } from '../../hooks/useUser';
import type { CustomerStackParamList } from '../../types';

type Nav = NativeStackNavigationProp<CustomerStackParamList, 'CustomerTabs'>;

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const { profile } = useUser();
  const { bookings, loading, refresh } = useBookings();

  const upcoming = bookings.filter((b) => ['pending', 'accepted', 'in_progress'].includes(b.status));

  return (
    <Screen padded={false}>
      <FlatList
        data={upcoming}
        keyExtractor={(b) => b.id}
        contentContainerStyle={{ padding: spacing.lg }}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} tintColor={colors.blue} />}
        ListHeaderComponent={
          <View>
            <Text style={styles.greeting}>Hi {profile?.full_name?.split(' ')[0] ?? 'there'} 👋</Text>
            <Text style={styles.title}>What needs done today?</Text>

            <View style={styles.actionRow}>
              <Card onPress={() => navigation.navigate('BookingFlow')} style={[styles.action, { backgroundColor: colors.navy }]}>
                <Text style={styles.actionEmoji}>＋</Text>
                <Text style={styles.actionLabel}>Book a service</Text>
              </Card>
              <Card
                onPress={() => (navigation as any).navigate('Search')}
                style={[styles.action, { backgroundColor: colors.tealBg }]}
              >
                <Text style={styles.actionEmoji}>🔍</Text>
                <Text style={[styles.actionLabel, { color: colors.navy }]}>Find a pro</Text>
              </Card>
            </View>

            <Text style={styles.section}>Upcoming jobs</Text>
            {!loading && upcoming.length === 0 ? (
              <Card style={{ alignItems: 'center', paddingVertical: spacing.xxl }}>
                <Text style={styles.emptyTitle}>Nothing scheduled</Text>
                <Text style={styles.emptyDesc}>Book your first service to see it here.</Text>
                <View style={{ height: spacing.md }} />
                <Button label="Book a service" onPress={() => navigation.navigate('BookingFlow')} />
              </Card>
            ) : null}
          </View>
        }
        renderItem={({ item }) => (
          <BookingCard
            booking={item}
            onPress={() => navigation.navigate('Tracking', { bookingId: item.id })}
          />
        )}
        ListFooterComponent={loading ? <LoadingSpinner /> : null}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  greeting: { fontSize: fontSize.md, color: colors.textMuted, marginBottom: spacing.xs },
  title: { fontSize: fontSize.display, fontWeight: fontWeight.black, color: colors.navy, letterSpacing: -1, marginBottom: spacing.xl },
  actionRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.xl },
  action: { flex: 1, alignItems: 'flex-start' },
  actionEmoji: { fontSize: 28, marginBottom: spacing.sm },
  actionLabel: { color: colors.white, fontSize: fontSize.md, fontWeight: fontWeight.bold },
  section: { fontSize: fontSize.lg, fontWeight: fontWeight.bold, color: colors.navy, marginBottom: spacing.md },
  emptyTitle: { fontSize: fontSize.lg, fontWeight: fontWeight.bold, color: colors.navy, marginBottom: spacing.xs },
  emptyDesc: { fontSize: fontSize.sm, color: colors.textMuted, textAlign: 'center' },
});
