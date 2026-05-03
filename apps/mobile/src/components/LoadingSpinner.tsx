import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors } from '../utils/colors';
import { fontSize, spacing } from '../utils/spacing';

interface Props {
  message?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({ message, fullScreen }: Props) {
  return (
    <View style={[styles.base, fullScreen && styles.full]}>
      <ActivityIndicator color={colors.blue} size="large" />
      {message ? <Text style={styles.msg}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  base: { padding: spacing.xl, alignItems: 'center', justifyContent: 'center' },
  full: { flex: 1, backgroundColor: colors.white },
  msg: { marginTop: spacing.md, color: colors.textMuted, fontSize: fontSize.sm },
});
