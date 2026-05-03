import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';
import { colors } from '../../utils/colors';
import { fontSize, fontWeight, radius, spacing } from '../../utils/spacing';
import { useUser } from '../../hooks/useUser';
import { useAuthStore } from '../../store/authStore';
import { updateProfile } from '../../services/providers';
import { useUserStore } from '../../store/userStore';

export default function ProviderProfileScreen() {
  const { user } = useAuthStore();
  const { profile } = useUser();
  const setProfile = useUserStore((s) => s.setProfile);

  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [city, setCity] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFullName(profile?.full_name ?? '');
    setBio(profile?.bio ?? '');
    setCity(profile?.city ?? '');
  }, [profile?.user_id]);

  async function save() {
    if (!user) return;
    setSaving(true);
    try {
      const updated = await updateProfile(user.id, { full_name: fullName, bio, city });
      setProfile(updated);
      Alert.alert('Saved', 'Profile updated.');
    } catch (e) {
      Alert.alert('Save failed', (e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Screen padded={false}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <View style={styles.header}>
          <Avatar name={fullName} size={72} bg={colors.tealBg} color={colors.teal} />
          <View style={{ marginLeft: spacing.lg, flex: 1 }}>
            <Text style={styles.name}>{fullName || 'Your name'}</Text>
            <View style={styles.kycRow}>
              <View style={styles.kycBadge}>
                <Text style={styles.kycText}>ID verified</Text>
              </View>
            </View>
          </View>
        </View>

        <Card style={{ marginTop: spacing.xl }}>
          <Text style={styles.section}>Public profile</Text>
          <Input label="Full name" value={fullName} onChangeText={setFullName} />
          <Input
            label="Bio"
            value={bio}
            onChangeText={setBio}
            placeholder="Tell customers about your skills and experience"
            multiline
            numberOfLines={4}
            style={{ minHeight: 100, textAlignVertical: 'top' }}
          />
          <Input label="City" value={city} onChangeText={setCity} placeholder="Lisbon" />
          <Button label="Save changes" onPress={save} loading={saving} fullWidth />
        </Card>

        <Card style={{ marginTop: spacing.md }}>
          <Text style={styles.section}>Services &amp; pricing</Text>
          <Text style={styles.body}>
            Configure which services you offer and your hourly rate. Coming soon — for now you can add them via the
            web dashboard.
          </Text>
        </Card>

        <Card style={{ marginTop: spacing.md }}>
          <Text style={styles.section}>Availability</Text>
          <Text style={styles.body}>Set the days and hours you accept new jobs. Coming soon.</Text>
        </Card>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center' },
  name: { fontSize: fontSize.xxl, fontWeight: fontWeight.black, color: colors.navy },
  kycRow: { flexDirection: 'row', marginTop: spacing.xs },
  kycBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
    backgroundColor: colors.tealBg,
  },
  kycText: { fontSize: fontSize.xs, color: colors.teal, fontWeight: fontWeight.bold, textTransform: 'uppercase' },
  section: { fontSize: fontSize.md, fontWeight: fontWeight.bold, color: colors.navy, marginBottom: spacing.md },
  body: { fontSize: fontSize.sm, color: colors.textMuted, lineHeight: 22 },
});
