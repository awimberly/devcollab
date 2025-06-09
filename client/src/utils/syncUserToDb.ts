import { supabase } from '../supabase';

export const syncUserToDb = async () => {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  console.log('[syncUserToDb] Session:', session);

  if (sessionError || !session?.user) {
    console.error('[syncUserToDb] No session or user');
    return null;
  }

  const user = session.user;

  // Log user ID for policy comparison
  console.log('[syncUserToDb] Auth UID:', user.id);

  const payload = {
    id: user.id,
    email: user.email,
    name: user.user_metadata?.full_name ?? '',
    updatedAt: new Date().toISOString(), // Set manually for accurate tracking
  };

  console.log('[syncUserToDb] Payload:', payload);

  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/users`, {
    method: 'POST',
    headers: {
      apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
      Authorization: `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates',
    },
    body: JSON.stringify(payload),
  });

  let data;
  try {
    data = await response.json(); // This was likely failing earlier
  } catch (e) {
    console.error('[syncUserToDb] Failed to parse JSON:', e);
    return null;
  }

  if (!response.ok) {
    console.error('[syncUserToDb] Fetch error:', data);
    return null;
  }

  console.log('[syncUserToDb] Upsert result:', data);
  return user;
};
