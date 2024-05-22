import { redirect } from 'next/navigation'

export default function Home(): never {
  return redirect('/pages')
}
