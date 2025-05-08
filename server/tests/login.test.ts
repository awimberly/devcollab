import request from 'supertest';
import app from '../src/app';
import prisma from '../src/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

process.env.JWT_SECRET = 'test-secret';

jest.mock('../src/lib/prisma', () => ({
  user: {
    findUnique: jest.fn(),
  },
}));

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('POST /api/auth/login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should login with valid credentials and return token', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      password: 'hashedpassword123',
      name: 'Test User',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue('mock-jwt-token');

    const res = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'Test@1234',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token', 'mock-jwt-token');
    expect(res.body.user.email).toBe('test@example.com');
  });

  it('should return 401 for invalid password', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ password: 'hashed' });
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const res = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'wrongpassword',
    });

    expect(res.statusCode).toBe(401);
  });

  it('should return 401 if user not found', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const res = await request(app).post('/api/auth/login').send({
      email: 'nonexistent@example.com',
      password: 'irrelevant',
    });

    expect(res.statusCode).toBe(401);
  });
});