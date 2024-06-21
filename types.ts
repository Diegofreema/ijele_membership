import { Database } from './supabase';

export type MemberType = Database['public']['Tables']['users']['Row'];

export type RegisterMemberType = Omit<
  MemberType,
  'id' | 'created_at' | 'verified' | 'type' | 'user_id' | 'userId' | 'duration'
>;

export type TypeEnums = Database['public']['Enums']['memberType'];

export type UpdateType = {
  email: string;
  first_name: string;
  last_name: string;
  phoneNumber: string;
  dateOfBirth: string;
  salutation: string;
  img_url: string;
  middle_name?: string;
  title?: string;
};
