import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Screen from '../../components/Screen';
import Button from '../../components/Button';
import { colors } from '../../utils/colors';
import { fontSize, fontWeight, spacing } from '../../utils/spacing';
import type { AuthStackParamList } from '../../types';

type Nav = NativeStackNavigationProp<AuthStackParamList, 'Onboarding'>;

export default function OnboardingScreen() {
  const navigation = useNavigation<Nav>();
  return (
    <Screen bg={colors.navy} padded>
      <View style={styles.container}>
        <View style={styles.brand}>
          <Text style={styles.brandText}>
            Pronto<Text style={{ color: colors.teal }}>.</Text>
          </Text>
          <View style={styles.pill}>
            <View style={styles.dot} />
            <Text style={styles.pillText}>Live in Lisbon &amp; Porto</Text>
          </View>
        </View>

        <View style={styles.middle}>
          <Text style={styles.title}>
            Your neighbourhood,{'\n'}
            <Text style={{ color: colors.teal }}>handled.</Text>
          </Text>
          <Text style={styles.subtitle}>
            Vetted local tradespeople, transparent pricing, and full payment protection — every single time.
          </Text>
        </View>

        <View style={styles.actions}>
          <Button
            label="Sign in"
            onPress={() => navigation.navigate('Login')}
            variant="teal"
            fullWidth
          />
          <View style={{ height: spacing.md }} />
          <Button
            label="Create account"
            onPress={() => navigation.navigate('SignUp')}
            variant="outline"
            fullWidth
            style={{ borderColor: 'rgba(255,255,255,0.3)' }}
          />
          <Text style={styles.fineprint}>
            By continuing you agree to our Terms and Privacy Policy.
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-between' },
  brand: { alignItems: 'flex-start' },
  brandText: { fontSize: 32, fontWeight: fontWeight.black, color: colors.white, letterSpacing: -1 },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(45,91,227,0.25)',
    borderColor: 'rgba(45,91,227,0.5)',
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: spacing.md,
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.blueLight, marginRight: spacing.sm },
  pillText: { color: colors.blueLight, fontSize: fontSize.xs, fontWeight: fontWeight.bold, letterSpacing: 0.5 },
  middle: { },
  title: { fontSize: 44, fontWeight: fontWeight.black, color: colors.white, lineHeight: 48, letterSpacing: -1.5, marginBottom: spacing.lg },
  subtitle: { fontSize: fontSize.md, color: 'rgba(255,255,255,0.6)', lineHeight: 24 },
  actions: { },
  fineprint: { color: 'rgba(255,255,255,0.4)', fontSize: fontSize.xs, textAlign: 'center', marginTop: spacing.lg },
});
