import { typographyVariants } from '@acme/ui/components/typography'
// import Button from '@acme/ui/components/button'

export default function VerifyRequest() {
  return (
    <>
      <div className='flex flex-col space-y-4'>
        <h1
          className={typographyVariants({
            className:
              'dark:bg-gradient-to-r dark:from-primary dark:via-lime-300 dark:to-lime-400 dark:bg-clip-text dark:text-transparent',
            variant: 'h1',
          })}
        >
          Check your email.
        </h1>

        <p className={typographyVariants({ size: 'xl', variant: 'muted' })}>
          We've sent an email to you with a link to sign in. Click the link in
          the email to complete the sign-in process.
        </p>
      </div>

      {/* <Button onClick={() => close()} size='lg'>
        Click here to close this tab
      </Button> */}
    </>
  )
}
