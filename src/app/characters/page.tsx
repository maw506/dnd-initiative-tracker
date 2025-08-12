'use client'

import AppLayout from '@/components/AppLayout'
import { Badge, Button, Card, Space, Table, Tag } from 'antd'
import { useState } from 'react'

type Char = { id: string; name: string; role: 'PJ'|'NPC'; player?: string; notes?: string }

export default function CharactersPage() {
  const [rows] = useState<Char[]>([
    { id: 'c1', name: 'Mara', role: 'PJ', player: 'Ana', notes: 'Hechicera' },
    { id: 'c2', name: 'Elin', role: 'NPC', notes: 'Arco de Mara' },
  ])

  const columns = [
    { title: 'Nombre', dataIndex: 'name' },
    { title: 'Rol', dataIndex: 'role', render: (r: Char['role']) => r === 'PJ' ? <Badge color="geekblue" text="PJ" /> : <Badge color="purple" text="NPC" /> },
    { title: 'Jugador', dataIndex: 'player', render: (v: string) => v || '—' },
    { title: 'Notas', dataIndex: 'notes', ellipsis: true },
    {
      title: 'Acciones',
      render: (_: any, r: Char) => (
        <Space>
          <Button type="link">Editar</Button>
          <Button type="link" danger>Eliminar</Button>
        </Space>
      )
    },
  ]

  return (
    <AppLayout>
      <Card title="Personajes (PJs y NPCs de la historia)" extra={<Button type="primary">Nuevo personaje</Button>} bordered style={{ borderRadius: 16 }}>
        <Table rowKey="id" dataSource={rows} columns={columns as any} />
      </Card>
    </AppLayout>
  )
}
