import { deleteDomainByDomain } from '@acme/db/queries'

import { removeDomainFromVercel } from '@/lib/api/domains'

export async function DELETE(
  _: Request,
  { params }: { params: { domain: string } },
): Promise<Response> {
  try {
    await deleteDomainByDomain(params.domain)

    const response = await removeDomainFromVercel(params.domain)

    return new Response(response, {
      status: 200,
    })
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error(err)
    }

    return new Response(null, {
      status: 500,
    })
  }
}
