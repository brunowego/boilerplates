'use client'

import { PropsWithChildren } from 'react'

import { trpc } from '@/lib/trpc'

const Component = ({ children }: PropsWithChildren) => children

export const TrpcProvider = trpc.withTRPC(Component) as typeof Component
