import type { ReactChild, ReactChildren } from 'react'
import Header from './Header'
import Footer from './Footer'

interface Props {
  children?: ReactChild | ReactChild[] | ReactChildren | ReactChildren[]
}

export default function Layout({ children }: Props) {
  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6 lg:p-8">
      <Header />

      <main>{children}</main>

      <Footer />
    </div>
  )
}
