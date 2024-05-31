import type { JSX } from 'react'
import Link from 'next/link'

import type { InsertDomain } from '@acme/db'
import { Card, CardHeader, CardTitle } from '@acme/ui/components/card'
import cn from '@acme/ui/utils/cn'
import {
  CircleAlert,
  CircleCheckBig,
  CircleX,
  EllipsisVertical,
  ExternalLink,
  FilePenLine,
  QrCode,
  FolderSync,
  Archive,
  Trash2,
  Loader2,
} from '@acme/ui/components/icon'
import Badge from '@acme/ui/components/badge'
import Button from '@acme/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@acme/ui/components/dropdown-menu'

import { useVerifyDomain } from '@/hooks/api/use-domains'

import { useDeleteDomainModal } from '../hooks/use-delete-domain-modal'
import DomainConfiguration from './domain-configuration'

type DomainCardProps = InsertDomain & {
  className?: string
}

export default function DomainCard({
  id,
  domain,
  primary,
  className,
}: DomainCardProps): JSX.Element {
  const { data, isFetching, refetch } = useVerifyDomain({ domain })

  const { setShowDeleteDomainModal, DeleteDomainModal } = useDeleteDomainModal({
    // @ts-ignore
    props: { id, domain },
  })

  return (
    <>
      <Card className={cn('min-h-24', className)}>
        <CardHeader>
          <div className='flex justify-between'>
            <CardTitle className='flex items-center space-x-2'>
              <Link
                className='flex items-center space-x-2'
                href={`http://${domain}`}
                rel='noreferrer'
                target='_blank'
              >
                <span className='flex items-center font-medium text-lg'>
                  {domain}
                </span>

                <ExternalLink className='size-4' />
              </Link>

              {primary ? (
                <Badge className='rounded-full' variant='outline'>
                  Primary domain
                </Badge>
              ) : null}
            </CardTitle>

            <div className='flex space-x-2'>
              <Button
                className='gap-x-1.5'
                onClick={() => refetch()}
                size='sm'
                variant='ghost'
              >
                {isFetching ? (
                  <Loader2 className='size-4 animate-spin' />
                ) : null}

                <span>Refresh</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className='!px-1.5' size='sm' variant='ghost'>
                    <EllipsisVertical className='size-5' />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align='end'>
                  <DropdownMenuItem asChild>
                    <button className='w-full space-x-2' disabled type='button'>
                      <FilePenLine className='size-4' />

                      <span>Edit</span>
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <button className='w-full space-x-2' disabled type='button'>
                      <QrCode className='size-4' />

                      <span>QR Code</span>
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <button className='w-full space-x-2' disabled type='button'>
                      <FolderSync className='size-4' />

                      <span>Transfer</span>
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <button className='w-full space-x-2' disabled type='button'>
                      <Archive className='size-4' />

                      <span>Archive</span>
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <button
                      className='w-full space-x-2'
                      onClick={() => setShowDeleteDomainModal(true)}
                      type='button'
                    >
                      <Trash2 className='size-4' />

                      <span>Delete</span>
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className='flex space-x-4 text-sm'>
            <div className='flex items-center space-x-2'>
              {data ? (
                data.status === 'Valid Configuration' ? (
                  <CircleCheckBig className='size-5 text-blue-500' />
                ) : data.status === 'Pending Verification' ? (
                  <CircleAlert className='size-5 text-yellow-500' />
                ) : (
                  <CircleX className='size-5 text-red-500' />
                )
              ) : (
                <Loader2 className='size-5 animate-spin' />
              )}

              <p className='text-muted-foreground'>
                {data ? data.status : 'Checking Domain Status'}
              </p>
            </div>

            {/* <div className='flex items-center space-x-2'>
              {target ? (
                <CheckCircleFill className='h-6 w-6 text-blue-500' />
              ) : (
                <XCircleFill className='h-6 w-6 text-gray-400' />
              )}
              <div className='flex space-x-1'>
                <p className='text-sm text-gray-500'>
                  {target ? `${capitalize(type)}s to` : `No ${type} configured`}
                </p>
                {target && (
                  <a
                    href={target}
                    target='_blank'
                    rel='noreferrer'
                    className='text-sm font-medium text-gray-600 underline-offset-4 hover:underline'
                  >
                    {truncate(
                      target.replace(/^(?:https?:\/\/)?(?:www\.)?/i, ''),
                      24,
                    )}
                  </a>
                )}
              </div>
            </div> */}
          </div>
        </CardHeader>

        {data && data.status !== 'Valid Configuration' && (
          <DomainConfiguration data={data} />
        )}
      </Card>

      <DeleteDomainModal />
    </>
  )
}
