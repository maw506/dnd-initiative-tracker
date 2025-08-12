import { prisma } from '@/server/db'

export async function listCombats() {
  return prisma.combat.findMany({
    select: { id: true, name: true, slug: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  })
}
