'use client'

import AppLayout from '@/components/AppLayout'
import { Button, Card, Space, Table, Tag } from 'antd'
import { useState } from 'react'

type NPC = { id: string; name: string; ac?: number; maxHp?: number; tags?: string[] }

export default function NPCsPage() {
  const [data] = useState<NPC[]>([
    { id: 'n1', name: 'Goblin', ac: 13, maxHp: 7, tags: ['sigiloso','débil'] },
    { id: 'n2', name: 'Ogro', ac: 11, maxHp: 59, tags: ['fuerte'] },
  ])

  const columns = [
    { title: 'Nombre', dataIndex: 'name' },
    { title: 'AC', dataIndex: 'ac' },
    { title: 'HP', dataIndex: 'maxHp' },
    { title: 'Tags', dataIndex: 'tags', render: (t: string[]) => <Space>{t?.map(x => <Tag key={x}>{x}</Tag>)}</Space> },
    {
      title: 'Acciones',
      render: (_: any, r: NPC) => (
        <Space>
          <Button type="link">Usar en combate</Button>
          <Button type="link">Editar</Button>
          <Button type="link" danger>Eliminar</Button>
        </Space>
      )
    },
  ]

  return (
    <AppLayout>
      <Card title="PNJs (biblioteca)" extra={<Button type="primary">Nuevo PNJ</Button>} bordered style={{ borderRadius: 16 }}>
        <Table rowKey="id" dataSource={data} columns={columns as any} />
      </Card>
    </AppLayout>
  )
}
