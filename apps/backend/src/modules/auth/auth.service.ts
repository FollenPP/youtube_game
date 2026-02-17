import type { User } from '@prisma/client';
import { prisma } from '../../config/prisma.js';
import type { LoginInput, RegisterInput } from './auth.schema.js';
import { hashPassword, verifyPassword } from '../../utils/password.js';

export class AuthError extends Error {
  constructor(message: string, public readonly statusCode: number) {
    super(message);
    this.name = 'AuthError';
  }
}

const toSafeUser = (user: User) => ({
  id: user.id,
  email: user.email,
  username: user.username,
  createdAt: user.createdAt
});

export const registerUser = async (input: RegisterInput) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: input.email }, { username: input.username }]
    }
  });

  if (existingUser) {
    throw new AuthError('Email or username already exists.', 409);
  }

  const passwordHash = await hashPassword(input.password);

  const user = await prisma.user.create({
    data: {
      email: input.email,
      username: input.username,
      passwordHash,
      gameProfile: {
        create: {
          totalXp: 0,
          level: 1,
          streakDays: 0
        }
      }
    }
  });

  return toSafeUser(user);
};

export const loginUser = async (input: LoginInput) => {
  const user = await prisma.user.findUnique({ where: { email: input.email } });

  if (!user) {
    throw new AuthError('Invalid email or password.', 401);
  }

  const isValidPassword = await verifyPassword(input.password, user.passwordHash);

  if (!isValidPassword) {
    throw new AuthError('Invalid email or password.', 401);
  }

  return toSafeUser(user);
};

export const getUserProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new AuthError('User not found.', 404);
  }

  return toSafeUser(user);
};
