import { notFound, redirect } from 'next/navigation'
import dynamic from 'next/dynamic'

import { steps, type StepProps } from '@/utils/step'
import { auth } from '@/lib/auth'

export default async function StatusPage({
  params: { step },
}: {
  params: {
    step: (typeof steps)[number]
  }
}): Promise<JSX.Element> {
  if (!steps.includes(step)) {
    notFound()
  }

  const session = await auth()

  if (session?.user.onboardingStep !== step) {
    redirect(`/onboard/${session?.user.onboardingStep}`)
  }

  const Step = dynamic<StepProps>(
    () => import(`./components/${step}.tsx`),
    // {
    //   ssr: false,
    // }
  )

  const index = steps.indexOf(step)

  const control = {
    // isFirst: step === steps[0],
    // isLast: step === steps[steps.length - 1],
    prev: steps[index - 1],
    next: steps[index + 1],
  }

  return <Step control={control} />
}
