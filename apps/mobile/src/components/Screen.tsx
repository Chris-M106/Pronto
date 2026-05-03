import React from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView as SafeAreaViewRaw } from 'react-native-safe-area-context';

const SafeAreaView = SafeAreaViewRaw as any;
import { colors } from '../utils/colors';
import { spacing } from '../utils/spacing';

interface Props {
  children: React.ReactNode;
  scroll?: boolean;
  bg?: string;
  padded?: boolean;
  contentStyle?: ViewStyle;
}

export default function Screen({ children, scroll = false, bg = colors.light, padded = true, contentStyle }: Props) {
  const Container = scroll ? ScrollView : View;
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: bg }]} edges={['top', 'bottom', 'left', 'right']}>
      <Container
        style={{ flex: 1 }}
        contentContainerStyle={scroll ? [padded && styles.padded, contentStyle] : undefined}
      >
        {scroll ? children : <View style={[{ flex: 1 }, padded && styles.padded, contentStyle]}>{children}</View>}
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  padded: { padding: spacing.lg },
});
