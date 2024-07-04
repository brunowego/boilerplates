import { redirect } from 'next/navigation'

export default function InfiniteScrollPage(): never {
  return redirect('/load-more')
}
