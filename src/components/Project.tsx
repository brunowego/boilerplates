import { Project as Props } from '@/data/projects'
import Image from 'next/image'

export default function Project({ name, description, website, logo }: Props) {
  return (
    <a
      href={website}
      className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
      target="_blank"
      rel="noreferrer noopener"
    >
      <Image src={logo} alt={name} />
      <h3 className="text-2xl font-bold">{name} &rarr;</h3>
      <p className="mt-4 text-xl">{description}</p>
    </a>
  )
}
