import React from 'react'
import { absoluteUrl } from '@acme/utils'

import {
  Button as UnstyledButton,
  ButtonProps,
  Heading as UnstyledHeading,
  Link as UnstyledLink,
  LinkProps,
  Section as UnstyledSection,
  SectionProps,
  Text as UnstyledText,
  TextProps,
} from '@react-email/components'

import clsx from 'clsx'

interface DomainButtonProps {
  path: string
}

export const Text = (props: TextProps & { light?: boolean; small?: boolean }) => {
  const { light, small, className, ...forwardProps } = props

  return (
    <UnstyledText
      {...forwardProps}
      className={clsx(
        'my-4 font-sans ',
        { 'text-base': !small, 'text-sm': small },
        { 'text-slate-800': !light, 'text-slate-500': light },
        className
      )}
    />
  )
}

export const DomainLink = ({ path = '' }) => {
  return <Link href={absoluteUrl(path)}>{absoluteUrl(path)}</Link>
}

export const DomainButton = ({
  path = '',
  children,
}: React.PropsWithChildren<DomainButtonProps>) => {
  return <Button href={absoluteUrl(path)}>{children}</Button>
}

export const Button = (props: ButtonProps) => {
  return (
    <UnstyledButton
      {...props}
      className={clsx('bg-primary-600 rounded px-3 py-2 font-sans text-white', props.className)}
    />
  )
}

export const Link = (props: LinkProps) => {
  return <UnstyledLink {...props} className={clsx('text-primary-600', props.className)} />
}

export const Heading = (props: React.ComponentProps<typeof UnstyledHeading>) => {
  const { as = 'h3' } = props

  return (
    <UnstyledHeading
      {...props}
      as={as}
      className={clsx('mt-4 mb-2 font-sans font-semibold text-slate-800', props.className)}
    />
  )
}

export const SubHeadingText = (props: TextProps) => {
  const { className, ...forwardProps } = props

  return (
    <UnstyledText
      {...forwardProps}
      className={clsx('mb-4 mt-2 font-sans text-base  text-slate-800', className)}
    />
  )
}

export const Section = (props: SectionProps) => {
  const { className, ...forwardProps } = props

  return <UnstyledSection {...forwardProps} className={clsx('my-4', className)} />
}

export const SmallText = (props: TextProps) => {
  return (
    <UnstyledText
      {...props}
      className={clsx('font-sans text-sm text-slate-500', props.className)}
    />
  )
}

export const Card = (props: SectionProps) => {
  return <Section {...props} className={clsx('rounded bg-gray-50 px-4', props.className)} />
}
