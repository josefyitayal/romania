import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from './generated/prisma/client'

const globalForPrisma = global

const prisma =
    globalForPrisma.prisma ||
    new PrismaClient().$extends(withAccelerate())

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
}

const client = prisma

export default client
