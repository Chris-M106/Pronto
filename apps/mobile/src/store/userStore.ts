import { create } from 'zustand';
import type { Profile } from '@pronto/types';

interface UserState {
  profile: Profile | null;
  loading: boolean;
  setProfile: (p: Profile | null) => void;
  setLoading: (v: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  loading: false,
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ loading }),
}));
