const request = require('supertest');
const express = require('express');
const router = require('../../src/routes/users'); // ou submissions.js selon le nom
const pool = require('../../src/db');

// Mock manuel du pool
jest.mock('../../src/db');

describe('Routes / and /submissions', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use('/', router);
  });

  it('POST / - should insert an email and redirect', async () => {
    const mockConn = {
      query: jest.fn(),
      release: jest.fn(),
    };
    pool.getConnection.mockResolvedValue(mockConn);

    const response = await request(app)
      .post('/')
      .send('email=test@example.com');

    expect(mockConn.query).toHaveBeenCalledWith(
      'INSERT INTO users (email) VALUES (?)',
      ['test@example.com']
    );
    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe('/submissions');
  });

  it('GET /submissions - should return list of emails', async () => {
    const mockConn = {
      query: jest.fn().mockResolvedValue([
        { email: 'test1@example.com' },
        { email: 'test2@example.com' }
      ]),
      release: jest.fn(),
    };
    pool.getConnection.mockResolvedValue(mockConn);

    const response = await request(app).get('/submissions');

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('<li>test1@example.com</li>');
    expect(response.text).toContain('<li>test2@example.com</li>');
  });
});
