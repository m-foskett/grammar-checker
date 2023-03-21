import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var cachedPrisma: PrismaClient
}

let prisma: PrismaClient
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  // Check if there is a Prisma client already
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient()
  }
  // Else use cached client
  prisma = global.cachedPrisma
}

export const db = prisma