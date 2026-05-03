import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './Button';
import { colors } from '../utils/colors';
import { fontSize, fontWeight, spacing } from '../utils/spacing';

interface Props {
  children: React.ReactNode;
}
interface State {
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  reset = () => this.setState({ error: null });

  render() {
    if (this.state.error) {
      return (
        <View style={styles.box}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.msg}>{this.state.error.message}</Text>
          <Button label="Try again" onPress={this.reset} variant="primary" />
        </View>
      );
    }
    return this.props.children as React.ReactElement;
  }
}

const styles = StyleSheet.create({
  box: { flex: 1, padding: spacing.xl, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white },
  title: { fontSize: fontSize.xl, fontWeight: fontWeight.bold, color: colors.navy, marginBottom: spacing.sm },
  msg: { fontSize: fontSize.sm, color: colors.textMuted, marginBottom: spacing.xl, textAlign: 'center' },
});
