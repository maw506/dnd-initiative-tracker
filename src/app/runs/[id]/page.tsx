'use client'

import AppLayout from '@/components/AppLayout'
import { Badge, Button, Card, Col, List, Progress, Row, Space, Tag, Typography } from 'antd'
import { useState } from 'react'

// mock inicial hasta conectar Zustand + DB
const mockOrder = [
  { id: 'p1', name: 'Mara (PJ)', type:'PC', hp: 28, maxHp: 32, init: 17 },
  { id: 'g1', name: 'Goblin 1', type:'NPC', hp: 7, maxHp: 7, init: 14 },
  { id: 'g2', name: 'Goblin 2', type:'NPC', hp: 4, maxHp: 7, init: 12 },
]

export default function RunPage() {
  const [round, setRound] = useState(1)
  const [turnIndex, setTurnIndex] = useState(0)
  const current = mockOrder[turnIndex]

  const next = () => {
    const atEnd = turnIndex + 1 >= mockOrder.length
    setTurnIndex(atEnd ? 0 : turnIndex + 1)
    setRound(r => atEnd ? r + 1 : r)
  }

  return (
    <AppLayout>
      <Row gutter={16}>
        <Col xs={24} md={7}>
          <Card title={`Iniciativa — Ronda ${round}`} bordered style={{ borderRadius: 16 }}>
            <List
              dataSource={mockOrder}
              renderItem={(c, i) => (
                <List.Item style={{ background: i===turnIndex ? '#1f1f1f' : 'transparent', borderRadius: 12, marginBottom: 6, padding: 10 }}>
                  <Space>
                    <Badge color={i===turnIndex ? 'geekblue' : 'default'} />
                    <div>
                      <div style={{ fontWeight: 600 }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: '#999' }}>Init {c.init} · {c.type}</div>
                    </div>
                  </Space>
                </List.Item>
              )}
            />
            <Button type="primary" block onClick={next} style={{ marginTop: 8 }}>Siguiente turno</Button>
          </Card>
        </Col>

        <Col xs={24} md={10}>
          <Card title={`Turno: ${current.name}`} bordered style={{ borderRadius: 16 }}>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <div>
                <Typography.Text>HP</Typography.Text>
                <Progress percent={Math.round((current.hp/current.maxHp)*100)} showInfo />
              </div>
              <Space>
                <Button>-1</Button>
                <Button>-5</Button>
                <Button>-10</Button>
                <Button type="dashed">Curar +5</Button>
              </Space>
              <Space>
                <Tag color="purple">Bend (2)</Tag>
                <Tag color="volcano">Prone (1)</Tag>
                <Button>Agregar condición</Button>
              </Space>
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={7}>
          <Card title="Notas rápidas" bordered style={{ borderRadius: 16 }}>
            <Typography.Paragraph type="secondary">
              Aquí podés dejar recordatorios de reacciones, resistencias, etc.
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>
    </AppLayout>
  )
}
