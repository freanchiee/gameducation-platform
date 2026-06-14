// src/utils/fetchStrandhoots.ts
import { supabase } from './supabase';

export async function fetchStrandhoots() {
  const { data, error } = await supabase
    .from('strandhoots')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('❌ Failed to fetch strandhoots:', error.message);
    return [];
  }

  return data;
}
