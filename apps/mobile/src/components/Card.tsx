import React from 'react';
import { Pressable, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { colors } from '../utils/colors';
import { radius, spacing } from '../utils/spacing';

interface Props extends ViewProps {
  onPress?: () => void;
  padding?: number;
  style?: ViewStyle;
}

export default function Card({ children, onPress, padding = spacing.lg, style, ...rest }: Props) {
  const inner = (
    <View {...rest} style={[styles.card, { padding }, style]}>
      {children}
    </View>
  );
  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}>
        {inner}
      </Pressable>
    );
  }
  return inner;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 1,
  },
});
