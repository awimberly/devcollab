import { Router, Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/verifyToken';
import { verifyToken } from '../middleware/verifyToken'; 
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

router.get('/', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user as { id: string };

  try {
    const links = await prisma.quickLink.findMany({
      where: {
        userId: user?.id ? parseInt(user.id) : 0,
      },
    });

    res.json(links);
  } catch (err) {
    console.error('Error fetching quick links:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
