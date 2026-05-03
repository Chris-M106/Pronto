import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Screen from '../../components/Screen';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { colors } from '../../utils/colors';
import { fontSize, fontWeight, spacing } from '../../utils/spacing';
import { useAuth } from '../../hooks/useAuth';
import type { AuthStackParamList } from '../../types';

type Nav = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<Nav>();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setError(null);
    if (!email || !password) {
      setError('Email and password required.');
      return;
    }
    setLoading(true);
    try {
      await signIn({ email, password });
    } catch (e) {
      const msg = (e as Error).message ?? 'Sign-in failed';
      setError(msg);
      Alert.alert('Sign-in failed', msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen padded>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in to your Pronto account.</Text>

        <View style={{ marginTop: spacing.xl }}>
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

        <Button label="Sign in" onPress={handleSubmit} loading={loading} fullWidth />
        <View style={{ height: spacing.md }} />
        <Button
          label="Create an account"
          onPress={() => navigation.navigate('SignUp')}
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
});
