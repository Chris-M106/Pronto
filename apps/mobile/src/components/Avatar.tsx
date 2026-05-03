import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../utils/colors';
import { fontWeight } from '../utils/spacing';

interface Props {
  uri?: string | null;
  name?: string | null;
  size?: number;
  bg?: string;
  color?: string;
}

export default function Avatar({ uri, name, size = 40, bg = colors.blueBg, color = colors.blue }: Props) {
  const initials = (name ?? '?')
    .split(' ')
    .filter(Boolean)
    .map((p) => p[0]!.toUpperCase())
    .slice(0, 2)
    .join('') || '?';

  if (uri) {
    return <Image source={{ uri }} style={[styles.avatar, { width: size, height: size, borderRadius: size / 4 }]} />;
  }
  return (
    <View
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 4, backgroundColor: bg, alignItems: 'center', justifyContent: 'center' },
      ]}
    >
      <Text style={{ color, fontSize: size * 0.38, fontWeight: fontWeight.bold }}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: { backgroundColor: colors.blueBg },
});
