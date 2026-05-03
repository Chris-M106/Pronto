import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute, RouteProp, CommonActions } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Screen from '../../components/Screen';
import Button from '../../components/Button';
import { colors } from '../../utils/colors';
import { fontSize, fontWeight, radius, spacing } from '../../utils/spacing';
import type { CustomerStackParamList } from '../../types';

type Nav = NativeStackNavigationProp<CustomerStackParamList, 'Confirmation'>;
type Rt = RouteProp<CustomerStackParamList, 'Confirmation'>;

export default function ConfirmationScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const { bookingId } = route.params;

  return (
    <Screen padded bg={colors.navy}>
      <View style={styles.container}>
        <View style={styles.checkCircle}>
          <Text style={styles.check}>✓</Text>
        </View>
        <Text style={styles.title}>Booking confirmed</Text>
        <Text style={styles.subtitle}>
          We&apos;re finding the right pro for you. You&apos;ll get a notification as soon as someone accepts.
        </Text>

        <View style={styles.idBox}>
          <Text style={styles.idLabel}>Booking ID</Text>
          <Text style={styles.idValue} numberOfLines={1}>
            {bookingId}
          </Text>
        </View>

        <View style={{ flex: 1 }} />

        <Button
          label="Track this job"
          variant="teal"
          fullWidth
          onPress={() => navigation.replace('Tracking', { bookingId })}
        />
        <View style={{ height: spacing.md }} />
        <Button
          label="Back to home"
          variant="outline"
          fullWidth
          style={{ borderColor: 'rgba(255,255,255,0.3)' }}
          onPress={() =>
            navigation.dispatch(
              CommonActions.reset({ index: 0, routes: [{ name: 'CustomerTabs' }] })
            )
          }
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: spacing.xxxl },
  checkCircle: {
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.teal,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  check: { color: colors.navy, fontSize: 44, fontWeight: fontWeight.black },
  title: { fontSize: fontSize.display, fontWeight: fontWeight.black, color: colors.white, textAlign: 'center', letterSpacing: -1 },
  subtitle: { fontSize: fontSize.md, color: 'rgba(255,255,255,0.7)', textAlign: 'center', lineHeight: 24, marginTop: spacing.md },
  idBox: {
    marginTop: spacing.xl,
    padding: spacing.lg,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderRadius: radius.lg,
  },
  idLabel: { color: 'rgba(255,255,255,0.4)', fontSize: fontSize.xs, fontWeight: fontWeight.bold, letterSpacing: 0.5, textTransform: 'uppercase' },
  idValue: { color: colors.white, fontSize: fontSize.md, marginTop: 4, fontFamily: 'monospace' },
});
