import { useState, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import cn from '@acme/ui/lib/cn'

export default function PasswordStrengthMeter(props: { password: string }) {
  const [zxcvbn, setZxcvbn] = useState<
    typeof import('@acme/ui/lib/zxcvbn') | undefined
  >()

  const [strength, setStrength] = useState<{ label: string; score: number }>()

  const updateStrength = useDebouncedCallback(() => {
    if (!zxcvbn) return

    setStrength(
      props.password ? getPasswordStrength(props.password, zxcvbn) : undefined,
    )
  }, 100)

  // TODO: Remove duplicate in @sd/client
  function getPasswordStrength(
    password: string,
    zxcvbn: typeof import('@acme/ui/lib/zxcvbn'),
  ): { label: string; score: number } {
    const ratings = ['Poor', 'Weak', 'Good', 'Strong', 'Perfect']

    zxcvbn.zxcvbnOptions.setOptions({
      dictionary: {
        ...zxcvbn.languageCommon.dictionary,
        ...zxcvbn.languageEn.dictionary,
      },
      graphs: zxcvbn.languageCommon.adjacencyGraphs,
      translations: zxcvbn.languageEn.translations,
    })

    const result = zxcvbn.zxcvbn(password)
    // biome-ignore lint/style/noNonNullAssertion: This is a temporary fix
    return { label: ratings[result.score]!, score: result.score }
  }

  useEffect(() => {
    let cancelled = false

    import('@acme/ui/lib/zxcvbn').then((zxcvbn) => {
      if (cancelled) return
      setZxcvbn(zxcvbn)
    })

    return () => {
      cancelled = true
    }
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: This is a temporary fix
  useEffect(() => updateStrength(), [props.password, updateStrength])

  return (
    <div className='flex grow items-center justify-end'>
      {strength && (
        <span
          className={cn(
            'mr-2 text-xs transition-[color]',
            strength.score === 0 && 'text-red-500 dark:text-red-400',
            strength.score === 1 && 'text-red-500 dark:text-red-400',
            strength.score === 2 && 'text-amber-400 dark:text-amber-300',
            strength.score === 3 && 'text-lime-500 dark:text-lime-400',
            strength.score === 4 && 'text-green-500 dark:text-green-400',
          )}
        >
          {strength.label}
        </span>
      )}

      <div className={cn('h-[6px] w-1/4 rounded-full bg-border')}>
        {strength && (
          <div
            className={cn(
              'h-full rounded-full transition-[width]',
              strength.score === 0 && 'bg-red-500 dark:bg-red-400',
              strength.score === 1 && 'bg-red-500 dark:bg-red-400',
              strength.score === 2 && 'bg-amber-400 dark:bg-amber-300',
              strength.score === 3 && 'bg-lime-500 dark:bg-lime-400',
              strength.score === 4 && 'bg-green-500 dark:bg-green-400',
            )}
            style={{
              width: `${strength.score !== 0 ? strength.score * 25 : 12.5}%`,
            }}
          />
        )}
      </div>
    </div>
  )
}
