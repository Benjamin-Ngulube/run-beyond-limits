
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Function to call Supabase Edge Functions
export async function callEdgeFunction(functionName: string, options: {
  method?: string;
  body?: any;
} = {}) {
  try {
    const { method = 'POST', body } = options;
    
    const response = await fetch(`${supabaseUrl}/functions/v1/${functionName}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseKey}`
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Edge function error: ${response.status} - ${errorData.error || 'Unknown error'}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error calling ${functionName}:`, error);
    throw error;
  }
}
