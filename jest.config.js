module.exports = {
  roots: ['<rootDir>/tests', '<rootDir>/src'],
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  testEnvironment: 'node',
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1'
  },
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/main/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  watchPathIgnorePatterns: ['globalConfig']
}
