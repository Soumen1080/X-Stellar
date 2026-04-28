export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          wallet_address: string;
          display_name: string;
          created_at: string;
          updated_at: string;
          last_login_at: string;
        };
        Insert: {
          id?: string;
          wallet_address: string;
          display_name: string;
          last_login_at?: string;
        };
        Update: {
          wallet_address?: string;
          display_name?: string;
          last_login_at?: string;
        };
      };
      expenses: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          total_amount: string;
          split_mode: string;
          members: Json;
          shares: Json;
          paid_by_member_id: string;
          settled: boolean;
          created_at: string;
          updated_at: string;
          trip_id: string | null;
          user_wallet_address: string;
        };
        Insert: {
          id: string;
          title: string;
          description?: string | null;
          total_amount: string;
          split_mode: string;
          members: Json;
          shares: Json;
          paid_by_member_id: string;
          settled: boolean;
          trip_id?: string | null;
          user_wallet_address: string;
        };
        Update: {
          title?: string;
          description?: string | null;
          total_amount?: string;
          split_mode?: string;
          members?: Json;
          shares?: Json;
          paid_by_member_id?: string;
          settled?: boolean;
          trip_id?: string | null;
          updated_at?: string;
        };
      };
      trips: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          members: Json;
          expense_ids: Json;
          created_at: string;
          settled: boolean;
          user_wallet_address: string;
        };
        Insert: {
          id: string;
          name: string;
          description?: string | null;
          members: Json;
          expense_ids: Json;
          settled: boolean;
          user_wallet_address: string;
        };
        Update: {
          name?: string;
          description?: string | null;
          members?: Json;
          expense_ids?: Json;
          settled?: boolean;
        };
      };
    };
  };
}
