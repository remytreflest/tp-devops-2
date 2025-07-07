module.exports = {
  getConnection: jest.fn(() => ({
    query: jest.fn(),
    release: jest.fn(),
  })),
};