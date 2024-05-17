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
    '!<rootDir>/src/**/*.factory.ts',
    '!<rootDir>/src/**/aws-sqs*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  coverageReporters: ["text","html"],
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
  SEND_MESSAGE_QUEUE: 'mock_value',
  RECEIVE_MESSAGE_QUEUE: 'mock_value'
});
