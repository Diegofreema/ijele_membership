import { Database } from './supabase';

export type MemberType = Database['public']['Tables']['users']['Row'];

export type RegisterMemberType = Omit<
  MemberType,
  'id' | 'created_at' | 'verified' | 'type' | 'user_id' | 'userId'
>;
