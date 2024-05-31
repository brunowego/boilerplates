import { db, count, domainsTable, or, eq, ilike } from '@acme/db'

import { getApexDomain } from '@/utils'

export const removeDomainFromVercel = async (domain: string) => {
  const apexDomain = getApexDomain(`https://${domain}`)

  const domainCount = await db
    .select({ count: count() })
    .from(domainsTable)
    .where(
      or(
        eq(domainsTable.domain, apexDomain),
        ilike(domainsTable.domain, `%.${apexDomain}`),
      ),
    )
    .then((res) => (res[0] ? res[0].count : 0))

  if (domainCount > 1) {
    return await fetch(
      `https://api.vercel.com/v9/projects/${
        process.env.PROJECT_ID_VERCEL
      }/domains/${domain.toLowerCase()}?teamId=${process.env.TEAM_ID_VERCEL}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
        },
        method: 'DELETE',
      },
    ).then((res) => res.json())
  }

  return await fetch(
    `https://api.vercel.com/v6/domains/${domain.toLowerCase()}?teamId=${
      process.env.TEAM_ID_VERCEL
    }`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`,
      },
      method: 'DELETE',
    },
  ).then((res) => res.json())
}
