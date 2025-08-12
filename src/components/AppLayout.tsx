"use client";

import { Layout, Menu, Typography } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  PlusSquareOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const { Header, Sider, Content, Footer } = Layout;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    { key: "/", icon: <HomeOutlined />, label: <Link href="/">Inicio</Link> },
    {
      key: "/combats",
      icon: <AppstoreOutlined />,
      label: <Link href="/combats">Combates</Link>,
    },
    {
      key: "/combats/new",
      icon: <PlusSquareOutlined />,
      label: <Link href="/combats/new">Nuevo</Link>,
    },
    {
      key: "/runs",
      icon: <PlayCircleOutlined />,
      label: <Link href="/runs">Partidas</Link>,
    },
    {
      key: "/npcs",
      icon: <AppstoreOutlined />,
      label: <Link href="/npcs">PNJs</Link>,
    }, // biblioteca para combates
    {
      key: "/characters",
      icon: <AppstoreOutlined />,
      label: <Link href="/characters">Personajes</Link>,
    }, // PJs y NPCs de historia
  ];

  const selectedKey =
    items.find((i) => pathname === i.key || pathname?.startsWith(i.key + "/"))
      ?.key ?? "/";

  return (
    <Layout style={{ minHeight: "100dvh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={240}
      >
        <div style={{ padding: 16 }}>
          <Typography.Text strong style={{ color: "#fff" }}>
            {!collapsed ? "D&D Tracker" : "D&D"}
          </Typography.Text>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={items}
        />
      </Sider>

      <Layout>
        <Header style={{ background: "transparent", paddingInline: 24 }}>
          <Typography.Title level={4} style={{ margin: 0, color: "#fff" }}>
            {selectedKey === "/"
              ? ""
              : selectedKey === "/combats"
              ? "Combates"
              : selectedKey === "/combats/new"
              ? "Nuevo combate"
              : "Partidas"}
          </Typography.Title>
        </Header>

        <Content style={{ padding: 24 }}>
          <div style={{ background: "#141414", padding: 16, borderRadius: 16 }}>
            {children}
          </div>
        </Content>

        <Footer
          style={{
            textAlign: "center",
            background: "transparent",
            color: "#999",
          }}
        >
          D&D Initiative Tracker · v0.1
        </Footer>
      </Layout>
    </Layout>
  );
}
