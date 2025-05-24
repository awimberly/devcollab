import { Router, Request, Response } from 'express';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  res.status(200).json({ message: 'It works' });
});

export default router;
