import type { Config } from '@jest/types'
import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

/**
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
 * @type { import('@jest/types').Config.InitialOptions }
 */
const e2eConfig: Config.InitialOptions = {
  ...baseConfig,
  rootDir: './test/e2e',
  testRegex: '.*\\.e2e\\.spec\\.ts$',
}

const isE2E = process.env.TEST_ENV === 'e2e'

const config = isE2E ? e2eConfig : baseConfig

export default config
