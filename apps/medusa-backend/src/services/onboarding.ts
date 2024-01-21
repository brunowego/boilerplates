import type { EntityManager } from 'typeorm'
import { IsNull, Not } from 'typeorm'

import { TransactionBaseService } from '@medusajs/medusa'

import type { OnboardingState } from '../models/onboarding'
import type OnboardingRepository from '../repositories/onboarding'
import type { UpdateOnboardingStateInput } from '../types/onboarding'

type InjectedDependencies = {
  manager: EntityManager
  onboardingRepository: typeof OnboardingRepository
}

class OnboardingService extends TransactionBaseService {
  protected onboardingRepository_: typeof OnboardingRepository

  constructor({ onboardingRepository }: InjectedDependencies) {
    // eslint-disable-next-line prefer-rest-params
    super(arguments[0])

    this.onboardingRepository_ = onboardingRepository
  }

  async retrieve(): Promise<OnboardingState | undefined> {
    const onboardingRepo = this.activeManager_.withRepository(
      this.onboardingRepository_,
    )

    const status = await onboardingRepo.findOne({
      where: { id: Not(IsNull()) },
    })

    return status
  }

  async update(data: UpdateOnboardingStateInput): Promise<OnboardingState> {
    return await this.atomicPhase_(
      async (transactionManager: EntityManager) => {
        const onboardingRepository = transactionManager.withRepository(
          this.onboardingRepository_,
        )

        const status = await this.retrieve()

        for (const [key, value] of Object.entries(data)) status[key] = value

        return await onboardingRepository.save(status)
      },
    )
  }
}

export default OnboardingService
