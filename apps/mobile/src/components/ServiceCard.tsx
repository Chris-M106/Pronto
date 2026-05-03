import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../utils/colors';
import { fontSize, fontWeight, radius, spacing } from '../utils/spacing';

interface Props {
  icon: string;
  name: string;
  count?: string;
  bg?: string;
  onPress?: () => void;
}

export default function ServiceCard({ icon, name, count, bg = colors.blueBg, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: bg, opacity: pressed ? 0.85 : 1 },
      ]}
    >
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.name}>{name}</Text>
      {count ? <Text style={styles.count}>{count}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 110,
  },
  icon: { fontSize: 28, marginBottom: spacing.xs },
  name: { fontSize: fontSize.md, fontWeight: fontWeight.bold, color: colors.textDark, marginBottom: 2 },
  count: { fontSize: fontSize.xs, color: colors.textMuted },
});
