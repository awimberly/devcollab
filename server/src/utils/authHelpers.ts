import { Request } from 'express';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function getAuthenticatedUser(req: Request) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error('Authorization header missing');
  }

  const token = authHeader.split(' ')[1];
  const { data: userData, error } = await supabase.auth.getUser(token);

  if (error || !userData?.user) {
    throw new Error('Invalid or expired token');
  }

  return userData.user;
}
