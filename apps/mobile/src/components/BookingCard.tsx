import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from './Card';
import { colors } from '../utils/colors';
import { fontSize, fontWeight, radius, spacing } from '../utils/spacing';
import type { Booking, BookingStatus } from '@pronto/types';

interface Props {
  booking: Booking;
  onPress?: () => void;
}

const statusStyle: Record<BookingStatus, { label: string; bg: string; fg: string }> = {
  pending: { label: 'Pending', bg: colors.amberBg, fg: colors.amber },
  accepted: { label: 'Accepted', bg: colors.blueBg, fg: colors.blue },
  in_progress: { label: 'In progress', bg: colors.tealBg, fg: colors.teal },
  completed: { label: 'Completed', bg: colors.successBg, fg: colors.success },
  cancelled: { label: 'Cancelled', bg: colors.dangerBg, fg: colors.danger },
  disputed: { label: 'Disputed', bg: colors.dangerBg, fg: colors.danger },
};

function formatPrice(cents: number | null | undefined): string {
  if (cents == null) return '—';
  return `€${(cents / 100).toFixed(2)}`;
}

function formatDate(iso: string | null | undefined): string {
  if (!iso) return 'Date TBD';
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default function BookingCard({ booking, onPress }: Props) {
  const s = statusStyle[booking.status];
  return (
    <Card onPress={onPress} style={{ marginBottom: spacing.md }}>
      <View style={styles.headerRow}>
        <Text style={styles.title} numberOfLines={1}>
          {booking.title}
        </Text>
        <View style={[styles.badge, { backgroundColor: s.bg }]}>
          <Text style={[styles.badgeText, { color: s.fg }]}>{s.label}</Text>
        </View>
      </View>
      {booking.description ? (
        <Text style={styles.desc} numberOfLines={2}>
          {booking.description}
        </Text>
      ) : null}
      <View style={styles.footer}>
        <Text style={styles.meta}>{formatDate(booking.scheduled_at)}</Text>
        <Text style={styles.price}>{formatPrice(booking.final_cents ?? booking.estimated_cents)}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  title: { flex: 1, fontSize: fontSize.lg, fontWeight: fontWeight.bold, color: colors.navy, marginRight: spacing.sm },
  badge: { paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: radius.sm },
  badgeText: { fontSize: fontSize.xs, fontWeight: fontWeight.bold, textTransform: 'uppercase' },
  desc: { fontSize: fontSize.sm, color: colors.textMuted, lineHeight: 20, marginBottom: spacing.sm },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.xs },
  meta: { fontSize: fontSize.xs, color: colors.textLight },
  price: { fontSize: fontSize.md, fontWeight: fontWeight.bold, color: colors.teal },
});
