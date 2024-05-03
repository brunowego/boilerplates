declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'test' | 'production'

    GITHUB_CLIENT_ID: string
    GITHUB_CLIENT_SECRET: string

    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string
    GOOGLE_REDIRECT_URI: string

    LINKEDIN_CLIENT_ID: string
    LINKEDIN_CLIENT_SECRET: string
    LINKEDIN_REDIRECT_URI: string
  }
}
