const request = require('supertest');
const app = require('../src/app');

jest.mock('jsonwebtoken');
const jwt = require('jsonwebtoken');

describe('GET /protected', () => {
  const validToken = 'valid.token.here';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should allow access with valid token', async () => {
    jwt.verify.mockImplementation(() => ({ userId: 123 }));

    const res = await request(app)
      .get('/protected') // Replace with your actual protected route
      .set('Authorization', `Bearer ${validToken}`);

    expect(res.statusCode).toBe(200);
  });

  it('should deny access with invalid token', async () => {
    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    const res = await request(app)
      .get('/protected')
      .set('Authorization', `Bearer invalidtoken`);

    expect(res.statusCode).toBe(403); // or 401 based on your middleware
  });

  it('should deny access with no token', async () => {
    const res = await request(app).get('/protected');
    expect(res.statusCode).toBe(401);
  });
});
