import type { JestConfigWithTsJest } from 'ts-jest'

import defaultJestConfig from '../jest.config'

export default {
  ...defaultJestConfig,
  rootDir: '../',
  roots: ['<rootDir>/test'],
  testRegex: '.*\\.e2e-spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '<rootDir>/coverage/e2e',
} satisfies JestConfigWithTsJest
