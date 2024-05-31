
  <div className='lg:-translate-x-1/2 -translate-y-1/2 absolute top-1/2 z-50 grid transform rounded-xl bg-secondary lg:left-1/2 max-lg:mx-14 lg:w-full md:max-w-4xl xl:max-w-5xl lg:grid-cols-5'>
    <div className='col-span-2 p-8 lg:px-9'>
      <h3 className='mb-4 font-medium text-2xl'>Try Acme Pro for free</h3>

      <p className='mb-4'>
        More productivity. More power. Try our most-loved features, free for 30
        days.
      </p>

      <p className='mb-4'>
        <strong>Here's what you get with Acme Pro.</strong>
      </p>

      <ul className='mb-4 space-y-4'>
        <li className='flex space-x-3'>
          <Image className='size-6 shrink-0' />

          <p>
            <strong>100 million+ premium photos, videos and elements,</strong>{' '}
            3,000+ premium fonts, 610,000+ premium templates
          </p>
        </li>

        <li className='flex space-x-3'>
          <Palette className='size-6 shrink-0' />

          <p>
            Create with ease thanks to{' '}
            <strong>Resize &amp; Magic Switch, Background Remover</strong> and{' '}
            <strong>premium animations</strong>
          </p>
        </li>

        <li className='flex space-x-3'>
          <FolderClosed className='size-6 shrink-0' />

          <p>
            Stay organized with <strong>Brand Kits, Content Planner</strong> and{' '}
            <strong>1 TB storage</strong>
          </p>
        </li>
      </ul>

      <p className='mb-16'>
        <strong>Cancel anytime.</strong> Well remind you 7 days before your
        trial ends.
      </p>

      <Button className='w-full' disabled size='lg'>
        Start my free trial
      </Button>
    </div>

    <div
      className='col-span-3 rounded-r-[inherit] bg-border bg-center bg-contain bg-no-repeat'
      style={{ backgroundImage: 'url("/static/img/bg-modal.png")' }}
    />

    <button
      className='-right-2 absolute translate-x-full rounded-full bg-secondary p-2'
      type='button'
    >
      <X className='size-5' />
    </button>
  </div>
  <div className='lg:-translate-x-1/2 -translate-y-1/2 absolute top-1/2 z-50 grid transform rounded-xl bg-secondary lg:left-1/2 max-lg:mx-14 lg:w-full md:max-w-4xl xl:max-w-5xl lg:grid-cols-2'>
    <div className='p-8 lg:px-9'>
      <h3 className='mb-4 font-medium text-2xl'>Try Acme Pro for free</h3>

      <ul className='mb-8 space-y-2 text-sm'>
        <li className='flex space-x-2'>
          <Check className='size-4 shrink-0 text-green-500' />

          <p>Free 30 day trial, cancel any time</p>
        </li>

        <li className='flex space-x-2'>
          <Check className='size-4 shrink-0 text-green-500' />

          <p>We'll remind you before your trial ends</p>
        </li>
      </ul>

      <RadioGroup className='mb-4' defaultValue='free-domain'>
        {publishOptions.map(({ value, title, description, recommended }) => (
          <Label className='relative cursor-pointer flex-col items-start rounded-lg border p-3 checked:border-foreground hover:border-foreground lg:px-4'>
            <RadioGroupItem className='sr-only' value={value} />

            {recommended && (
              <div className='-top-2.5 absolute left-4 rounded-full border bg-background px-2 text-xs leading-5'>
                Recommended
              </div>
            )}

            <h3 className='text-base text-semibold leading-8'>{title}</h3>

            <div className='text-muted-foreground text-xs leading-5'>
              {description}
            </div>
          </Label>
        ))}
      </RadioGroup>

      <table className='mb-4 w-full text-sm leading-7'>
        <tbody>
          <tr className='text-muted-foreground'>
            <td>Yearly total (12 month installments)</td>
            <td className='text-right'>R$ 290</td>
          </tr>

          <tr className='text-muted-foreground'>
            <td>First installment due June 29, 2024</td>
            <td className='text-right'>R$ 24,16</td>
          </tr>

          <tr className='font-medium'>
            <td>
              Due today <span>(30 days free)</span>
            </td>
            <td className='text-right'>R$ 0</td>
          </tr>
        </tbody>
      </table>

      <Button className='mb-6 w-full' disabled size='lg'>
        Next
      </Button>

      <p className='text-sm leading-6'>
        By continuing, you agree to the{' '}
        <Link className='underline underline-offset-2' href='/'>
          Terms of Use
        </Link>{' '}
        applicable to Acme Pro and confirm you have read our{' '}
        <Link className='underline underline-offset-2' href='/'>
          Privacy Policy
        </Link>
        .
      </p>
    </div>

    <div
      className='rounded-r-[inherit] bg-border bg-center bg-contain bg-no-repeat'
      style={{ backgroundImage: 'url("/static/img/bg-modal.png")' }}
    />

    <button
      className='-right-2 absolute translate-x-full rounded-full bg-secondary p-2'
      type='button'
    >
      <X className='size-5' />
    </button>
  </div>

