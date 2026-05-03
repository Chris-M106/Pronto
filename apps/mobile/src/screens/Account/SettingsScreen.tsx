import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { colors } from '../../utils/colors';
import { fontSize, fontWeight, spacing } from '../../utils/spacing';
import { useUser } from '../../hooks/useUser';
import { useAuthStore } from '../../store/authStore';
import { useUserStore } from '../../store/userStore';
import { updateProfile } from '../../services/providers';

export default function SettingsScreen() {
  const { user } = useAuthStore();
  const { profile } = useUser();
  const setProfile = useUserStore((s) => s.setProfile);
  const [name, setName] = useState(profile?.full_name ?? '');
  const [city, setCity] = useState(profile?.city ?? '');
  const [bio, setBio] = useState(profile?.bio ?? '');
  const [push, setPush] = useState(true);
  const [emails, setEmails] = useState(true);
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!user) return;
    setSaving(true);
    try {
      const updated = await updateProfile(user.id, { full_name: name, city, bio });
      setProfile(updated);
    } catch (e) {
      console.warn('[Settings] save err:', (e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Screen padded={false}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <Text style={styles.title}>Settings</Text>

        <Card style={{ marginTop: spacing.lg }}>
          <Text style={styles.section}>Profile</Text>
          <Input label="Full name" value={name} onChangeText={setName} />
          <Input label="City" value={city} onChangeText={setCity} />
          <Input
            label="Bio"
            value={bio}
            onChangeText={setBio}
            multiline
            numberOfLines={3}
            style={{ minHeight: 80, textAlignVertical: 'top' }}
          />
          <Button label="Save profile" onPress={save} loading={saving} fullWidth />
        </Card>

        <Card style={{ marginTop: spacing.md }}>
          <Text style={styles.section}>Notifications</Text>
          <Row label="Push notifications" value={push} onChange={setPush} />
          <Row label="Email updates" value={emails} onChange={setEmails} />
        </Card>

        <Card style={{ marginTop: spacing.md }}>
          <Text style={styles.section}>Privacy</Text>
          <Text style={styles.body}>
            We never share your personal phone number with providers. All chats stay inside Pronto.
          </Text>
        </Card>
      </ScrollView>
    </Screen>
  );
}

function Row({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Switch value={value} onValueChange={onChange} trackColor={{ true: colors.teal, false: colors.border }} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: fontSize.display, fontWeight: fontWeight.black, color: colors.navy, letterSpacing: -1 },
  section: { fontSize: fontSize.md, fontWeight: fontWeight.bold, color: colors.navy, marginBottom: spacing.md },
  body: { fontSize: fontSize.sm, color: colors.textMuted, lineHeight: 22 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.sm },
  rowLabel: { fontSize: fontSize.sm, color: colors.textDark, fontWeight: fontWeight.semibold },
});
