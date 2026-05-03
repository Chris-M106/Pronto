import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Screen from '../../components/Screen';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import LoadingSpinner from '../../components/LoadingSpinner';
import { colors } from '../../utils/colors';
import { fontSize, fontWeight, spacing } from '../../utils/spacing';
import { useAuthStore } from '../../store/authStore';
import { listConversations, type Conversation } from '../../services/messages';
import type { CustomerStackParamList } from '../../types';

type ConvItem = Conversation;

type Nav = NativeStackNavigationProp<CustomerStackParamList, 'CustomerTabs'>;

export default function ConversationListScreen() {
  const navigation = useNavigation<Nav>();
  const { user } = useAuthStore();
  const [convs, setConvs] = useState<ConvItem[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    if (!user) return;
    setLoading(true);
    try {
      const list = await listConversations(user.id);
      setConvs(list);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [user?.id]);

  return (
    <Screen padded={false}>
      <FlatList
        data={convs}
        keyExtractor={(c) => `${c.otherUserId}:${c.bookingId}`}
        contentContainerStyle={{ padding: spacing.lg }}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={load} tintColor={colors.blue} />}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Messages</Text>
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <LoadingSpinner />
          ) : (
            <Card style={{ alignItems: 'center', paddingVertical: spacing.xxl }}>
              <Text style={styles.emptyTitle}>No conversations yet</Text>
              <Text style={styles.emptyDesc}>Once a job is booked, you can chat with your pro here.</Text>
            </Card>
          )
        }
        renderItem={({ item }) => (
          <Card
            onPress={() =>
              navigation.navigate('Chat', { conversationId: item.bookingId, otherUserId: item.otherUserId })
            }
            style={{ marginBottom: spacing.sm }}
          >
            <View style={styles.row}>
              <Avatar name={item.otherName ?? item.otherUserId.slice(0, 2)} size={44} />
              <View style={{ flex: 1, marginLeft: spacing.md }}>
                <Text style={styles.name} numberOfLines={1}>
                  {item.otherName ?? `${item.otherUserId.slice(0, 8)}…`}
                </Text>
                <Text style={styles.preview} numberOfLines={1}>
                  {item.last.body}
                </Text>
              </View>
              <Text style={styles.time}>
                {new Date(item.last.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          </Card>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: fontSize.display, fontWeight: fontWeight.black, color: colors.navy, letterSpacing: -1, marginBottom: spacing.lg },
  row: { flexDirection: 'row', alignItems: 'center' },
  name: { fontSize: fontSize.md, fontWeight: fontWeight.bold, color: colors.navy },
  preview: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 2 },
  time: { fontSize: fontSize.xs, color: colors.textLight, marginLeft: spacing.sm },
  emptyTitle: { fontSize: fontSize.lg, fontWeight: fontWeight.bold, color: colors.navy, marginBottom: spacing.xs },
  emptyDesc: { fontSize: fontSize.sm, color: colors.textMuted, textAlign: 'center' },
});
