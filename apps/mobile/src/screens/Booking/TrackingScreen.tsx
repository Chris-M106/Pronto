import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Screen from '../../components/Screen';
import Card from '../../components/Card';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import { colors } from '../../utils/colors';
import { fontSize, fontWeight, radius, spacing } from '../../utils/spacing';
import { getBooking, updateBookingStatus } from '../../services/bookings';
import { uploadPhoto } from '../../services/photoUpload';
import { useBookingRealtime } from '../../hooks/useRealtime';
import { useAuthStore } from '../../store/authStore';
import type { CustomerStackParamList } from '../../types';
import type { Booking, BookingStatus } from '@pronto/types';

type Nav = NativeStackNavigationProp<CustomerStackParamList, 'Tracking'>;
type Rt = RouteProp<CustomerStackParamList, 'Tracking'>;

const STAGES: BookingStatus[] = ['pending', 'accepted', 'in_progress', 'completed'];
const STAGE_LABELS: Record<BookingStatus, string> = {
  pending: 'Looking for a pro',
  accepted: 'Pro confirmed',
  in_progress: 'Job in progress',
  completed: 'Job completed',
  cancelled: 'Cancelled',
  disputed: 'Disputed',
};

export default function TrackingScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const { bookingId } = route.params;
  const { role } = useAuthStore();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [completionPhotoUri, setCompletionPhotoUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const reload = useCallback(async () => {
    try {
      const b = await getBooking(bookingId);
      setBooking(b);
    } catch (e) {
      console.warn('[Tracking] reload err:', (e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [bookingId]);

  useEffect(() => {
    reload();
  }, [reload]);

  useBookingRealtime(bookingId, useCallback((b) => setBooking(b), []));

  async function pickCompletionPhoto() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Allow photo access in Settings.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
    });
    if (!result.canceled && result.assets[0]) {
      setCompletionPhotoUri(result.assets[0].uri);
    }
  }

  async function markComplete() {
    if (!completionPhotoUri) {
      Alert.alert('Photo required', 'Upload a completion photo before marking the job done.');
      return;
    }
    setUploading(true);
    try {
      const url = await uploadPhoto(completionPhotoUri, 'booking-photos');
      const b = await updateBookingStatus(bookingId, 'completed', { completion_photo_url: url } as Partial<Booking>);
      setBooking(b);
    } catch (e) {
      Alert.alert('Failed', (e as Error).message);
    } finally {
      setUploading(false);
    }
  }

  async function setStatus(status: BookingStatus) {
    try {
      const b = await updateBookingStatus(bookingId, status);
      setBooking(b);
    } catch (e) {
      Alert.alert('Update failed', (e as Error).message);
    }
  }

  if (loading) return <LoadingSpinner fullScreen message="Loading job..." />;
  if (!booking)
    return (
      <Screen padded>
        <Text style={styles.title}>Booking not found</Text>
        <Button label="Back" variant="outline" onPress={() => navigation.goBack()} />
      </Screen>
    );

  const currentIdx = STAGES.indexOf(booking.status);
  const isTerminal = booking.status === 'cancelled' || booking.status === 'disputed';

  return (
    <Screen padded={false}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <Text style={styles.label}>Booking</Text>
        <Text style={styles.title}>{booking.title}</Text>

        {isTerminal ? (
          <Card
            style={{
              marginTop: spacing.lg,
              backgroundColor: booking.status === 'disputed' ? colors.blueBg : colors.border,
            }}
          >
            <Text style={styles.section}>{STAGE_LABELS[booking.status]}</Text>
            <Text style={styles.body}>
              {booking.status === 'cancelled'
                ? 'This booking was cancelled.'
                : 'This booking is under dispute. Support will reach out.'}
            </Text>
          </Card>
        ) : (
          <Card style={{ marginTop: spacing.lg }}>
            <Text style={styles.section}>Status</Text>
            {STAGES.map((s, i) => (
              <View key={s} style={styles.stageRow}>
                <View style={[styles.stageDot, i <= currentIdx && styles.stageDotActive]}>
                  <Text style={[styles.stageDotText, i <= currentIdx && { color: colors.white }]}>
                    {i <= currentIdx ? '✓' : i + 1}
                  </Text>
                </View>
                <Text style={[styles.stageText, i === currentIdx && { color: colors.navy, fontWeight: fontWeight.bold }]}>
                  {STAGE_LABELS[s]}
                </Text>
              </View>
            ))}
          </Card>
        )}

        {booking.description ? (
          <Card style={{ marginTop: spacing.md }}>
            <Text style={styles.section}>Details</Text>
            <Text style={styles.body}>{booking.description}</Text>
            {booking.address ? <Text style={styles.meta}>📍 {booking.address}</Text> : null}
          </Card>
        ) : null}

        <Card style={{ marginTop: spacing.md }}>
          <Text style={styles.section}>Estimate</Text>
          <Text style={styles.price}>
            €{(((booking.final_cents ?? booking.estimated_cents) ?? 0) / 100).toFixed(2)}
          </Text>
          <Text style={styles.meta}>Held in escrow until you confirm completion.</Text>
        </Card>

        <View style={{ height: spacing.lg }} />

        {role === 'customer' && booking.status === 'completed' ? (
          <Button label="Rate the pro" variant="primary" fullWidth onPress={() => Alert.alert('Reviews', 'Open the review form (coming next).')} />
        ) : null}

        {role === 'provider' && booking.status === 'accepted' ? (
          <Button label="Mark as in progress" variant="primary" fullWidth onPress={() => setStatus('in_progress')} />
        ) : null}

        {role === 'provider' && booking.status === 'in_progress' ? (
          <View>
            <Text style={styles.section}>Completion photo (required)</Text>
            <Pressable onPress={pickCompletionPhoto} style={styles.photoBox}>
              {completionPhotoUri ? (
                <Image source={{ uri: completionPhotoUri }} style={styles.photoPreview} />
              ) : (
                <>
                  <Text style={{ fontSize: 28 }}>📷</Text>
                  <Text style={{ color: colors.textMuted, fontSize: fontSize.sm, marginTop: spacing.xs }}>
                    Tap to add photo
                  </Text>
                </>
              )}
            </Pressable>
            {completionPhotoUri ? (
              <Pressable onPress={() => setCompletionPhotoUri(null)} style={{ alignSelf: 'center', marginBottom: spacing.md }}>
                <Text style={{ color: colors.textMuted, fontSize: fontSize.sm }}>Remove photo</Text>
              </Pressable>
            ) : null}
            <Button
              label={uploading ? 'Uploading…' : 'Mark complete'}
              variant="teal"
              fullWidth
              loading={uploading}
              onPress={markComplete}
            />
          </View>
        ) : null}

        {booking.status === 'pending' || booking.status === 'accepted' ? (
          <View style={{ marginTop: spacing.md }}>
            <Button
              label="Cancel booking"
              variant="outline"
              fullWidth
              onPress={() =>
                Alert.alert('Cancel?', 'You can cancel a pending or accepted job.', [
                  { text: 'Keep', style: 'cancel' },
                  { text: 'Cancel job', style: 'destructive', onPress: () => setStatus('cancelled') },
                ])
              }
            />
          </View>
        ) : null}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: fontSize.xs, fontWeight: fontWeight.bold, color: colors.blue, letterSpacing: 1, textTransform: 'uppercase' },
  title: { fontSize: fontSize.xxl, fontWeight: fontWeight.black, color: colors.navy, letterSpacing: -0.5, marginTop: 4 },
  section: { fontSize: fontSize.md, fontWeight: fontWeight.bold, color: colors.navy, marginBottom: spacing.md },
  body: { fontSize: fontSize.sm, color: colors.textDark, lineHeight: 22 },
  meta: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: spacing.sm },
  price: { fontSize: 36, fontWeight: fontWeight.black, color: colors.navy, letterSpacing: -1 },
  stageRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm },
  stageDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  stageDotActive: { backgroundColor: colors.teal },
  stageDotText: { fontSize: fontSize.xs, color: colors.textMuted, fontWeight: fontWeight.bold },
  stageText: { fontSize: fontSize.sm, color: colors.textMuted, flex: 1 },
  photoBox: {
    height: 160,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  photoPreview: { width: '100%', height: '100%' },
});
