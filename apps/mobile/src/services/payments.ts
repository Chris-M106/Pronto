import { supabase } from './supabase';
import type { Payment } from '@pronto/types';

export interface CreatePaymentInput {
  booking_id: string;
  customer_id: string;
  amount_cents: number;
  currency?: string;
}

/**
 * Create a payment record. In production this would call a Supabase Edge Function
 * that creates a Stripe PaymentIntent and returns the client secret. For now we
 * insert a row in the `payments` table with status `pending` so the rest of the
 * flow can be wired and tested. Swap `confirmPayment` with native Stripe SDK
 * once the dev client is built.
 */
export async function createPayment({
  booking_id,
  customer_id,
  amount_cents,
  currency = 'EUR',
}: CreatePaymentInput): Promise<Payment> {
  const { data, error } = await supabase
    .from('payments')
    .insert({
      booking_id,
      customer_id,
      amount_cents,
      currency,
      status: 'pending',
    })
    .select()
    .single();
  if (error) throw error;
  return data as Payment;
}

export async function holdPayment(paymentId: string): Promise<Payment> {
  const { data, error } = await supabase
    .from('payments')
    .update({ status: 'held' })
    .eq('id', paymentId)
    .select()
    .single();
  if (error) throw error;
  return data as Payment;
}

export async function releasePayment(paymentId: string): Promise<Payment> {
  const { data, error } = await supabase
    .from('payments')
    .update({ status: 'released' })
    .eq('id', paymentId)
    .select()
    .single();
  if (error) throw error;
  return data as Payment;
}

export async function listPaymentsForCustomer(customerId: string): Promise<Payment[]> {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Payment[];
}

export async function listPayoutsForProvider(providerId: string) {
  const { data, error } = await supabase
    .from('payouts')
    .select('*')
    .eq('provider_id', providerId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export function estimatePriceCents(category: string, size: 'small' | 'medium' | 'large' | 'fullDay'): {
  min: number;
  max: number;
} {
  const ranges: Record<string, Record<string, [number, number]>> = {
    plumbing: { small: [3500, 6500], medium: [8000, 14000], large: [16000, 28000], fullDay: [30000, 45000] },
    electrical: { small: [5000, 8500], medium: [10000, 18000], large: [20000, 35000], fullDay: [38000, 55000] },
    painting: { small: [4000, 7000], medium: [9000, 16000], large: [18000, 32000], fullDay: [35000, 50000] },
    gardening: { small: [3000, 5500], medium: [7000, 12000], large: [13000, 22000], fullDay: [25000, 38000] },
    assembly: { small: [2500, 5000], medium: [6000, 11000], large: [12000, 20000], fullDay: [22000, 32000] },
  };
  const r = ranges[category]?.[size] ?? [4500, 9000];
  return { min: r[0], max: r[1] };
}
