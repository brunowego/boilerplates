import type { ComponentConfig } from '@measured/puck'

type HowItWorksBlockProps = {
  title: string
  description: string
}

export const HowItWorksBlock: ComponentConfig<HowItWorksBlockProps> = {
  label: 'How It Works',
  fields: {
    title: {
      type: 'text',
    },
    description: {
      type: 'textarea',
    },
  },
  defaultProps: {
    title: 'How does it work?',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.',
  },
  render: ({ title, description }) => {
    return (
      <section className='py-10 lg:py-24 sm:py-16'>
        <div className='mx-auto max-w-7xl px-4 lg:px-8 sm:px-6'>
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className='font-bold text-3xl text-black leading-tight lg:text-5xl sm:text-4xl'>
              {title}
            </h2>

            <p className='mx-auto mt-4 max-w-lg text-base text-gray-600 leading-relaxed'>
              {description}
            </p>
          </div>

          <div className='relative mt-12 lg:mt-20'>
            <div className='absolute inset-x-0 top-2 hidden md:block lg:px-28 md:px-20 xl:px-44'>
              <img
                className='w-full'
                src='https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg'
                alt=''
              />
            </div>

            <div className='relative grid grid-cols-1 gap-x-12 gap-y-12 text-center md:grid-cols-3'>
              <div>
                <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-200 bg-white shadow'>
                  <span className='font-semibold text-gray-700 text-xl'>1</span>
                </div>

                <h3 className='mt-6 font-semibold text-black text-xl leading-tight md:mt-10'>
                  Create a free account
                </h3>

                <p className='mt-4 text-base text-gray-600'>
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit.
                </p>
              </div>

              <div>
                <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-200 bg-white shadow'>
                  <span className='font-semibold text-gray-700 text-xl'>2</span>
                </div>

                <h3 className='mt-6 font-semibold text-black text-xl leading-tight md:mt-10'>
                  Build your website
                </h3>

                <p className='mt-4 text-base text-gray-600'>
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit.
                </p>
              </div>

              <div>
                <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-200 bg-white shadow'>
                  <span className='font-semibold text-gray-700 text-xl'>3</span>
                </div>

                <h3 className='mt-6 font-semibold text-black text-xl leading-tight md:mt-10'>
                  Release &amp; Launch
                </h3>

                <p className='mt-4 text-base text-gray-600'>
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  },
}
