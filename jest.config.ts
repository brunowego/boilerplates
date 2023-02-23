import type { Config } from '@jest/types'
import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

/**
 * Config for unit tests
 *
 * @type { import('@jest/types').Config.InitialOptions }
 * @see https://jestjs.io/docs/en/configuration
 */
const baseConfig: Config.InitialOptions = {
  coverageDirectory: '../../coverage',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/../../' }),
  preset: 'ts-jest',
  rootDir: './test/unit',
  testRegex: '.*\\.spec\\.ts$',
  verbose: true,
}

/**
 * Config for e2e tests
 *
 * @type { import('@jest/types').Config.InitialOptions }
 */
const e2eConfig: Config.InitialOptions = {
  ...baseConfig,
  rootDir: './test/e2e',
  testRegex: '.*\\.e2e\\.spec\\.ts$',
}

/**
 * Check if we are running e2e tests
 */
const isE2E = process.env.TEST_ENV === 'e2e'

/**
 * Export config
 */
const config = isE2E ? e2eConfig : baseConfig

export default config
