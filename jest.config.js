module.exports = {
  roots: ['<rootDir>/tests', '<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1'
  }
}
