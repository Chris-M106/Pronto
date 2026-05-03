import { create } from 'zustand';
import type { Session, User as SupaUser } from '@supabase/supabase-js';
import type { UserRole } from '@pronto/types';

interface AuthState {
  session: Session | null;
  user: SupaUser | null;
  role: UserRole | null;
  initialized: boolean;
  setSession: (session: Session | null) => void;
  setRole: (role: UserRole | null) => void;
  setInitialized: (v: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  role: null,
  initialized: false,
  setSession: (session) =>
    set({
      session,
      user: session?.user ?? null,
      role: ((session?.user?.user_metadata as any)?.role as UserRole) ?? null,
    }),
  setRole: (role) => set({ role }),
  setInitialized: (initialized) => set({ initialized }),
  // initialized intentionally preserved across logout — bootstrap only runs once per app launch.
  reset: () => set({ session: null, user: null, role: null }),
}));
