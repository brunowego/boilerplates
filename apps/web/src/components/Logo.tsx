import Image from 'next/image'

const Logo = ({ height, width }: { height: number; width: number }) => {
  return (
    <Image src="/assets/images/logo.svg" alt="logo" height={height} width={width} priority={true} />
  )
}

export default Logo
