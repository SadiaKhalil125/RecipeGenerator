import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// More detailed logging for debugging
console.log('Supabase Configuration:');
console.log('URL:', supabaseUrl ? 'Set' : 'Not set');
console.log('Key:', supabaseAnonKey ? 'Set' : 'Not set');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Create client with better error handling
let supabase: ReturnType<typeof createClient>;
try {
  supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key',
    {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    }
  );
  console.log('Supabase client created successfully');
} catch (error) {
  console.error('Error creating Supabase client:', error);
  // Fallback client
  supabase = createClient('https://placeholder.supabase.co', 'placeholder-key');
}

export { supabase };

// Auth helpers
export const signInWithMagicLink = async (email: string) => {
  console.log('Attempting to send magic link to:', email);
  console.log('Supabase URL:', supabaseUrl);
  console.log('Redirect URL:', `${window.location.origin}/auth/callback`);
  
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    
    console.log('Magic link response:', { data, error });
    return { data, error };
  } catch (err) {
    console.error('Magic link error:', err);
    return { data: null, error: err };
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

export const onAuthStateChange = (callback: (user: any) => void) => {
  return supabase.auth.onAuthStateChange((event: string, session: any) => {
    callback(session?.user || null);
  });
};

// Database helpers
export const saveFavorite = async (userId: string, recipeId: string) => {
  const { data, error } = await supabase
    .from('favorites')
    .insert([{ user_id: userId, recipe_id: recipeId }]);
  return { data, error };
};

export const removeFavorite = async (userId: string, recipeId: string) => {
  const { data, error } = await supabase
    .from('favorites')
    .delete()
    .match({ user_id: userId, recipe_id: recipeId });
  return { data, error };
};

export const getFavorites = async (userId: string) => {
  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', userId);
  return { data, error };
};

export const checkIfFavorite = async (userId: string, recipeId: string) => {
  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .match({ user_id: userId, recipe_id: recipeId })
    .single();
  return { data, error };
}; 