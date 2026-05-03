import { useEffect } from 'react';
import { supabase } from '../services/supabase';
import type { Booking, Message } from '@pronto/types';

export function useBookingRealtime(bookingId: string | null, onChange: (b: Booking) => void) {
  useEffect(() => {
    if (!bookingId) return;
    const channel = supabase
      .channel(`booking:${bookingId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookings', filter: `id=eq.${bookingId}` },
        (payload) => {
          if (payload.new) onChange(payload.new as Booking);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [bookingId, onChange]);
}

export function useMessagesRealtime(bookingId: string | null, onMessage: (m: Message) => void) {
  useEffect(() => {
    if (!bookingId) return;
    const channel = supabase
      .channel(`messages:${bookingId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `booking_id=eq.${bookingId}` },
        (payload) => onMessage(payload.new as Message)
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [bookingId, onMessage]);
}
