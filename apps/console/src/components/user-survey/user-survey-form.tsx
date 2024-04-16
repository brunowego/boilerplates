import { useContext, useState } from 'react'

// import useMediaQuery from '@acme/ui/hooks/use-media-query'
import { RadioGroup, RadioGroupItem } from '@acme/ui/components/radio-group'
import Button from '@acme/ui/components/button'
import Label from '@acme/ui/components/label'
import Icon from '@acme/ui/components/icon'
import Logo from '@acme/ui/components/logo'
import LogoMark from '@acme/ui/components/logo-mark'
import cn from '@acme/ui/lib/cn'
import Input from '@acme/ui/components/input'

import { UserSurveyContext } from './user-survey-popup-inner'

type Option = {
  value: string
  label: string
  icon?: keyof typeof LogoMark
}

const options = [
  {
    value: 'twitter',
    label: 'Twitter/X',
    icon: 'x',
  },
  {
    value: 'linkedin',
    label: 'LinkedIn',
    icon: 'linkedin',
  },
  {
    value: 'product-hunt',
    label: 'Product Hunt',
    icon: 'producthunt',
  },
  {
    value: 'google',
    label: 'Google',
    icon: 'google',
  },
  {
    value: 'github',
    label: 'GitHub',
    icon: 'github',
  },
  {
    value: 'other',
    label: 'Other',
  },
] as Option[]

export default function SurveyForm({
  onSubmit,
}: {
  onSubmit: (source: string) => void
}) {
  // const { isMobile } = useMediaQuery()

  const [source, setSource] = useState<string | undefined>(undefined)
  const [otherSource, setOtherSource] = useState<string | undefined>(undefined)

  const { status } = useContext(UserSurveyContext)

  return (
    <div className='flex flex-col space-y-4'>
      <Logo.mark className='size-10' />

      <p className='text-muted-foreground text-sm'>
        Where did you hear about Acme?
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault()

          if (source) {
            onSubmit(source === 'other' ? otherSource ?? source : source)
          }
        }}
      >
        <RadioGroup
          name='source'
          required
          value={source}
          onValueChange={(value) => {
            setSource(value)
          }}
          className='grid grid-cols-2 gap-3'
        >
          {options.map(({ value, label, icon }) => {
            const Ikon = icon ? LogoMark[icon] : Icon.globe

            return (
              <div
                key={value}
                className={cn(
                  'group flex flex-col rounded-md border transition-colors',
                  source === value ? 'border-foreground' : null,
                )}
              >
                <RadioGroupItem value={value} id={value} className='hidden' />

                <Label
                  htmlFor={value}
                  className='flex h-full cursor-pointer select-none items-center space-x-4 px-4 py-2 text-muted-foreground'
                >
                  <Ikon
                    className={cn(
                      'size-5 transition-all group-hover:grayscale-0',
                      {
                        grayscale: source !== value,
                        'text-muted-foreground': value === 'other',
                      },
                    )}
                  />

                  <p>{label}</p>

                  {value === 'other' && (
                    <div className='flex grow justify-end'>
                      <Icon.chevronRight
                        className={cn(
                          'size-4 transition-transform',
                          source === value && 'rotate-90',
                        )}
                      />
                    </div>
                  )}
                </Label>
              </div>
            )
          })}
        </RadioGroup>

        {source === 'other' && (
          <div className='mt-3'>
            <label>
              <div className='mt-2 flex rounded-md shadow-sm'>
                <Input
                  autoComplete='off'
                  // autoFocus={!isMobile}
                  maxLength={32}
                  onChange={(e) => setOtherSource(e.target.value)}
                  placeholder='Reddit, Indie Hackers, etc.'
                  required
                  type='text'
                  value={otherSource}
                />
              </div>
            </label>
          </div>
        )}

        {source !== undefined && (
          <Button
            className='mt-4 h-9 w-full'
            disabled={
              status === 'success' ||
              !source.length ||
              (source === 'other' && !otherSource)
            }
            // loading={status === 'loading'}
            type='submit'
          >
            Submit
          </Button>
        )}
      </form>
    </div>
  )
}
