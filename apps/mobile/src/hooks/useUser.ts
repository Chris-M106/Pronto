import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useUserStore } from '../store/userStore';
import { getProviderProfile } from '../services/providers';

export function useUser() {
  const user = useAuthStore((s) => s.user);
  const { profile, loading, setProfile, setLoading } = useUserStore();

  useEffect(() => {
    if (!user) {
      setProfile(null);
      return;
    }
    let alive = true;
    setLoading(true);
    getProviderProfile(user.id)
      .then((p) => alive && setProfile(p))
      .catch((e) => console.warn('[useUser] load err:', e?.message ?? e))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [user?.id]);

  return { profile, loading };
}
