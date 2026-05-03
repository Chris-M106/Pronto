import { create } from 'zustand';
import type { Booking } from '@pronto/types';

export interface DraftBooking {
  serviceId: string | null;
  serviceCategory: string | null;
  title: string;
  description: string;
  scheduledAt: string | null;
  estimatedCents: number | null;
  address: string;
  photos: string[];
}

interface BookingState {
  bookings: Booking[];
  draft: DraftBooking;
  loading: boolean;
  setBookings: (b: Booking[]) => void;
  upsertBooking: (b: Booking) => void;
  setLoading: (v: boolean) => void;
  setDraft: (patch: Partial<DraftBooking>) => void;
  resetDraft: () => void;
}

const emptyDraft: DraftBooking = {
  serviceId: null,
  serviceCategory: null,
  title: '',
  description: '',
  scheduledAt: null,
  estimatedCents: null,
  address: '',
  photos: [],
};

export const useBookingStore = create<BookingState>((set) => ({
  bookings: [],
  draft: emptyDraft,
  loading: false,
  setBookings: (bookings) => set({ bookings }),
  upsertBooking: (b) =>
    set((s) => {
      const idx = s.bookings.findIndex((x) => x.id === b.id);
      if (idx === -1) return { bookings: [b, ...s.bookings] };
      const next = s.bookings.slice();
      next[idx] = b;
      return { bookings: next };
    }),
  setLoading: (loading) => set({ loading }),
  setDraft: (patch) => set((s) => ({ draft: { ...s.draft, ...patch } })),
  resetDraft: () => set({ draft: emptyDraft }),
}));
