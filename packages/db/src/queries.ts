import { db } from './db'
import { asc, eq } from './orm'
import { domainsTable } from './schema'

export async function getDomains() {
  return await db.query.domainsTable.findMany({
    columns: {
      id: true,
      domain: true,
      createdAt: true,
    },
    orderBy: [asc(domainsTable.id)],
    limit: 15,
  })
}

export async function getDomainById(id: string) {
  return await db.query.domainsTable.findFirst({
    columns: {
      id: true,
      domain: true,
      createdAt: true,
    },
    where: eq(domainsTable.id, id),
  })
}

export async function checkDomainExists(domain: string) {
  const response = await db.query.domainsTable.findFirst({
    columns: {
      domain: true,
    },
    where: eq(domainsTable.domain, domain),
  })

  return !!response
}

export async function setVerifiedDomain(domain: string, verified: boolean) {
  return await db
    .update(domainsTable)
    .set({
      verified,
      lastChecked: new Date(),
    })
    .where(eq(domainsTable.domain, domain))
    .returning()
}

export async function deleteDomainById(id: string) {
  return await db.delete(domainsTable).where(eq(domainsTable.id, id))
}

export async function deleteDomainByDomain(domain: string) {
  return await db.delete(domainsTable).where(eq(domainsTable.domain, domain))
}
