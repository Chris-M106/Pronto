import React, { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Screen from '../../components/Screen';
import Card from '../../components/Card';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import { colors } from '../../utils/colors';
import { fontSize, fontWeight, radius, spacing } from '../../utils/spacing';
import { getBooking, updateBookingStatus, acceptJob } from '../../services/bookings';
import { useBookingRealtime } from '../../hooks/useRealtime';
import { useAuthStore } from '../../store/authStore';
import type { ProviderStackParamList } from '../../types';
import type { Booking, BookingStatus } from '@pronto/types';

type Nav = NativeStackNavigationProp<ProviderStackParamList, 'JobDetail'>;
type Rt = RouteProp<ProviderStackParamList, 'JobDetail'>;

export default function JobDetailScreen() {
  const navigation = useNavigation<Nav>();
  const { bookingId } = useRoute<Rt>().params;
  const { user } = useAuthStore();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);

  const reload = useCallback(async () => {
    try {
      const b = await getBooking(bookingId);
      setBooking(b);
    } finally {
      setLoading(false);
    }
  }, [bookingId]);

  useEffect(() => {
    reload();
  }, [reload]);

  useBookingRealtime(bookingId, useCallback((b) => setBooking(b), []));

  async function handleAccept() {
    if (!user) return;
    setWorking(true);
    try {
      const b = await acceptJob(bookingId, user.id);
      setBooking(b);
    } catch (e) {
      Alert.alert('Failed', (e as Error).message);
    } finally {
      setWorking(false);
    }
  }

  async function setStatus(status: BookingStatus) {
    setWorking(true);
    try {
      const b = await updateBookingStatus(bookingId, status);
      setBooking(b);
    } catch (e) {
      Alert.alert('Failed', (e as Error).message);
    } finally {
      setWorking(false);
    }
  }

  if (loading) return <LoadingSpinner fullScreen message="Loading job..." />;
  if (!booking)
    return (
      <Screen padded>
        <Text>Job not found.</Text>
      </Screen>
    );

  return (
    <Screen padded={false}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <Text style={styles.label}>Job</Text>
        <Text style={styles.title}>{booking.title}</Text>

        <Card style={{ marginTop: spacing.lg }}>
          <Text style={styles.section}>Details</Text>
          {booking.description ? <Text style={styles.body}>{booking.description}</Text> : null}
          {booking.address ? <Text style={styles.meta}>📍 {booking.address}</Text> : null}
          {booking.scheduled_at ? <Text style={styles.meta}>🕒 {booking.scheduled_at}</Text> : null}
        </Card>

        <Card style={{ marginTop: spacing.md, backgroundColor: colors.blueBg, borderColor: colors.blueLight }}>
          <Text style={styles.metaLabel}>Estimate</Text>
          <Text style={styles.price}>
            €{(((booking.estimated_cents) ?? 0) / 100).toFixed(2)}
          </Text>
        </Card>

        <View style={{ height: spacing.lg }} />

        {booking.status === 'pending' ? (
          <>
            <Button label="Accept this job" onPress={handleAccept} loading={working} variant="teal" fullWidth />
            <View style={{ height: spacing.md }} />
            <Button label="Skip" variant="outline" onPress={() => navigation.goBack()} fullWidth />
          </>
        ) : booking.status === 'accepted' ? (
          <Button label="Start work" variant="primary" loading={working} fullWidth onPress={() => setStatus('in_progress')} />
        ) : booking.status === 'in_progress' ? (
          <Button label="Mark complete" variant="teal" loading={working} fullWidth onPress={() => setStatus('completed')} />
        ) : (
          <Card>
            <Text style={styles.body}>Status: {booking.status.replace('_', ' ')}</Text>
          </Card>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: fontSize.xs, fontWeight: fontWeight.bold, color: colors.blue, letterSpacing: 1, textTransform: 'uppercase' },
  title: { fontSize: fontSize.xxl, fontWeight: fontWeight.black, color: colors.navy, letterSpacing: -0.5, marginTop: 4 },
  section: { fontSize: fontSize.md, fontWeight: fontWeight.bold, color: colors.navy, marginBottom: spacing.sm },
  body: { fontSize: fontSize.sm, color: colors.textDark, lineHeight: 22 },
  meta: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: spacing.sm },
  metaLabel: { fontSize: fontSize.xs, color: colors.textMuted, fontWeight: fontWeight.bold, textTransform: 'uppercase', letterSpacing: 0.5 },
  price: { fontSize: 32, fontWeight: fontWeight.black, color: colors.navy, marginTop: 4 },
});
