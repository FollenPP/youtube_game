import type { Request, Response } from 'express';
import { signAuthToken } from '../../utils/jwt.js';
import { loginSchema, registerSchema } from './auth.schema.js';
import { AuthError, getUserProfile, loginUser, registerUser } from './auth.service.js';

export const registerHandler = async (req: Request, res: Response): Promise<void> => {
  const payload = registerSchema.parse(req.body);

  try {
    const user = await registerUser(payload);
    const token = signAuthToken({ userId: user.id, email: user.email });

    res.status(201).json({ user, token });
  } catch (error) {
    if (error instanceof AuthError) {
      res.status(error.statusCode).json({ message: error.message });
      return;
    }

    throw error;
  }
};

export const loginHandler = async (req: Request, res: Response): Promise<void> => {
  const payload = loginSchema.parse(req.body);

  try {
    const user = await loginUser(payload);
    const token = signAuthToken({ userId: user.id, email: user.email });

    res.status(200).json({ user, token });
  } catch (error) {
    if (error instanceof AuthError) {
      res.status(error.statusCode).json({ message: error.message });
      return;
    }

    throw error;
  }
};

export const meHandler = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized.' });
    return;
  }

  try {
    const user = await getUserProfile(req.user.userId);
    res.status(200).json({ user });
  } catch (error) {
    if (error instanceof AuthError) {
      res.status(error.statusCode).json({ message: error.message });
      return;
    }

    throw error;
  }
};
