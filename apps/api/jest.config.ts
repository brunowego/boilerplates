import { pathsToModuleNameMapper, type JestConfigWithTsJest } from 'ts-jest'
import tsconfig from './tsconfig.json'

export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  roots: ['<rootDir>/src'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '<rootDir>/coverage',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
} satisfies JestConfigWithTsJest
