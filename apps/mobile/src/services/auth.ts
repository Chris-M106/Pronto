import { supabase } from './supabase';
import type { UserRole } from '@pronto/types';

export interface SignUpInput {
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
}

export interface SignInInput {
  email: string;
  password: string;
}

export async function signUp({ email, password, fullName, role }: SignUpInput) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, role },
    },
  });
  if (error) throw error;
  if (data.user) {
    const { error: profileErr } = await supabase.from('profiles').insert({
      user_id: data.user.id,
      full_name: fullName,
    });
    if (profileErr && profileErr.code !== '23505') {
      console.warn('[auth] profile insert failed:', profileErr.message);
    }
    const { error: roleErr } = await supabase.from('users').upsert({
      id: data.user.id,
      email,
      role,
    });
    if (roleErr) console.warn('[auth] role upsert failed:', roleErr.message);
  }
  return data;
}

export async function signIn({ email, password }: SignInInput) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw error;
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export function onAuthStateChange(cb: Parameters<typeof supabase.auth.onAuthStateChange>[0]) {
  return supabase.auth.onAuthStateChange(cb);
}
