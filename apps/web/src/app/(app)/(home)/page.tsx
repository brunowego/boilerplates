import { redirect } from 'next/navigation'

export default function HomePage(): never {
  return redirect('/profile-picture')
}
