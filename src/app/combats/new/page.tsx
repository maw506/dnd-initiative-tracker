'use client'

import AppLayout from '@/components/AppLayout'
import { Button, Card, Form, Input, Space, Table, Drawer, Select, InputNumber, message } from 'antd'
import { useState } from 'react'

type CreatureDraft = { key: string; name: string; type: 'PC'|'NPC'; ac?: number; hp?: number; notes?: string }

export default function NewCombatPage() {
  const [form] = Form.useForm()
  const [openDrawer, setOpenDrawer] = useState(false)
  const [rows, setRows] = useState<CreatureDraft[]>([])

  const columns = [
    { title: 'Nombre', dataIndex: 'name' },
    { title: 'Tipo', dataIndex: 'type' },
    { title: 'AC', dataIndex: 'ac' },
    { title: 'HP', dataIndex: 'hp' },
    {
      title: 'Acciones',
      render: (_: any, r: CreatureDraft) => (
        <Space>
          <Button type="link" onClick={() => setRows(prev => prev.filter(x => x.key !== r.key))}>Eliminar</Button>
        </Space>
      )
    },
  ]

  async function onSubmit(values: any) {
    const payload = {
      slug: values.slug,
      name: values.name,
      authorEmail: values.authorEmail || 'dm@example.com', // placeholder
      blueprint: rows.map(({ key, ...rest }) => rest),
    }
    // TODO: POST a /api/combats
    console.log('create combat', payload)
    message.success('Combate creado (pendiente de guardar en DB)')
    form.resetFields(); setRows([])
  }

  return (
    <AppLayout>
      <Card title="Nuevo combate" bordered style={{ borderRadius: 16 }}>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item label="Nombre" name="name" rules={[{ required: true, message: 'Ingresa un nombre' }]}>
            <Input placeholder="Emboscada de Goblins" />
          </Form.Item>
          <Form.Item label="Slug" name="slug" rules={[{ required: true, message: 'Ingresa un slug' }]}>
            <Input placeholder="emboscada-goblins" />
          </Form.Item>
          <Form.Item label="Autor (email)" name="authorEmail">
            <Input placeholder="dm@example.com" />
          </Form.Item>

          <Card size="small" title="Criaturas" extra={<Button onClick={() => setOpenDrawer(true)}>Agregar</Button>} style={{ marginBottom: 16 }}>
            <Table rowKey="key" dataSource={rows} columns={columns as any} pagination={false} />
          </Card>

          <Space>
            <Button type="primary" htmlType="submit">Guardar plantilla</Button>
            <Button htmlType="button" onClick={() => { form.resetFields(); setRows([]) }}>Limpiar</Button>
          </Space>
        </Form>
      </Card>

      <Drawer title="Agregar criatura" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Form layout="vertical" onFinish={(v) => {
          setRows(prev => [...prev, { key: crypto.randomUUID(), ...v }])
          setOpenDrawer(false)
        }}>
          <Form.Item label="Nombre" name="name" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="Tipo" name="type" rules={[{ required: true }]}>
            <Select options={[{value:'PC',label:'PJ'}, {value:'NPC',label:'PNJ'}]} />
          </Form.Item>
          <Form.Item label="AC" name="ac"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item>
          <Form.Item label="HP" name="hp"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item>
          <Form.Item label="Notas" name="notes"><Input.TextArea rows={3} /></Form.Item>
          <Button type="primary" htmlType="submit" block>Agregar</Button>
        </Form>
      </Drawer>
    </AppLayout>
  )
}
