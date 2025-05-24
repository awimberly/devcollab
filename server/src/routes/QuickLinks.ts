import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { getAuthenticatedUser } from '../utils/authHelpers';

const prisma = new PrismaClient();
const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const user = await getAuthenticatedUser(req);
    const links = await prisma.quickLink.findMany({
      where: { userId: user.id },
    });
    res.json(links);
  } catch (err: any) {
    const message = err?.message || 'Internal server error';
    const status = message.includes('token') || message.includes('Authorization') ? 401 : 500;
    res.status(status).json({ error: message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { label, url } = req.body;

  if (!label || !url) {
    res.status(400).json({ error: 'Label and URL are required' });
    return;
  }

  try {
    const user = await getAuthenticatedUser(req);

    const newLink = await prisma.quickLink.create({
      data: {
        label,
        url,
        userId: user.id,
      },
    });

    res.status(201).json(newLink);
  } catch (err: any) {
    console.error('Error creating quick link:', err);
    const message = err?.message || 'Internal server error';
    const status = message.includes('token') || message.includes('Authorization') ? 401 : 500;
    res.status(status).json({ error: message });
  }
});

export default router;
