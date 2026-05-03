import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Screen from '../../components/Screen';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { colors } from '../../utils/colors';
import { fontSize, fontWeight, radius, spacing } from '../../utils/spacing';
import { useAuth } from '../../hooks/useAuth';
import type { AuthStackParamList } from '../../types';
import type { UserRole } from '@pronto/types';

type Nav = NativeStackNavigationProp<AuthStackParamList, 'SignUp'>;

export default function SignUpScreen() {
  const navigation = useNavigation<Nav>();
  const { signUp } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setError(null);
    if (!fullName || !email || !password) {
      setError('All fields required.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be 6+ characters.');
      return;
    }
    setLoading(true);
    try {
      await signUp({ email, password, fullName, role });
      Alert.alert('Account created', 'Check your email to confirm your address.');
    } catch (e) {
      const msg = (e as Error).message ?? 'Sign-up failed';
      setError(msg);
      Alert.alert('Sign-up failed', msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen padded scroll>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>Pick a role — you can change later in settings.</Text>

        <View style={styles.roleRow}>
          {(['customer', 'provider'] as UserRole[]).map((r) => (
            <Pressable
              key={r}
              onPress={() => setRole(r)}
              style={[styles.roleCard, role === r && styles.roleCardActive]}
            >
              <Text style={[styles.roleLabel, role === r && { color: colors.white }]}>
                {r === 'customer' ? "I'm hiring" : "I'm a pro"}
              </Text>
              <Text style={[styles.roleDesc, role === r && { color: 'rgba(255,255,255,0.8)' }]}>
                {r === 'customer' ? 'Book trusted local pros' : 'Earn by accepting nearby jobs'}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={{ marginTop: spacing.lg }}>
          <Input label="Full name" value={fullName} onChangeText={setFullName} placeholder="Jane Doe" />
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            placeholder="you@example.com"
          />
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="••••••••"
            error={error}
          />
        </View>

        <Button label="Create account" onPress={handleSubmit} loading={loading} fullWidth />
        <View style={{ height: spacing.md }} />
        <Button
          label="Already have an account? Sign in"
          onPress={() => navigation.navigate('Login')}
          variant="ghost"
          fullWidth
        />
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: fontSize.display, fontWeight: fontWeight.black, color: colors.navy, letterSpacing: -1 },
  subtitle: { fontSize: fontSize.md, color: colors.textMuted, marginTop: spacing.xs },
  roleRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl },
  roleCard: {
    flex: 1,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  roleCardActive: { backgroundColor: colors.navy, borderColor: colors.navy },
  roleLabel: { fontSize: fontSize.md, fontWeight: fontWeight.bold, color: colors.navy, marginBottom: 4 },
  roleDesc: { fontSize: fontSize.xs, color: colors.textMuted, lineHeight: 18 },
});
