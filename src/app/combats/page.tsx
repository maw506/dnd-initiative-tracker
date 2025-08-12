// src/app/combats/page.tsx
import AppLayout from '@/components/AppLayout'
import { Card } from 'antd'

type Combat = { id: string; name: string; slug: string; createdAt: string }

// 🔹 Mock local (reemplazamos Prisma por ahora)
async function getMockCombats(): Promise<Combat[]> {
  // simulamos latencia
  await new Promise(r => setTimeout(r, 200))
  return [
    { id: '1', name: 'Emboscada de Goblins', slug: 'emboscada-goblins', createdAt: '2025-08-11' },
    { id: '2', name: 'Guarida del Ogro', slug: 'guarida-del-ogro', createdAt: '2025-08-10' },
  ]
}

export default async function CombatsPage() {
  const combats = await getMockCombats()

  return (
    <AppLayout>
      <Card title="Tus combates" bordered style={{ borderRadius: 16 }}>
        {combats.length === 0 ? (
          <p style={{ color: '#999' }}>
            No tenés combates aún. Creá uno desde <a href="/combats/new">Nuevo combate</a>.
          </p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {combats.map((c) => (
              <li key={c.id} style={{ padding: 12, borderBottom: '1px solid #1f1f1f' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: '#999' }}>{c.slug}</div>
                  </div>
                  <a href={`/combats/${c.slug}`}>Abrir</a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </AppLayout>
  )
}
