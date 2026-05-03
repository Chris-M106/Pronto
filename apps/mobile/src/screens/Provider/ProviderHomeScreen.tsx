import React from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Screen from '../../components/Screen';
import Card from '../../components/Card';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import { colors } from '../../utils/colors';
import { fontSize, fontWeight, radius, spacing } from '../../utils/spacing';
import { useBookings } from '../../hooks/useBookings';
import { useUser } from '../../hooks/useUser';
import type { ProviderStackParamList } from '../../types';
import type { Booking } from '@pronto/types';

type Nav = NativeStackNavigationProp<ProviderStackParamList, 'ProviderTabs'>;

export default function ProviderHomeScreen() {
  const navigation = useNavigation<Nav>();
  const { profile } = useUser();
  const { bookings, loading, refresh, acceptJob } = useBookings();

  const available = bookings.filter((b) => b.status === 'pending');
  const inProgress = bookings.filter((b) => ['accepted', 'in_progress'].includes(b.status));

  return (
    <Screen padded={false}>
      <FlatList
        data={available}
        keyExtractor={(b) => b.id}
        contentContainerStyle={{ padding: spacing.lg }}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} tintColor={colors.blue} />}
        ListHeaderComponent={
          <View>
            <Text style={styles.greeting}>Hi {profile?.full_name?.split(' ')[0] ?? 'pro'} 👋</Text>
            <Text style={styles.title}>Today&apos;s jobs</Text>

            {inProgress.length > 0 && (
              <View style={{ marginTop: spacing.lg }}>
                <Text style={styles.section}>In progress ({inProgress.length})</Text>
                {inProgress.map((b) => (
                  <JobRow
                    key={b.id}
                    booking={b}
                    onPress={() => navigation.navigate('JobDetail', { bookingId: b.id })}
                  />
                ))}
              </View>
            )}

            <View style={{ marginTop: spacing.lg }}>
              <Text style={styles.section}>Available nearby ({available.length})</Text>
            </View>
            {!loading && available.length === 0 ? (
              <Card style={{ alignItems: 'center', paddingVertical: spacing.xxl }}>
                <Text style={styles.emptyTitle}>No jobs right now</Text>
                <Text style={styles.emptyDesc}>New jobs appear here in real time as they come in.</Text>
              </Card>
            ) : null}
          </View>
        }
        renderItem={({ item }) => (
          <Card onPress={() => navigation.navigate('JobDetail', { bookingId: item.id })}>
            <View style={styles.row}>
              <Text style={styles.jobTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.jobPrice}>
                €{(((item.estimated_cents) ?? 0) / 100).toFixed(0)}
              </Text>
            </View>
            {item.description ? (
              <Text style={styles.jobDesc} numberOfLines={2}>
                {item.description}
              </Text>
            ) : null}
            {item.address ? <Text style={styles.jobMeta}>📍 {item.address}</Text> : null}
            <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md }}>
              <Button label="Accept" onPress={() => acceptJob(item.id)} variant="teal" style={{ flex: 1 }} />
              <Button
                label="Details"
                variant="outline"
                onPress={() => navigation.navigate('JobDetail', { bookingId: item.id })}
                style={{ flex: 1 }}
              />
            </View>
          </Card>
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        ListFooterComponent={loading ? <LoadingSpinner /> : null}
      />
    </Screen>
  );
}

function JobRow({ booking, onPress }: { booking: Booking; onPress: () => void }) {
  return (
    <Card onPress={onPress} style={{ marginBottom: spacing.sm }}>
      <View style={styles.row}>
        <Text style={styles.jobTitle} numberOfLines={1}>
          {booking.title}
        </Text>
        <View style={[styles.badge, { backgroundColor: colors.tealBg }]}>
          <Text style={[styles.badgeText, { color: colors.teal }]}>{booking.status.replace('_', ' ')}</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  greeting: { fontSize: fontSize.md, color: colors.textMuted, marginBottom: spacing.xs },
  title: { fontSize: fontSize.display, fontWeight: fontWeight.black, color: colors.navy, letterSpacing: -1 },
  section: { fontSize: fontSize.lg, fontWeight: fontWeight.bold, color: colors.navy, marginBottom: spacing.md },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  jobTitle: { flex: 1, fontSize: fontSize.md, fontWeight: fontWeight.bold, color: colors.navy, marginRight: spacing.sm },
  jobPrice: { fontSize: fontSize.lg, fontWeight: fontWeight.bold, color: colors.teal },
  jobDesc: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: spacing.xs, lineHeight: 20 },
  jobMeta: { fontSize: fontSize.xs, color: colors.textLight, marginTop: spacing.sm },
  badge: { paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: radius.sm },
  badgeText: { fontSize: fontSize.xs, fontWeight: fontWeight.bold, textTransform: 'uppercase' },
  emptyTitle: { fontSize: fontSize.lg, fontWeight: fontWeight.bold, color: colors.navy, marginBottom: spacing.xs },
  emptyDesc: { fontSize: fontSize.sm, color: colors.textMuted, textAlign: 'center' },
});
