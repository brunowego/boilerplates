export type DomainVerificationStatusProps =
  | 'Valid Configuration'
  | 'Invalid Configuration'
  | 'Conflicting DNS Records'
  | 'Pending Verification'
  | 'Domain Not Found'
  | 'Unknown Error'

export type VerifyDomain = {
  status: DomainVerificationStatusProps
  response: {
    // biome-ignore lint/suspicious/noExplicitAny: This is a generic response object
    configJson: any
    // biome-ignore lint/suspicious/noExplicitAny: This is a generic response object
    domainJson: any
  }
}
