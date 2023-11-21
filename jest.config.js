module.exports = {
  roots: ['<rootDir>/src', '<rootDir>/e2e'],
  setupFilesAfterEnv: ['<rootDir>/e2e/jest.setup.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
