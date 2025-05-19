
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Function to call Supabase Edge Functions
export async function callEdgeFunction(functionName: string, options: {
  method?: string;
  body?: Record<string, unknown>;
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

// Email helper functions
export const sendEmail = {
  // Send verification email when admin verifies registration
  verification: async (name: string, email: string) => {
    return callEdgeFunction('send-participant-email', {
      body: {
        name,
        email,
        emailType: 'verification'
      }
    });
  },
  
  // Send welcome email when user registers
  welcome: async (name: string, email: string, customData: Record<string, string | number | boolean> = {}) => {
    return callEdgeFunction('send-participant-email', {
      body: {
        name,
        email,
        emailType: 'welcome',
        customData
      }
    });
  },
  
  // Send reminder email before event
  reminder: async (name: string, email: string, customData: Record<string, string | number | boolean> = {}) => {
    return callEdgeFunction('send-participant-email', {
      body: {
        name,
        email,
        emailType: 'reminder',
        customData
      }
    });
  },
  
  // Send test email
  test: async (name: string, email: string) => {
    return callEdgeFunction('send-participant-email', {
      body: {
        name,
        email,
        emailType: 'test'
      }
    });
  }
};
