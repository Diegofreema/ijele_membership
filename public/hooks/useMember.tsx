import { TypeEnums } from '@/types';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useRef } from 'react';

type Props = {
  id: string | undefined;
};

export const useMember = ({ id }: Props) => {
  const isMember = useRef<TypeEnums | null>(null);
  const supabase = createClient();
  useEffect(() => {
    if (!id) {
      isMember.current = null;
      return;
    }
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from('users')
        .select()
        .eq('user_id', id)
        .single();
      if (error) {
        isMember.current = null;
        return;
      }

      isMember.current = data?.type;
    };
    fetchUser();
  }, [supabase, id]);
  return { isMember };
};
