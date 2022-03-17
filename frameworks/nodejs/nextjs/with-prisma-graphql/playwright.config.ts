import { PlaywrightTestConfig } from '@playwright/test'
import path from 'path'

const playwrightConfig: PlaywrightTestConfig = {
  testDir: './test',
  webServer: {
    command: 'yarn dev',
    port: 3000,
    timeout: 30 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  reporter: [['list'], ['html', { outputFolder: path.join(__dirname, 'test', 'report') }]],
  use: {
    baseURL: 'http://localhost:3000',
  },
}

export default playwrightConfig
