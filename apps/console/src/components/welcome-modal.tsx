'use client'

import { useState } from 'react'
// import Logo from '../assets/svg/otelbin_logo_white.svg'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  Button,
  cn,
} from '@acme/ui'

import { welcomeSteps } from '@/data'

function StepDiv({
  activeStep,
  isClickable,
  handleClick,
  handleKeyDown,
}: {
  activeStep: boolean
  isClickable: boolean
  handleClick: () => void
  handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void
}) {
  return (
    <div
      className={cn(
        'w-2.5 h-2.5 rounded-full',
        activeStep ? 'w-7 bg-zinc-500' : 'bg-zinc-300',
        isClickable ? 'cursor-pointer hover:bg-zinc-400' : 'cursor-default',
      )}
      onClick={isClickable ? handleClick : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
    />
  )
}

export function WelcomeModal({
  open,
  setOpen,
}: { open: boolean; setOpen: (open: boolean) => void }) {
  const [step, setStep] = useState(0)

  function handleNext() {
    if (step <= welcomeSteps.length - 2) {
      setStep(step + 1)
    } else {
      closeAndStore()
    }
  }

  function handleSkip() {
    closeAndStore()
  }

  function closeAndStore() {
    setOpen(false)
    setStep(0)
    localStorage.setItem('welcome', '0')
  }

  return (
    <Dialog open={open} onOpenChange={handleSkip}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>OTelBin</DialogTitle>
        </DialogHeader>

        <Image
          src={welcomeSteps[step]?.image || ''}
          alt='Welcome Modal Slide Image'
          quality={100}
          className='rounded-md border'
        />

        <DialogTitle>{welcomeSteps[step]?.title}</DialogTitle>

        <DialogDescription>{welcomeSteps[step]?.description}</DialogDescription>

        <DialogFooter>
          <div className='flex gap-x-1 items-center mr-auto'>
            {Array.from({ length: welcomeSteps.length }, (_, index) => (
              <StepDiv
                // biome-ignore lint/suspicious/noArrayIndexKey: This is a static array
                key={index}
                activeStep={index === step}
                isClickable={index < step}
                handleClick={() => setStep(index)}
                handleKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                  e.key === 'Enter' && setStep(index)
                  setStep(index)
                }}
              />
            ))}
          </div>

          {step <= welcomeSteps.length - 2 ? (
            <Button onClick={handleSkip} size='sm' variant='outline'>
              Skip
            </Button>
          ) : null}

          <Button
            autoFocus={true}
            onClick={handleNext}
            size='sm'
            variant='secondary'
          >
            {step <= welcomeSteps.length - 2 ? 'Next' : 'Done'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
