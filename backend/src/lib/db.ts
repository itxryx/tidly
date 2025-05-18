import { PrismaClient } from '../generated/prisma'
import { D1Database } from '@cloudflare/workers-types'
import { PrismaD1 } from '@prisma/adapter-d1'

let prisma: PrismaClient

export function getDB(env?: { DB: D1Database }): PrismaClient {
  if (prisma) {
    return prisma
  }

  if (env?.DB) {
    const adapter = new PrismaD1(env.DB)
    prisma = new PrismaClient({ adapter })
  } else {
    prisma = new PrismaClient()
  }

  return prisma
}