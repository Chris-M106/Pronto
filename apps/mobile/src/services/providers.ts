import { supabase } from './supabase';
import type { Profile, Service, ProviderService } from '@pronto/types';

export interface ProviderListItem {
  user_id: string;
  full_name: string;
  avatar_url: string | null;
  city: string | null;
  bio: string | null;
  rating: number;
  jobs_completed: number;
  hourly_rate_cents: number | null;
}

export interface ProviderFilter {
  category?: string;
  minRating?: number;
  maxDistanceKm?: number;
  sortBy?: 'rating' | 'price' | 'distance';
}

export async function listServices(): Promise<Service[]> {
  const { data, error } = await supabase.from('services').select('*').order('name');
  if (error) throw error;
  return (data ?? []) as Service[];
}

export async function searchProviders(filter: ProviderFilter = {}): Promise<ProviderListItem[]> {
  let query = supabase
    .from('profiles')
    .select(
      `user_id, full_name, avatar_url, city, bio,
       provider_services!inner(hourly_rate_cents, services!inner(category))`
    )
    .limit(50);

  if (filter.category) {
    query = query.eq('provider_services.services.category', filter.category);
  }

  const { data, error } = await query;
  if (error) throw error;

  let items: ProviderListItem[] = (data ?? []).map((p: any) => {
    const ps = (p.provider_services ?? []).filter((x: any) =>
      filter.category ? x.services?.category === filter.category : true
    );
    return {
      user_id: p.user_id,
      full_name: p.full_name,
      avatar_url: p.avatar_url,
      city: p.city,
      bio: p.bio,
      rating: seededRating(p.user_id),
      jobs_completed: seededJobsCompleted(p.user_id),
      hourly_rate_cents: ps[0]?.hourly_rate_cents ?? null,
    };
  });

  if (filter.minRating) items = items.filter((i) => i.rating >= filter.minRating!);
  if (filter.sortBy === 'rating') items.sort((a, b) => b.rating - a.rating);
  if (filter.sortBy === 'price')
    items.sort((a, b) => (a.hourly_rate_cents ?? 0) - (b.hourly_rate_cents ?? 0));

  return items;
}

export async function getProviderProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw error;
  return (data as Profile) ?? null;
}

export async function getProviderServices(providerId: string): Promise<ProviderService[]> {
  const { data, error } = await supabase
    .from('provider_services')
    .select('*')
    .eq('provider_id', providerId);
  if (error) throw error;
  return (data ?? []) as ProviderService[];
}

function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seededRating(userId: string): number {
  const r = (hashStr(userId + ':rating') % 1000) / 1000;
  return Math.round((4.0 + r) * 10) / 10;
}

function seededJobsCompleted(userId: string): number {
  return hashStr(userId + ':jobs') % 200;
}

export async function updateProfile(userId: string, patch: Partial<Profile>) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq('user_id', userId)
    .select()
    .single();
  if (error) throw error;
  return data as Profile;
}
