module.exports = {
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/interfaces/**/*.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/*.adapter.ts',
    '!<rootDir>/src/**/*.helper.ts',
    '!<rootDir>/src/**/module-alias.ts',
    '!<rootDir>/src/**/routes.ts',
    '!<rootDir>/src/**/probes/*.ts',
    '!<rootDir>/src/**/*.factory.ts'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  moduleNameMapper: {
    '@/(.+)': '<rootDir>/src/$1'
  },
  testMatch: ['**/*.spec.ts'],
  roots: [
    '<rootDir>/src',
  ],
  transform: {
    '\\.ts$': 'ts-jest'
  },
  clearMocks: true,
}

process.env = Object.assign(process.env, {
  APPROVED_PAYMENT_QUEUE: 'mock_value',
  UPDATE_ORDER_QUEUE: 'mock_value',
  CANCEL_ORDER_QUEUE: 'mock_value'
});
