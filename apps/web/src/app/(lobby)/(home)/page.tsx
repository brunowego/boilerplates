import { type JSX, Fragment } from 'react'

import { cn, typographyVariants } from '@acme/ui'

const roadmap = [
  {
    done: true,
    date: 'Q1 2024',
    title: 'Big Bang',
    features: [
      {
        title: 'File discovery',
        description:
          'Scan devices, drives and cloud accounts to build a directory of all files with metadata.',
      },
      {
        title: 'Preview generation',
        description:
          'Auto generate lower resolution stand-ins for image and video.',
      },
      {
        title: 'Statistics',
        description:
          'Total capacity, index size, preview media size, free space etc.',
      },
      {
        title: 'Jobs',
        description:
          'Tasks to be performed via a queue system with multi-threaded workers, such as indexing, identifying, generating preview media and moving files. With a Job Manager interface for tracking progress, pausing and restarting jobs.',
      },
      {
        title: 'Explorer',
        description:
          'Browse online/offline storage locations, view files with metadata, perform basic CRUD.',
      },
      {
        title: 'Self hosting',
        description:
          'Spacedrive can be deployed as a service via Docker, behaving as just another device powering your personal cloud.',
      },
      {
        title: 'Tags',
        description:
          'Define routines on custom tags to automate workflows, easily tag files individually, in bulk and automatically via rules.',
      },
      {
        title: 'Search',
        description:
          'Instantly search your library, including offline locations. Use advanced filters to refine and save searches for later.',
      },
      {
        title: 'Quick View',
        description:
          'View images, videos and documents in a full screen modal with nested inspector and context switcher.',
      },
      {
        title: 'Media View',
        description:
          'Turn any directory into a camera roll including media from subdirectories',
      },
      {
        title: 'Spacedrop',
        description:
          'Drop files between devices and contacts on a keybind like AirDrop.',
      },
      {
        title: 'AI labeling for images',
        description:
          'Automatically label images with objects, with a model loader to support future models and upgrading to more powerful models for various jobs.',
      },
      {
        title: 'Drag & drop',
        description: 'Drag and drop files between devices and drives.',
      },
    ],
  },
  {
    current: true,
    date: 'March 2024',
    title: '0.2 Alpha',
    features: [
      {
        title: 'Column View',
        description:
          'View files in the beloved column layout with a nested inspector, with trees!.',
      },
      {
        title: 'Command Palette',
        description:
          'Quickly navigate to any file or folder from anywhere in the app, along with AI search!',
      },
      {
        title: 'File converter',
        description:
          'Convert image and video between common formats from the context menu.',
      },
      {
        title: 'Folder sync',
        description:
          'Configure replication or bidirectional sync between folders on any device or drive.',
      },
      {
        title: 'Advanced media analysis',
        description: 'Transcribe audio, identify faces, video scenes and more.',
      },
    ],
  },
  {
    date: 'Q2 2024',
    title: '0.3 Alpha',
    features: [
      {
        title: 'Connect devices & sync',
        description:
          'Automatically synchronized libraries across all your devices.',
      },
      {
        title: 'Mobile app testflight',
        description:
          'Access your library on the go, with a mobile app for iOS and Android.',
      },
      {
        title: 'Spacedrive in every language, i18n',
        description: 'Spacedrive will be available in every language.',
      },
      {
        title: 'Key manager',
        description:
          'View, mount, unmount and hide keys. Mounted keys can be used to instantly encrypt and decrypt any files on your node.',
      },
      {
        title: 'Comments',
        description:
          'Add comments to files and folders, with support for XY coordinates for photos and timestamp for videos.',
      },
    ],
  },
  {
    date: 'Q2 2024',
    title: '0.4 Alpha',
    features: [
      {
        title: 'Third-party cloud integrations',
        description:
          'Filesystem integrations with iCloud, Google Drive, Dropbox, OneDrive & Mega + easy API for the community to add more.',
      },
      {
        title: 'Spacedrive Cloud',
        description:
          'Backup and sync from anywhere with a Spacedrive Cloud account. Paid plans for additional storage and cloud features.',
      },
      {
        title: 'Hosted Spaces',
        description:
          'Host select Spaces on our cloud to share with friends or publish on the web.',
      },
      {
        title: 'iOS & Android Release',
        description:
          'Spacedrive will be available on the App Store and Google Play Store.',
      },
    ],
  },
  {
    date: 'Q3 2024',
    title: '0.5 Beta',
    features: [
      {
        title: 'Extensions',
        description:
          'Build tools on top of Spacedrive, extend functionality and integrate third party services. Extension directory on spacedrive.com/extensions.',
      },
      {
        title: 'Encrypted vault(s)',
        description:
          'Effortlessly manage & encrypt sensitive files. Encrypt individual files or create flexible-size vaults.',
      },
      {
        title: 'Security Audit',
        description:
          'We will hire a third party security firm to audit the codebase and ensure the highest level of security.',
      },
    ],
  },
  {
    date: 'Q4 2024',
    title: 'Release',
    features: [
      {
        title: 'Timeline',
        description:
          'View a linear timeline of content, travel to any time and see media represented visually.',
      },
      {
        title: 'Redundancy',
        description:
          'Ensure a specific amount of copies exist for your important data, discover at-risk files and monitor device/drive health.',
      },
      {
        title: 'Workers',
        description:
          'Utilize the compute power of your devices in unison to encode and perform tasks at increased speeds.',
      },
    ],
  },
]

export default function HomePage(): JSX.Element {
  return (
    <main className='grid gap-y-16 m-auto my-20 max-w-4xl prose lg:prose-xs dark:prose-invert'>
      <header>
        <h1 className='mb-0 text-5xl leading-snug text-center'>
          What's next for Acme?
        </h1>

        <p className='text-center'>
          Here is a list of the features we are working on, and the progress we
          have made so far.
        </p>
      </header>

      <section className='grid gap-x-4 grid-cols-[auto_1fr]'>
        {roadmap.map(({ done, current, date, title, features }, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: This is a static list
          <Fragment key={index}>
            <span className='flex gap-4 justify-end items-start group'>
              <div className='flex flex-col items-end -translate-y-1/4'>
                <span
                  className={typographyVariants({
                    className: 'text-sm lg:mt-3',
                    variant: 'muted',
                  })}
                >
                  {date}
                </span>

                <h3 className='hidden my-0 text-right lg:block'>{title}</h3>
              </div>

              <div
                className={cn(
                  'w-2 h-full rounded-full mt-1.5',
                  done ? 'bg-green-500' : 'bg-zinc-800',
                )}
              >
                <div
                  className={cn(
                    'rounded-full border-2 absolute border-white size-4 -translate-x-1/4 -translate-y-1/2',
                    done || current ? 'bg-green-500' : 'bg-zinc-800',
                  )}
                />
              </div>
            </span>

            <div className='grid gap-y-4 max-lg:mb-6 group'>
              <h3 className='mb-0 -mt-2.5 lg:hidden'>{title}</h3>

              {features.map(({ title, description }, index) => (
                <div
                  className='p-4 rounded-xl border lg:first-of-type:mt-4'
                  // biome-ignore lint/suspicious/noArrayIndexKey: This is a static list
                  key={index}
                >
                  <h3 className='my-0'>{title}</h3>

                  <p className='mb-0'>{description}</p>
                </div>
              ))}
            </div>
          </Fragment>
        ))}
      </section>

      <footer>
        <h2>That's not all.</h2>

        <p>
          We're always open to ideas and feedback over <a href='/'>here</a> and
          we have a <a href='/'>blog</a> where you can find the latest news and
          updates.
        </p>
      </footer>
    </main>
  )
}
