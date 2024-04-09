import { Avatar, AvatarFallback, AvatarImage } from '@acme/ui'

export default function RecentSales() {
  return (
    <div className='space-y-8'>
      <div className='flex items-center'>
        <Avatar className='w-9 h-9'>
          <AvatarImage
            src='https://avatar.vercel.sh/olivia-martin.png'
            alt='Olivia Martin'
            className='grayscale'
          />

          <AvatarFallback>OM</AvatarFallback>
        </Avatar>

        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>Olivia Martin</p>

          <p className='text-sm text-muted-foreground'>
            olivia.martin@email.com
          </p>
        </div>

        <div className='ml-auto font-medium'>+$1,999.00</div>
      </div>

      <div className='flex items-center'>
        <Avatar className='flex justify-center items-center space-y-0 w-9 h-9 border'>
          <AvatarImage
            src='https://avatar.vercel.sh/jackson-lee.png'
            alt='Jackson Lee'
            className='grayscale'
          />

          <AvatarFallback>JL</AvatarFallback>
        </Avatar>

        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>Jackson Lee</p>

          <p className='text-sm text-muted-foreground'>jackson.lee@email.com</p>
        </div>

        <div className='ml-auto font-medium'>+$39.00</div>
      </div>

      <div className='flex items-center'>
        <Avatar className='w-9 h-9'>
          <AvatarImage
            src='https://avatar.vercel.sh/isabella-nguyen.png'
            alt='Isabella Nguyen'
            className='grayscale'
          />

          <AvatarFallback>IN</AvatarFallback>
        </Avatar>

        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>Isabella Nguyen</p>

          <p className='text-sm text-muted-foreground'>
            isabella.nguyen@email.com
          </p>
        </div>

        <div className='ml-auto font-medium'>+$299.00</div>
      </div>

      <div className='flex items-center'>
        <Avatar className='w-9 h-9'>
          <AvatarImage
            src='https://avatar.vercel.sh/william-kim.png'
            alt='William Kim'
            className='grayscale'
          />

          <AvatarFallback>WK</AvatarFallback>
        </Avatar>

        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>William Kim</p>

          <p className='text-sm text-muted-foreground'>will@email.com</p>
        </div>

        <div className='ml-auto font-medium'>+$99.00</div>
      </div>

      <div className='flex items-center'>
        <Avatar className='w-9 h-9'>
          <AvatarImage
            src='https://avatar.vercel.sh/sofia-davis.png'
            alt='Sofia Davis'
            className='grayscale'
          />

          <AvatarFallback>SD</AvatarFallback>
        </Avatar>

        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>Sofia Davis</p>

          <p className='text-sm text-muted-foreground'>sofia.davis@email.com</p>
        </div>

        <div className='ml-auto font-medium'>+$39.00</div>
      </div>
    </div>
  )
}
