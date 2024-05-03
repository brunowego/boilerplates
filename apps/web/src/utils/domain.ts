export function hasSubdomain(subdomain: string, domain: string): boolean {
  return new Set([`${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`]).has(
    domain,
  )
}
