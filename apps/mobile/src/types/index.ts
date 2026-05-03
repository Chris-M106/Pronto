export * from '@pronto/types';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  SignUp: undefined;
};

export type CustomerTabParamList = {
  Home: undefined;
  Search: undefined;
  Messages: undefined;
  Account: undefined;
};

export type ProviderTabParamList = {
  Jobs: undefined;
  ProviderProfile: undefined;
  Earnings: undefined;
  Messages: undefined;
  Account: undefined;
};

export type CustomerStackParamList = {
  CustomerTabs: undefined;
  BookingFlow: { serviceCategory?: string } | undefined;
  Confirmation: { bookingId: string };
  Tracking: { bookingId: string };
  Chat: { conversationId: string; otherUserId: string };
  Settings: undefined;
};

export type ProviderStackParamList = {
  ProviderTabs: undefined;
  JobDetail: { bookingId: string };
  Chat: { conversationId: string; otherUserId: string };
  Settings: undefined;
};
