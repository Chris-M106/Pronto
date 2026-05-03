import { useCallback, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useBookingStore } from '../store/bookingStore';
import {
  listBookingsForCustomer,
  listJobsForProvider,
  acceptJob as acceptJobSvc,
  completeJob as completeJobSvc,
  updateBookingStatus,
} from '../services/bookings';
import type { BookingStatus } from '@pronto/types';

export function useBookings() {
  const user = useAuthStore((s) => s.user);
  const role = useAuthStore((s) => s.role);
  const bookings = useBookingStore((s) => s.bookings);
  const setBookings = useBookingStore((s) => s.setBookings);
  const loading = useBookingStore((s) => s.loading);
  const setLoading = useBookingStore((s) => s.setLoading);
  const upsertBooking = useBookingStore((s) => s.upsertBooking);

  const refresh = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const list =
        role === 'provider' ? await listJobsForProvider(user.id) : await listBookingsForCustomer(user.id);
      setBookings(list);
    } catch (e) {
      console.warn('[useBookings] refresh err:', (e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [user?.id, role, setBookings, setLoading]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    bookings,
    loading,
    refresh,
    acceptJob: async (bookingId: string) => {
      if (!user) return;
      const b = await acceptJobSvc(bookingId, user.id);
      upsertBooking(b);
    },
    completeJob: async (bookingId: string, finalCents: number) => {
      const b = await completeJobSvc(bookingId, finalCents);
      upsertBooking(b);
    },
    setStatus: async (bookingId: string, status: BookingStatus) => {
      const b = await updateBookingStatus(bookingId, status);
      upsertBooking(b);
    },
  };
}
