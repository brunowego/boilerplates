import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  cn,
  Skeleton,
} from '@acme/ui'

type PictureSkeletonProps = {
  className?: string
}

export default function PictureSkeleton({
  className,
}: PictureSkeletonProps): JSX.Element {
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

      <CardContent className='flex space-x-4'>
        <Skeleton className='w-28 h-28 rounded-sm' />

        <div className='mt-4 flex flex-col space-y-1'>
          <Skeleton className='w-72 h-5 rounded-full' />
          <Skeleton className='w-56 h-5 rounded-full' />
        </div>
      </CardContent>
    </Card>
  )
}
