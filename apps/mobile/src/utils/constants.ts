import Constants from 'expo-constants';

const extra = (Constants.expoConfig?.extra ?? {}) as Record<string, string | undefined>;

const fromEnv = (key: string): string | undefined =>
  process.env[key] ?? extra[key];

export const SUPABASE_URL =
  fromEnv('EXPO_PUBLIC_SUPABASE_URL') ?? extra.supabaseUrl ?? '';

export const SUPABASE_ANON_KEY =
  fromEnv('EXPO_PUBLIC_SUPABASE_ANON_KEY') ?? extra.supabaseAnonKey ?? '';

export const STRIPE_PUBLISHABLE_KEY =
  fromEnv('EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY') ?? extra.stripePublishableKey ?? '';

export const APP_NAME = 'Pronto';
export const SUPPORT_EMAIL = 'support@pronto.app';

export const SERVICE_CATEGORIES = [
  { key: 'plumbing', label: 'Plumbing', icon: '🔧' },
  { key: 'electrical', label: 'Electrical', icon: '⚡' },
  { key: 'painting', label: 'Painting', icon: '🎨' },
  { key: 'gardening', label: 'Gardening', icon: '🌿' },
  { key: 'assembly', label: 'Assembly', icon: '🪑' },
  { key: 'bathroom', label: 'Bathroom', icon: '🚿' },
  { key: 'windows', label: 'Windows', icon: '🪟' },
  { key: 'moving', label: 'Moving', icon: '📦' },
  { key: 'cleaning', label: 'Cleaning', icon: '🧽' },
  { key: 'hvac', label: 'HVAC', icon: '❄️' },
  { key: 'carpentry', label: 'Carpentry', icon: '🔨' },
] as const;

export type ServiceCategoryKey = typeof SERVICE_CATEGORIES[number]['key'];
