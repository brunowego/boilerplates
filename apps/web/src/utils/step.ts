import { UserOnboardingStep } from '@acme/db/schema'

export type StepProps = {
  control: {
    // isFirst: boolean
    // isLast: boolean
    prev: UserOnboardingStep | undefined
    next: UserOnboardingStep | undefined
  }
}

export const steps = Object.values(UserOnboardingStep)
