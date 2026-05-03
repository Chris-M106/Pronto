import { supabase } from './supabase';
import type { Message } from '@pronto/types';

export async function listConversations(userId: string) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
    .order('created_at', { ascending: false });
  if (error) throw error;

  const map = new Map<string, Message>();
  for (const m of (data ?? []) as Message[]) {
    const otherId = m.sender_id === userId ? m.recipient_id : m.sender_id;
    const key = `${otherId}:${m.booking_id}`;
    if (!map.has(key)) map.set(key, m);
  }
  return Array.from(map.entries()).map(([key, last]) => {
    const [otherUserId, bookingId] = key.split(':');
    return { otherUserId, bookingId, last };
  });
}

export async function listMessages(bookingId: string): Promise<Message[]> {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('booking_id', bookingId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data ?? []) as Message[];
}

export async function sendMessage(input: {
  booking_id: string;
  sender_id: string;
  recipient_id: string;
  body: string;
}): Promise<Message> {
  const { data, error } = await supabase.from('messages').insert(input).select().single();
  if (error) throw error;
  return data as Message;
}

export async function markRead(messageId: string) {
  await supabase.from('messages').update({ read_at: new Date().toISOString() }).eq('id', messageId);
}
