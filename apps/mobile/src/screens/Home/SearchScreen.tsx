import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Screen from '../../components/Screen';
import Input from '../../components/Input';
import ProviderCard from '../../components/ProviderCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { colors } from '../../utils/colors';
import { fontSize, fontWeight, radius, spacing } from '../../utils/spacing';
import { SERVICE_CATEGORIES } from '../../utils/constants';
import { useProviders } from '../../hooks/useProviders';
import type { CustomerStackParamList } from '../../types';

type Nav = NativeStackNavigationProp<CustomerStackParamList, 'CustomerTabs'>;

export default function SearchScreen() {
  const navigation = useNavigation<Nav>();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | undefined>(undefined);
  const { providers, loading, refresh } = useProviders({ category });

  const filtered = useMemo(() => {
    if (!query) return providers;
    const q = query.toLowerCase();
    return providers.filter(
      (p) => p.full_name.toLowerCase().includes(q) || (p.city ?? '').toLowerCase().includes(q)
    );
  }, [providers, query]);

  return (
    <Screen padded={false}>
      <View style={{ padding: spacing.lg, paddingBottom: 0 }}>
        <Text style={styles.title}>Find a pro</Text>
        <Input
          placeholder="Search by name or city"
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
          containerStyle={{ marginTop: spacing.md }}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: spacing.sm }}
        >
          <Pressable
            onPress={() => {
              setCategory(undefined);
              refresh({});
            }}
            style={[styles.chip, !category && styles.chipActive]}
          >
            <Text style={[styles.chipText, !category && styles.chipTextActive]}>All</Text>
          </Pressable>
          {SERVICE_CATEGORIES.map((c) => (
            <Pressable
              key={c.key}
              onPress={() => {
                setCategory(c.key);
                refresh({ category: c.key });
              }}
              style={[styles.chip, category === c.key && styles.chipActive]}
            >
              <Text style={[styles.chipText, category === c.key && styles.chipTextActive]}>
                {c.icon} {c.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(p) => p.user_id}
        contentContainerStyle={{ padding: spacing.lg }}
        ListEmptyComponent={
          loading ? <LoadingSpinner /> : (
            <Text style={styles.empty}>No providers match this filter yet.</Text>
          )
        }
        renderItem={({ item }) => (
          <ProviderCard
            provider={item}
            onPress={() => navigation.navigate('BookingFlow', { serviceCategory: category })}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: fontSize.display, fontWeight: fontWeight.black, color: colors.navy, letterSpacing: -1 },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
  },
  chipActive: { backgroundColor: colors.navy, borderColor: colors.navy },
  chipText: { fontSize: fontSize.sm, color: colors.textMuted, fontWeight: fontWeight.semibold },
  chipTextActive: { color: colors.white },
  empty: { textAlign: 'center', color: colors.textMuted, padding: spacing.xl },
});
