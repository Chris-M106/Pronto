import { supabase } from './supabase';
import type { Booking, BookingStatus } from '@pronto/types';

export interface CreateBookingInput {
  customer_id: string;
  service_id: string;
  title: string;
  description?: string | null;
  scheduled_at?: string | null;
  estimated_cents?: number | null;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  photos?: string[];
}

export async function createBooking(input: CreateBookingInput): Promise<Booking> {
  const { data, error } = await supabase
    .from('bookings')
    .insert({ ...input, status: 'pending' as BookingStatus })
    .select()
    .single();
  if (error) throw error;
  return data as Booking;
}

export async function listBookingsForCustomer(customerId: string): Promise<Booking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Booking[];
}

export async function listJobsForProvider(providerId: string): Promise<Booking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .or(`provider_id.eq.${providerId},provider_id.is.null`)
    .in('status', ['pending', 'accepted', 'in_progress'])
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Booking[];
}

export async function getBooking(id: string): Promise<Booking | null> {
  const { data, error } = await supabase.from('bookings').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return (data as Booking) ?? null;
}

export async function updateBookingStatus(
  id: string,
  status: BookingStatus,
  patch: Partial<Booking> = {}
): Promise<Booking> {
  const { data, error } = await supabase
    .from('bookings')
    .update({ ...patch, status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Booking;
}

export async function acceptJob(bookingId: string, providerId: string): Promise<Booking> {
  return updateBookingStatus(bookingId, 'accepted', { provider_id: providerId });
}

export async function completeJob(bookingId: string, finalCents: number): Promise<Booking> {
  return updateBookingStatus(bookingId, 'completed', { final_cents: finalCents });
}
