// server/jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // ✅ no array, just string
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};

export default config;
