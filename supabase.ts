export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      images: {
        Row: {
          created_at: string;
          id: number;
          image_url: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          image_url?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          image_url?: string | null;
        };
        Relationships: [];
      };
      loaned_in: {
        Row: {
          club_id: number | null;
          created_at: string;
          from: string | null;
          id: number;
          player_id: number | null;
          to: string | null;
          wage_paidby_external_club: number | null;
          wage_paidby_ijele: number | null;
        };
        Insert: {
          club_id?: number | null;
          created_at?: string;
          from?: string | null;
          id?: number;
          player_id?: number | null;
          to?: string | null;
          wage_paidby_external_club?: number | null;
          wage_paidby_ijele?: number | null;
        };
        Update: {
          club_id?: number | null;
          created_at?: string;
          from?: string | null;
          id?: number;
          player_id?: number | null;
          to?: string | null;
          wage_paidby_external_club?: number | null;
          wage_paidby_ijele?: number | null;
        };
        Relationships: [];
      };
      loaned_out: {
        Row: {
          club_id: number | null;
          created_at: string;
          from: string | null;
          id: number;
          player_id: number | null;
          to: string | null;
          wage_paidby_external_club: number | null;
          wage_paidby_ijele: number | null;
        };
        Insert: {
          club_id?: number | null;
          created_at?: string;
          from?: string | null;
          id?: number;
          player_id?: number | null;
          to?: string | null;
          wage_paidby_external_club?: number | null;
          wage_paidby_ijele?: number | null;
        };
        Update: {
          club_id?: number | null;
          created_at?: string;
          from?: string | null;
          id?: number;
          player_id?: number | null;
          to?: string | null;
          wage_paidby_external_club?: number | null;
          wage_paidby_ijele?: number | null;
        };
        Relationships: [];
      };
      matches: {
        Row: {
          attendance: number | null;
          away_score: number;
          away_team: string;
          away_team_img: string;
          created_at: string;
          date_of_match: string;
          home_score: number;
          home_team: string;
          home_team_img: string;
          id: number;
          kick_off: string;
          league: string;
          match_result: Database['public']['Enums']['RESULT'];
          ref_name: string | null;
          venue: string;
        };
        Insert: {
          attendance?: number | null;
          away_score?: number;
          away_team?: string;
          away_team_img?: string;
          created_at?: string;
          date_of_match: string;
          home_score?: number;
          home_team?: string;
          home_team_img?: string;
          id?: number;
          kick_off: string;
          league?: string;
          match_result: Database['public']['Enums']['RESULT'];
          ref_name?: string | null;
          venue?: string;
        };
        Update: {
          attendance?: number | null;
          away_score?: number;
          away_team?: string;
          away_team_img?: string;
          created_at?: string;
          date_of_match?: string;
          home_score?: number;
          home_team?: string;
          home_team_img?: string;
          id?: number;
          kick_off?: string;
          league?: string;
          match_result?: Database['public']['Enums']['RESULT'];
          ref_name?: string | null;
          venue?: string;
        };
        Relationships: [];
      };
      men: {
        Row: {
          age: string;
          bio: string | null;
          contract_end_date: string;
          contract_start_date: string;
          contract_type: string | null;
          created_at: string;
          first_name: string;
          height: string;
          id: number;
          image_url: string;
          injured: boolean | null;
          jersey_number: number;
          last_name: string;
          leave: boolean | null;
          lga: string;
          loan_away: boolean | null;
          loan_home: boolean | null;
          middle_name: string | null;
          nationality: string;
          position: Database['public']['Enums']['ROLE'];
          role: Database['public']['Enums']['DUTY'] | null;
          second_position: string | null;
          skills_description: string | null;
          state_of_orgin: string;
          suspended: boolean | null;
          wage_per_week: number;
          weight: string;
        };
        Insert: {
          age?: string;
          bio?: string | null;
          contract_end_date: string;
          contract_start_date: string;
          contract_type?: string | null;
          created_at?: string;
          first_name?: string;
          height: string;
          id?: number;
          image_url?: string;
          injured?: boolean | null;
          jersey_number: number;
          last_name?: string;
          leave?: boolean | null;
          lga?: string;
          loan_away?: boolean | null;
          loan_home?: boolean | null;
          middle_name?: string | null;
          nationality?: string;
          position: Database['public']['Enums']['ROLE'];
          role?: Database['public']['Enums']['DUTY'] | null;
          second_position?: string | null;
          skills_description?: string | null;
          state_of_orgin?: string;
          suspended?: boolean | null;
          wage_per_week: number;
          weight: string;
        };
        Update: {
          age?: string;
          bio?: string | null;
          contract_end_date?: string;
          contract_start_date?: string;
          contract_type?: string | null;
          created_at?: string;
          first_name?: string;
          height?: string;
          id?: number;
          image_url?: string;
          injured?: boolean | null;
          jersey_number?: number;
          last_name?: string;
          leave?: boolean | null;
          lga?: string;
          loan_away?: boolean | null;
          loan_home?: boolean | null;
          middle_name?: string | null;
          nationality?: string;
          position?: Database['public']['Enums']['ROLE'];
          role?: Database['public']['Enums']['DUTY'] | null;
          second_position?: string | null;
          skills_description?: string | null;
          state_of_orgin?: string;
          suspended?: boolean | null;
          wage_per_week?: number;
          weight?: string;
        };
        Relationships: [];
      };
      news: {
        Row: {
          author_name: string | null;
          category: string | null;
          created_at: string;
          id: number;
          image_url: string | null;
          news: string | null;
          title: string;
        };
        Insert: {
          author_name?: string | null;
          category?: string | null;
          created_at?: string;
          id?: number;
          image_url?: string | null;
          news?: string | null;
          title?: string;
        };
        Update: {
          author_name?: string | null;
          category?: string | null;
          created_at?: string;
          id?: number;
          image_url?: string | null;
          news?: string | null;
          title?: string;
        };
        Relationships: [];
      };
      players_statistics: {
        Row: {
          appearance: number | null;
          assists: number | null;
          created_at: string;
          goals: number | null;
          id: number;
          name: string | null;
          player_id: number | null;
          red_cards: number | null;
          year: string | null;
          yellow_cards: number | null;
        };
        Insert: {
          appearance?: number | null;
          assists?: number | null;
          created_at?: string;
          goals?: number | null;
          id?: number;
          name?: string | null;
          player_id?: number | null;
          red_cards?: number | null;
          year?: string | null;
          yellow_cards?: number | null;
        };
        Update: {
          appearance?: number | null;
          assists?: number | null;
          created_at?: string;
          goals?: number | null;
          id?: number;
          name?: string | null;
          player_id?: number | null;
          red_cards?: number | null;
          year?: string | null;
          yellow_cards?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'players_statistics_player_id_fkey';
            columns: ['player_id'];
            isOneToOne: false;
            referencedRelation: 'men';
            referencedColumns: ['id'];
          }
        ];
      };
      products: {
        Row: {
          created_at: string;
          description: string;
          id: number;
          image_url: string;
          number_in_stock: number | null;
          price: number;
          product_name: string;
        };
        Insert: {
          created_at?: string;
          description?: string;
          id?: number;
          image_url: string;
          number_in_stock?: number | null;
          price: number;
          product_name: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          id?: number;
          image_url?: string;
          number_in_stock?: number | null;
          price?: number;
          product_name?: string;
        };
        Relationships: [];
      };
      regular: {
        Row: {
          created_at: string;
          id: number;
          type: string | null;
          userId: string | null;
        };
        Insert: {
          created_at?: string;
          id: number;
          type?: string | null;
          userId?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          type?: string | null;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'regular_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['user_id'];
          }
        ];
      };
      users: {
        Row: {
          created_at: string;
          dateOfBirth: string | null;
          email: string;
          first_name: string;
          gender: string;
          id: number;
          img_url: string | null;
          last_name: string;
          middle_name: string | null;
          password: string;
          salutation: string | null;
          title: string | null;
          type: Database['public']['Enums']['memberType'] | null;
          user_id: string;
          userId: string;
          verified: boolean | null;
        };
        Insert: {
          created_at?: string;
          dateOfBirth?: string | null;
          email?: string;
          first_name?: string;
          gender?: string;
          id?: number;
          img_url?: string | null;
          last_name?: string;
          middle_name?: string | null;
          password?: string;
          salutation?: string | null;
          title?: string | null;
          type?: Database['public']['Enums']['memberType'] | null;
          user_id?: string;
          userId?: string;
          verified?: boolean | null;
        };
        Update: {
          created_at?: string;
          dateOfBirth?: string | null;
          email?: string;
          first_name?: string;
          gender?: string;
          id?: number;
          img_url?: string | null;
          last_name?: string;
          middle_name?: string | null;
          password?: string;
          salutation?: string | null;
          title?: string | null;
          type?: Database['public']['Enums']['memberType'] | null;
          user_id?: string;
          userId?: string;
          verified?: boolean | null;
        };
        Relationships: [];
      };
      videos: {
        Row: {
          caption: string | null;
          created_at: string;
          id: number;
          type: Database['public']['Enums']['VIDEO_TYPE'];
          video_url: string;
        };
        Insert: {
          caption?: string | null;
          created_at?: string;
          id?: number;
          type?: Database['public']['Enums']['VIDEO_TYPE'];
          video_url?: string;
        };
        Update: {
          caption?: string | null;
          created_at?: string;
          id?: number;
          type?: Database['public']['Enums']['VIDEO_TYPE'];
          video_url?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      DUTY:
        | 'captain'
        | 'assistant captain'
        | 'head coach'
        | 'assistant coach'
        | 'technical coach'
        | 'goalkeeper coach'
        | 'set piece coach'
        | 'regular';
      memberType:
        | 'regular'
        | 'honorary-board-membership'
        | 'honorary-president'
        | 'life'
        | 'annual';
      RESULT:
        | 'win'
        | 'loss'
        | 'draw'
        | 'abandoned'
        | 'upcoming'
        | 'live'
        | 'postponed';
      ROLE: 'forward' | 'midfielder' | 'defender' | 'goalkeeper' | 'coach';
      VIDEO_TYPE: 'first team' | 'academy' | 'press conference';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;
