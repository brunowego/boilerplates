import { redirect } from 'next/navigation'

import { steps } from '@/utils/step'

export default function OnboardPage(): never {
  return redirect(`/onboard/${steps[0]}`)
}
