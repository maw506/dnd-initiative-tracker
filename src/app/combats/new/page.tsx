'use client'

import AppLayout from '@/components/AppLayout'
import { Button, Card, Form, Input, Space, Table, Drawer, Select, InputNumber, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useState, CSSProperties } from 'react'

type CreatureDraft = { key: string; name: string; type: 'PC'|'NPC'; ac?: number; hp?: number; notes?: string }

export default function NewCombatPage() {
  const [form] = Form.useForm()
  const [openDrawer, setOpenDrawer] = useState(false)
  const [rows, setRows] = useState<CreatureDraft[]>([])

  const containerStyle: CSSProperties = { backgroundColor: '#1f1f1f', color: '#fff' }
  const inputStyle: CSSProperties = { backgroundColor: '#141414', color: '#fff' }

  const columns: ColumnsType<CreatureDraft> = [
    { title: 'Nombre', dataIndex: 'name' },
    { title: 'Tipo', dataIndex: 'type' },
    { title: 'AC', dataIndex: 'ac' },
    { title: 'HP', dataIndex: 'hp' },
    {
      title: 'Acciones',
      render: (_: unknown, r: CreatureDraft) => (
        <Space>
          <Button type="link" onClick={() => setRows(prev => prev.filter(x => x.key !== r.key))}>Eliminar</Button>
        </Space>
      )
    },
  ]

  type FormValues = { slug: string; name: string; authorEmail?: string }

  async function onSubmit(values: FormValues) {
    const payload = {
      slug: values.slug,
      name: values.name,
      authorEmail: values.authorEmail || 'dm@example.com', // placeholder
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      blueprint: rows.map(({ key: _key, ...rest }) => rest),
    }
    // TODO: POST a /api/combats
    console.log('create combat', payload)
    message.success('Combate creado (pendiente de guardar en DB)')
    form.resetFields(); setRows([])
  }

  return (
    <AppLayout>
      <Card title="Nuevo combate" bordered style={{ borderRadius: 16, ...containerStyle }}>
        <Form form={form} layout="vertical" onFinish={onSubmit} style={containerStyle}>
          <Form.Item label={<span style={{ color: '#fff' }}>Nombre</span>} name="name" rules={[{ required: true, message: 'Ingresa un nombre' }]}>
            <Input placeholder="Emboscada de Goblins" style={inputStyle} />
          </Form.Item>
          <Form.Item label={<span style={{ color: '#fff' }}>Slug</span>} name="slug" rules={[{ required: true, message: 'Ingresa un slug' }]}>
            <Input placeholder="emboscada-goblins" style={inputStyle} />
          </Form.Item>
          <Form.Item label={<span style={{ color: '#fff' }}>Autor (email)</span>} name="authorEmail">
            <Input placeholder="dm@example.com" style={inputStyle} />
          </Form.Item>

          <Card size="small" title={<span style={{ color: '#fff' }}>Criaturas</span>} extra={<Button onClick={() => setOpenDrawer(true)}>Agregar</Button>} style={{ marginBottom: 16, ...containerStyle }}>
            <Table rowKey="key" dataSource={rows} columns={columns} pagination={false} />
          </Card>

          <Space>
            <Button type="primary" htmlType="submit">Guardar plantilla</Button>
            <Button htmlType="button" onClick={() => { form.resetFields(); setRows([]) }}>Limpiar</Button>
          </Space>
        </Form>
      </Card>

      <Drawer title="Agregar criatura" open={openDrawer} onClose={() => setOpenDrawer(false)} styles={{ body: containerStyle, header: containerStyle }}>
        <Form layout="vertical" onFinish={(v) => {
          setRows(prev => [...prev, { key: crypto.randomUUID(), ...v }])
          setOpenDrawer(false)
        }} style={containerStyle}>
          <Form.Item label={<span style={{ color: '#fff' }}>Nombre</span>} name="name" rules={[{ required: true }]}><Input style={inputStyle} /></Form.Item>
          <Form.Item label={<span style={{ color: '#fff' }}>Tipo</span>} name="type" rules={[{ required: true }]}>
            <Select options={[{value:'PC',label:'PJ'}, {value:'NPC',label:'PNJ'}]} style={inputStyle} dropdownStyle={containerStyle} />
          </Form.Item>
          <Form.Item label={<span style={{ color: '#fff' }}>AC</span>} name="ac"><InputNumber min={0} style={{ width: '100%', ...inputStyle }} /></Form.Item>
          <Form.Item label={<span style={{ color: '#fff' }}>HP</span>} name="hp"><InputNumber min={0} style={{ width: '100%', ...inputStyle }} /></Form.Item>
          <Form.Item label={<span style={{ color: '#fff' }}>Notas</span>} name="notes"><Input.TextArea rows={3} style={inputStyle} /></Form.Item>
          <Button type="primary" htmlType="submit" block>Agregar</Button>
        </Form>
      </Drawer>
    </AppLayout>
  )
}
