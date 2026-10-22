/**
 * F&J Workforce Limited - Supabase Integration Client
 * Provides configuration status and connection helpers for production deployment.
 */

export interface SupabaseConfig {
  url?: string;
  anonKey?: string;
  isConfigured: boolean;
}

export function getSupabaseConfig(): SupabaseConfig {
  // Check for client-side environment variables
  const url = (import.meta as any).env?.VITE_SUPABASE_URL || '';
  const anonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

  return {
    url,
    anonKey,
    isConfigured: Boolean(url && anonKey && url.startsWith('http'))
  };
}
