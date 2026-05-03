import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { getSession, onAuthStateChange, signIn, signOut, signUp } from '../services/auth';

export function useAuthBootstrap() {
  const { setSession, setInitialized } = useAuthStore();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const session = await getSession();
        if (mounted) setSession(session);
      } catch (e) {
        console.warn('[useAuth] bootstrap error:', e);
      } finally {
        if (mounted) setInitialized(true);
      }
    })();

    const { data: sub } = onAuthStateChange(async (_event, session) => {
      setSession(session);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [setSession, setInitialized]);
}

export function useAuth() {
  const { session, user, role, initialized, reset } = useAuthStore();
  return {
    session,
    user,
    role,
    initialized,
    isAuthenticated: !!session,
    signIn,
    signUp,
    signOut: async () => {
      await signOut();
      reset();
    },
  };
}
