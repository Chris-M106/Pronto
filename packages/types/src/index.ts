// Shared domain types — mirror Supabase schema (PACK 6)

export type UserRole = 'customer' | 'provider' | 'admin';

export type BookingStatus =
  | 'pending'
  | 'accepted'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'disputed';

export type PaymentStatus = 'pending' | 'held' | 'released' | 'refunded' | 'failed';

export type ServiceCategory =
  | 'plumbing'
  | 'electrical'
  | 'painting'
  | 'gardening'
  | 'assembly'
  | 'bathroom'
  | 'windows'
  | 'moving'
  | 'cleaning'
  | 'hvac'
  | 'carpentry';

export interface User {
  id: string;
  email: string;
  phone: string | null;
  role: UserRole;
  created_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  avatar_url: string | null;
  bio: string | null;
  city: string | null;
  country: string | null;
  language: string | null;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string | null;
  base_price_cents: number;
  created_at: string;
}

export interface ProviderService {
  id: string;
  provider_id: string;
  service_id: string;
  hourly_rate_cents: number;
  available: boolean;
  created_at: string;
}

export interface Booking {
  id: string;
  customer_id: string;
  provider_id: string | null;
  service_id: string;
  title: string;
  description: string | null;
  status: BookingStatus;
  scheduled_at: string | null;
  estimated_cents: number | null;
  final_cents: number | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  photos: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  booking_id: string;
  customer_id: string;
  amount_cents: number;
  currency: string;
  status: PaymentStatus;
  stripe_payment_intent_id: string | null;
  created_at: string;
}

export interface Payout {
  id: string;
  provider_id: string;
  amount_cents: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed';
  stripe_payout_id: string | null;
  created_at: string;
}

export interface Review {
  id: string;
  booking_id: string;
  reviewer_id: string;
  reviewee_id: string;
  rating: number;
  comment: string | null;
  visible: boolean;
  created_at: string;
}

export interface Dispute {
  id: string;
  booking_id: string;
  raised_by: string;
  reason: string;
  status: 'open' | 'resolved' | 'rejected';
  resolution: string | null;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  body: string | null;
  read: boolean;
  created_at: string;
}

export interface Message {
  id: string;
  booking_id: string;
  sender_id: string;
  recipient_id: string;
  body: string;
  read_at: string | null;
  created_at: string;
}

export interface IdentityVerification {
  id: string;
  user_id: string;
  status: 'pending' | 'verified' | 'rejected';
  document_type: string | null;
  verified_at: string | null;
  created_at: string;
}

export interface BankAccount {
  id: string;
  user_id: string;
  provider: 'stripe' | 'mbway';
  last4: string | null;
  active: boolean;
  created_at: string;
}

export interface AuditLog {
  id: string;
  actor_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
}
