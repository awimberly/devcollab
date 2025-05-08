import request from 'supertest';
import app from '../src/app';
import prisma from '../src/lib/prisma';
import bcrypt from 'bcryptjs';

jest.mock('../src/lib/prisma', () => ({
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
}));

jest.mock('bcryptjs', () => ({
    hash: jest.fn(),
    compare: jest.fn(),
}));

describe('POST /register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user and return 201', async () => {
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword123');
    (prisma.user.create as jest.Mock).mockResolvedValue({
      id: 2,
      email: 'test@example.com',
    });

    const res = await request(app).post('/api/auth/register').send({
      email: 'test@example.com',
      password: 'Test@1234',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe('test@example.com');
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        email: 'test@example.com',
        password: 'hashedpassword123',
      },
    });
  });

  it('should return 400 if email or password is missing', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: '',
      password: '',
    });

    expect(res.statusCode).toBe(400);
  });
});
