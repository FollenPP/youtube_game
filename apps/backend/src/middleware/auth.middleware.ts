import type { NextFunction, Request, Response } from 'express';
import { verifyAuthToken } from '../utils/jwt.js';

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Authorization token is required.' });
    return;
  }

  const token = authHeader.replace('Bearer ', '').trim();

  try {
    req.user = verifyAuthToken(token);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};
