import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from './Card';
import Avatar from './Avatar';
import { colors } from '../utils/colors';
import { fontSize, fontWeight, spacing } from '../utils/spacing';
import type { ProviderListItem } from '../services/providers';

interface Props {
  provider: ProviderListItem;
  onPress?: () => void;
}

export default function ProviderCard({ provider, onPress }: Props) {
  const price = provider.hourly_rate_cents != null ? `€${(provider.hourly_rate_cents / 100).toFixed(0)}/h` : '—';
  return (
    <Card onPress={onPress} style={{ marginBottom: spacing.md }}>
      <View style={styles.row}>
        <Avatar name={provider.full_name} uri={provider.avatar_url} size={56} />
        <View style={styles.middle}>
          <Text style={styles.name} numberOfLines={1}>
            {provider.full_name}
          </Text>
          <Text style={styles.meta} numberOfLines={1}>
            {provider.city ?? 'Local pro'} · {provider.jobs_completed} jobs
          </Text>
          <Text style={styles.rating}>★ {provider.rating.toFixed(1)}</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.price}>{price}</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  middle: { flex: 1, marginLeft: spacing.md },
  name: { fontSize: fontSize.md, fontWeight: fontWeight.bold, color: colors.navy },
  meta: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
  rating: { fontSize: fontSize.sm, color: colors.amber, fontWeight: fontWeight.bold, marginTop: 4 },
  right: { alignItems: 'flex-end' },
  price: { fontSize: fontSize.md, fontWeight: fontWeight.bold, color: colors.teal },
});
