import { Pizza } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className='container relative hidden min-h-screen flex-col items-center justify-center antialiased md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='relative hidden h-full flex-col border-r border-foreground/5 bg-muted p-10 text-muted-foreground lg:flex dark:border-r'>
        <div className='flex items-center gap-3 text-lg font-medium text-foreground'>
          <Pizza className='h-5 w-5' />

          <span className='font-semibold'>Pizza Shop</span>
        </div>

        <div className='mt-auto'>
          <footer className='text-sm'>
            Partner Dashboard &copy; Pizza Shop - {new Date().getFullYear()}
          </footer>
        </div>
      </div>

      <div className='relative flex min-h-screen flex-col items-center justify-center'>
        <Outlet />
      </div>
    </div>
  )
}
