import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cn,
  Skeleton,
} from '@acme/ui'

type GeneralSkeletonProps = {
  className?: string
}

export default function GeneralSkeleton({
  className,
}: GeneralSkeletonProps): JSX.Element {
  return (
    <Card aria-hidden={true} className={cn('max-w-2xl', className)}>
      <CardHeader>
        <CardTitle>
          <Skeleton className='w-32 h-6 rounded-full' />
        </CardTitle>

        <CardDescription>
          <Skeleton className='w-64 h-5 rounded-full' />
        </CardDescription>
      </CardHeader>

      <div className='grid space-y-2'>
        <CardContent>
          <div className='grid grid-cols-2 gap-x-4'>
            <div className='space-y-2'>
              <Skeleton className='w-32 h-5 rounded-full' />
              <Skeleton className='w-full h-12 rounded-sm' />
            </div>

            <div className='space-y-2'>
              <Skeleton className='w-32 h-5 rounded-full' />
              <Skeleton className='w-full h-12 rounded-sm' />
            </div>
          </div>
        </CardContent>

        <CardFooter className='flex justify-end'>
          <Skeleton className='w-40 h-11 rounded-sm' />
        </CardFooter>
      </div>
    </Card>
  )
}
