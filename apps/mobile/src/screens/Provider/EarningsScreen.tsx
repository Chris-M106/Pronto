import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { colors } from '../../utils/colors';
import { fontSize, fontWeight, radius, spacing } from '../../utils/spacing';
import { useAuthStore } from '../../store/authStore';
import { listPayoutsForProvider } from '../../services/payments';

const BARS = [
  { d: 'Mon', v: 40, e: 12000 },
  { d: 'Tue', v: 70, e: 21000 },
  { d: 'Wed', v: 55, e: 16500 },
  { d: 'Thu', v: 90, e: 27000 },
  { d: 'Fri', v: 100, e: 30000 },
];

export default function EarningsScreen() {
  const { user } = useAuthStore();
  const [payouts, setPayouts] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    listPayoutsForProvider(user.id)
      .then(setPayouts)
      .catch(() => setPayouts([]));
  }, [user?.id]);

  const total = BARS.reduce((acc, b) => acc + b.e, 0);

  return (
    <Screen padded={false}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <Text style={styles.label}>For providers</Text>
        <Text style={styles.title}>Your earnings</Text>

        <Card style={{ marginTop: spacing.lg }}>
          <View style={styles.totalRow}>
            <View>
              <Text style={styles.metaLabel}>This month</Text>
              <Text style={styles.totalValue}>€{(total / 100).toFixed(2)}</Text>
            </View>
            <View style={styles.deltaPill}>
              <Text style={styles.delta}>↑ +24%</Text>
            </View>
          </View>

          <View style={styles.chart}>
            {BARS.map((b) => (
              <View key={b.d} style={styles.barCol}>
                <Text style={styles.barAmount}>€{(b.e / 100).toFixed(0)}</Text>
                <View style={[styles.bar, { height: b.v }]} />
                <Text style={styles.barLabel}>{b.d}</Text>
              </View>
            ))}
          </View>
        </Card>

        <Card style={{ marginTop: spacing.md }}>
          <Text style={styles.section}>Top services</Text>
          <Row name="Plumbing" value="€95" tint={colors.blue} bg={colors.blueBg} />
          <Row name="Assembly" value="€65" tint={colors.teal} bg={colors.tealBg} />
          <Row name="Garden" value="€110" tint={colors.amber} bg={colors.amberBg} />
        </Card>

        <Card style={{ marginTop: spacing.md }}>
          <Text style={styles.section}>Payouts</Text>
          {payouts.length === 0 ? (
            <Text style={{ color: colors.textMuted, fontSize: fontSize.sm }}>
              No payouts yet. Once you complete jobs, payouts arrive in 48h.
            </Text>
          ) : (
            payouts.map((p, i) => (
              <View key={i} style={styles.payoutRow}>
                <Text style={{ color: colors.textDark }}>€{(p.amount_cents / 100).toFixed(2)}</Text>
                <Text style={{ color: colors.textMuted, fontSize: fontSize.xs }}>
                  {new Date(p.created_at).toLocaleDateString()}
                </Text>
              </View>
            ))
          )}
          <View style={{ height: spacing.md }} />
          <Button label="Request payout" variant="teal" />
        </Card>
      </ScrollView>
    </Screen>
  );
}

function Row({ name, value, tint, bg }: { name: string; value: string; tint: string; bg: string }) {
  return (
    <View style={[styles.serviceRow, { backgroundColor: bg }]}>
      <Text style={{ color: colors.navy, fontSize: fontSize.sm, fontWeight: fontWeight.bold }}>{name}</Text>
      <Text style={{ color: tint, fontSize: fontSize.lg, fontWeight: fontWeight.black }}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: fontSize.xs, fontWeight: fontWeight.bold, color: colors.blue, letterSpacing: 1, textTransform: 'uppercase' },
  title: { fontSize: fontSize.display, fontWeight: fontWeight.black, color: colors.navy, letterSpacing: -1 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  metaLabel: { fontSize: fontSize.xs, color: colors.textMuted, fontWeight: fontWeight.bold, textTransform: 'uppercase', letterSpacing: 0.5 },
  totalValue: { fontSize: 36, fontWeight: fontWeight.black, color: colors.navy, letterSpacing: -1, marginTop: 4 },
  deltaPill: { backgroundColor: colors.successBg, borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: 4 },
  delta: { color: colors.success, fontSize: fontSize.xs, fontWeight: fontWeight.bold },
  chart: { flexDirection: 'row', alignItems: 'flex-end', gap: spacing.sm, height: 130, marginTop: spacing.lg },
  barCol: { flex: 1, alignItems: 'center', gap: 4 },
  barAmount: { fontSize: 9, color: colors.textMuted, fontWeight: fontWeight.semibold },
  bar: { width: '70%', backgroundColor: colors.blue, borderTopLeftRadius: 4, borderTopRightRadius: 4 },
  barLabel: { fontSize: 10, fontWeight: fontWeight.bold, color: colors.textMuted },
  section: { fontSize: fontSize.md, fontWeight: fontWeight.bold, color: colors.navy, marginBottom: spacing.md },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
  },
  payoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomColor: colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
