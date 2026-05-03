import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import Screen from '../../components/Screen';
import LoadingSpinner from '../../components/LoadingSpinner';
import { colors } from '../../utils/colors';
import { fontSize, fontWeight, radius, spacing } from '../../utils/spacing';
import { useAuthStore } from '../../store/authStore';
import { listMessages, sendMessage } from '../../services/messages';
import { useMessagesRealtime } from '../../hooks/useRealtime';
import type { CustomerStackParamList } from '../../types';
import type { Message } from '@pronto/types';

type Rt = RouteProp<CustomerStackParamList, 'Chat'>;

export default function ChatScreen() {
  const route = useRoute<Rt>();
  const { conversationId: bookingId, otherUserId } = route.params;
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const listRef = useRef<FlatList<Message> | null>(null);

  useEffect(() => {
    let alive = true;
    listMessages(bookingId)
      .then((m) => alive && setMessages(m))
      .catch(() => alive && setMessages([]))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [bookingId]);

  useMessagesRealtime(
    bookingId,
    useCallback((m: Message) => {
      setMessages((prev) => (prev.some((x) => x.id === m.id) ? prev : [...prev, m]));
    }, [])
  );

  async function send() {
    if (!user || !draft.trim()) return;
    setSending(true);
    try {
      const m = await sendMessage({
        booking_id: bookingId,
        sender_id: user.id,
        recipient_id: otherUserId,
        body: draft.trim(),
      });
      setMessages((prev) => [...prev, m]);
      setDraft('');
    } catch (e) {
      console.warn('[Chat] send err:', (e as Error).message);
    } finally {
      setSending(false);
    }
  }

  if (loading) return <LoadingSpinner fullScreen message="Loading conversation..." />;

  return (
    <Screen padded={false}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(m) => m.id}
          contentContainerStyle={{ padding: spacing.lg }}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
          renderItem={({ item }) => {
            const mine = user?.id === item.sender_id;
            return (
              <View style={[styles.bubbleRow, mine ? styles.rowRight : styles.rowLeft]}>
                <View style={[styles.bubble, mine ? styles.mine : styles.theirs]}>
                  <Text style={[styles.bubbleText, mine && { color: colors.white }]}>{item.body}</Text>
                </View>
              </View>
            );
          }}
        />
        <View style={styles.composer}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="Type a message"
            placeholderTextColor={colors.textLight}
            style={styles.input}
            multiline
          />
          <Pressable onPress={send} disabled={sending || !draft.trim()} style={styles.sendBtn}>
            <Text style={styles.sendTxt}>{sending ? '…' : 'Send'}</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  bubbleRow: { flexDirection: 'row', marginBottom: spacing.sm },
  rowLeft: { justifyContent: 'flex-start' },
  rowRight: { justifyContent: 'flex-end' },
  bubble: { maxWidth: '75%', padding: spacing.md, borderRadius: radius.lg },
  mine: { backgroundColor: colors.blue, borderBottomRightRadius: 4 },
  theirs: { backgroundColor: colors.white, borderColor: colors.border, borderWidth: 1, borderBottomLeftRadius: 4 },
  bubbleText: { fontSize: fontSize.sm, color: colors.textDark, lineHeight: 20 },
  composer: {
    flexDirection: 'row',
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: colors.light,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: fontSize.md,
    color: colors.textDark,
    maxHeight: 120,
  },
  sendBtn: {
    marginLeft: spacing.sm,
    backgroundColor: colors.teal,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendTxt: { color: colors.navy, fontWeight: fontWeight.bold, fontSize: fontSize.sm },
});
