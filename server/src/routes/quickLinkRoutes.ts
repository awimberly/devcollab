import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';

const prisma = new PrismaClient();
const router = Router();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

router.get('/', async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'Authorization header missing' });
    return;
  }

  const token = authHeader.split(' ')[1];
  const { data: userData, error } = await supabase.auth.getUser(token);

  if (error || !userData?.user) {
    res.status(401).json({ error: 'Invalid or expired token' });
    return;
  }

  const userId = userData.user.id;

  try {
    const links = await prisma.quickLink.findMany({
      where: { userId },
    });

    res.json(links); // ✅ no return
  } catch (err) {
    console.error('Error fetching quick links:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


export default router;
