import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Screen from '../../components/Screen';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Card from '../../components/Card';
import LoadingSpinner from '../../components/LoadingSpinner';
import { colors } from '../../utils/colors';
import { fontSize, fontWeight, radius, spacing } from '../../utils/spacing';
import { SERVICE_CATEGORIES } from '../../utils/constants';
import { useBookingStore } from '../../store/bookingStore';
import { useAuthStore } from '../../store/authStore';
import { listServices } from '../../services/providers';
import { createBooking } from '../../services/bookings';
import { createPayment, estimatePriceCents } from '../../services/payments';
import type { CustomerStackParamList } from '../../types';
import type { Service } from '@pronto/types';

type Nav = NativeStackNavigationProp<CustomerStackParamList, 'BookingFlow'>;
type Rt = RouteProp<CustomerStackParamList, 'BookingFlow'>;

const STEPS = ['Service', 'Details', 'When', 'Budget', 'Pay'] as const;
type StepIdx = 0 | 1 | 2 | 3 | 4;

const SIZES: Array<{ key: 'small' | 'medium' | 'large' | 'fullDay'; label: string }> = [
  { key: 'small', label: 'Small (1h)' },
  { key: 'medium', label: 'Medium (2-4h)' },
  { key: 'large', label: 'Large (half day)' },
  { key: 'fullDay', label: 'Full day' },
];

export default function BookingFlow() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const { user } = useAuthStore();
  const { draft, setDraft, resetDraft } = useBookingStore();

  const [step, setStep] = useState<StepIdx>(0);
  const [services, setServices] = useState<Service[]>([]);
  const [size, setSize] = useState<'small' | 'medium' | 'large' | 'fullDay'>('small');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    listServices()
      .then((s) => alive && setServices(s))
      .catch(() => alive && setServices([]))
      .finally(() => alive && setLoading(false));
    if (route.params?.serviceCategory) setDraft({ serviceCategory: route.params.serviceCategory });
    return () => {
      alive = false;
    };
  }, []);

  const filteredServices = useMemo(() => {
    if (!draft.serviceCategory) return services;
    return services.filter((s) => s.category === draft.serviceCategory);
  }, [services, draft.serviceCategory]);

  const estimate = useMemo(
    () => (draft.serviceCategory ? estimatePriceCents(draft.serviceCategory, size) : { min: 4500, max: 9000 }),
    [draft.serviceCategory, size]
  );

  function next() {
    setStep((s) => Math.min(4, s + 1) as StepIdx);
  }
  function back() {
    if (step === 0) navigation.goBack();
    else setStep((s) => Math.max(0, s - 1) as StepIdx);
  }

  async function submit() {
    if (!user) {
      Alert.alert('Not signed in', 'Please sign in first.');
      return;
    }
    if (!draft.serviceId || !draft.title) {
      Alert.alert('Missing info', 'Pick a service and add a title.');
      return;
    }
    setSubmitting(true);
    try {
      const booking = await createBooking({
        customer_id: user.id,
        service_id: draft.serviceId,
        title: draft.title,
        description: draft.description || null,
        scheduled_at: draft.scheduledAt,
        estimated_cents: Math.round((estimate.min + estimate.max) / 2),
        address: draft.address || null,
        photos: draft.photos,
      });
      await createPayment({
        booking_id: booking.id,
        customer_id: user.id,
        amount_cents: booking.estimated_cents ?? 0,
      });
      resetDraft();
      navigation.replace('Confirmation', { bookingId: booking.id });
    } catch (e) {
      Alert.alert('Booking failed', (e as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Screen padded={false}>
      <View style={styles.header}>
        <Pressable onPress={back}>
          <Text style={styles.back}>← Back</Text>
        </Pressable>
        <View style={styles.progressRow}>
          {STEPS.map((_, i) => (
            <View key={i} style={[styles.dot, i <= step && styles.dotActive]} />
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <Text style={styles.stepLabel}>Step {step + 1} of 5</Text>
        <Text style={styles.title}>{stepTitle(step)}</Text>

        {step === 0 && (
          <View>
            <Text style={styles.section}>Pick a category</Text>
            <View style={styles.grid}>
              {SERVICE_CATEGORIES.slice(0, 8).map((c) => (
                <Pressable
                  key={c.key}
                  onPress={() => setDraft({ serviceCategory: c.key })}
                  style={[
                    styles.catCard,
                    draft.serviceCategory === c.key && { borderColor: colors.blue, backgroundColor: colors.blueBg },
                  ]}
                >
                  <Text style={{ fontSize: 28 }}>{c.icon}</Text>
                  <Text style={styles.catLabel}>{c.label}</Text>
                </Pressable>
              ))}
            </View>
            {draft.serviceCategory ? (
              <View style={{ marginTop: spacing.lg }}>
                <Text style={styles.section}>Specific service</Text>
                {loading ? (
                  <LoadingSpinner />
                ) : filteredServices.length === 0 ? (
                  <Card>
                    <Text style={{ color: colors.textMuted }}>
                      No specific services seeded for this category yet — that&apos;s OK, the title field will describe it.
                    </Text>
                    <View style={{ height: spacing.sm }} />
                    <Button
                      label="Use generic service"
                      variant="outline"
                      onPress={() => {
                        setDraft({ serviceId: 'generic-' + draft.serviceCategory });
                        next();
                      }}
                    />
                  </Card>
                ) : (
                  filteredServices.map((s) => (
                    <Card
                      key={s.id}
                      onPress={() => {
                        setDraft({ serviceId: s.id });
                        next();
                      }}
                      style={{
                        marginBottom: spacing.sm,
                        borderColor: draft.serviceId === s.id ? colors.blue : colors.border,
                      }}
                    >
                      <Text style={styles.serviceName}>{s.name}</Text>
                      {s.description ? <Text style={styles.serviceDesc}>{s.description}</Text> : null}
                    </Card>
                  ))
                )}
              </View>
            ) : null}
          </View>
        )}

        {step === 1 && (
          <View>
            <Input
              label="Job title"
              value={draft.title}
              onChangeText={(v) => setDraft({ title: v })}
              placeholder="e.g. Fix leaking kitchen tap"
            />
            <Input
              label="Description"
              value={draft.description}
              onChangeText={(v) => setDraft({ description: v })}
              placeholder="Add any details that help the pro"
              multiline
              numberOfLines={4}
              style={{ minHeight: 100, textAlignVertical: 'top' }}
            />
            <Input
              label="Address"
              value={draft.address}
              onChangeText={(v) => setDraft({ address: v })}
              placeholder="Street, city"
            />
          </View>
        )}

        {step === 2 && (
          <View>
            <Input
              label="When?"
              value={draft.scheduledAt ?? ''}
              onChangeText={(v) => setDraft({ scheduledAt: v })}
              placeholder="YYYY-MM-DD HH:MM"
            />
            <Card>
              <Text style={{ color: colors.textMuted, fontSize: fontSize.sm }}>
                Tip: leave blank for &quot;flexible&quot; and let the pro propose a time.
              </Text>
            </Card>
          </View>
        )}

        {step === 3 && (
          <View>
            <Text style={styles.section}>Job size</Text>
            {SIZES.map((s) => (
              <Card
                key={s.key}
                onPress={() => setSize(s.key)}
                style={{
                  marginBottom: spacing.sm,
                  borderColor: size === s.key ? colors.blue : colors.border,
                }}
              >
                <Text style={styles.serviceName}>{s.label}</Text>
              </Card>
            ))}
            <Card style={{ backgroundColor: colors.blueBg, borderColor: colors.blueLight }}>
              <Text style={styles.estLabel}>Estimated price</Text>
              <Text style={styles.estPrice}>
                €{(estimate.min / 100).toFixed(0)} – €{(estimate.max / 100).toFixed(0)}
              </Text>
              <Text style={styles.estNote}>Final price agreed with the pro before work begins.</Text>
            </Card>
          </View>
        )}

        {step === 4 && (
          <View>
            <Card>
              <Text style={styles.serviceName}>Booking summary</Text>
              <Row label="Service" value={draft.serviceCategory ?? '—'} />
              <Row label="Title" value={draft.title || '—'} />
              <Row label="When" value={draft.scheduledAt ?? 'Flexible'} />
              <Row label="Address" value={draft.address || 'TBD'} />
              <Row
                label="Estimated"
                value={`€${(estimate.min / 100).toFixed(0)}–€${(estimate.max / 100).toFixed(0)}`}
              />
            </Card>
            <Card style={{ marginTop: spacing.md, backgroundColor: colors.tealBg, borderColor: colors.teal }}>
              <Text style={[styles.serviceName, { color: colors.navy }]}>🔒 Escrow protected</Text>
              <Text style={{ color: colors.navy, fontSize: fontSize.sm, marginTop: 4 }}>
                Funds are held until you confirm the job is done. Stripe TEST mode for development.
              </Text>
            </Card>
          </View>
        )}

        <View style={{ height: spacing.xl }} />
        {step < 4 ? (
          <Button label="Continue" onPress={next} fullWidth />
        ) : (
          <Button label="Confirm & pay" onPress={submit} loading={submitting} fullWidth />
        )}
      </ScrollView>
    </Screen>
  );
}

function stepTitle(step: StepIdx): string {
  return ['What service?', 'Job details', 'When do you need it?', 'Pick the budget', 'Confirm & pay'][step]!;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm }}>
      <Text style={{ color: colors.textMuted, fontSize: fontSize.sm }}>{label}</Text>
      <Text style={{ color: colors.navy, fontSize: fontSize.sm, fontWeight: fontWeight.semibold, flex: 1, textAlign: 'right', marginLeft: spacing.md }} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  back: { color: colors.blue, fontSize: fontSize.md, fontWeight: fontWeight.semibold },
  progressRow: { flexDirection: 'row', gap: 6 },
  dot: { width: 24, height: 4, borderRadius: 2, backgroundColor: colors.border },
  dotActive: { backgroundColor: colors.blue },
  stepLabel: { fontSize: fontSize.xs, fontWeight: fontWeight.bold, color: colors.blue, letterSpacing: 1, textTransform: 'uppercase' },
  title: { fontSize: fontSize.xxl, fontWeight: fontWeight.black, color: colors.navy, letterSpacing: -0.5, marginTop: spacing.xs, marginBottom: spacing.lg },
  section: { fontSize: fontSize.md, fontWeight: fontWeight.bold, color: colors.navy, marginBottom: spacing.sm, marginTop: spacing.sm },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  catCard: {
    width: '48%',
    aspectRatio: 1.4,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  catLabel: { marginTop: spacing.sm, fontSize: fontSize.sm, fontWeight: fontWeight.bold, color: colors.navy },
  serviceName: { fontSize: fontSize.md, fontWeight: fontWeight.bold, color: colors.navy },
  serviceDesc: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: spacing.xs },
  estLabel: { fontSize: fontSize.xs, color: colors.textMuted, fontWeight: fontWeight.bold, textTransform: 'uppercase', letterSpacing: 0.5 },
  estPrice: { fontSize: 36, fontWeight: fontWeight.black, color: colors.navy, marginTop: 4, letterSpacing: -1 },
  estNote: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 4 },
});
