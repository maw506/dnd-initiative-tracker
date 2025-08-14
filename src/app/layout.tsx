import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, theme as antdTheme } from "antd";
import "@/styles/global.css";

export const metadata: Metadata = {
  title: "D&D Initiative Tracker",
  description: "Prep y ejecución de combates sin fricción",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body style={{ minHeight: "100dvh", background: "#0b0b0b" }}>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              algorithm: antdTheme.darkAlgorithm,
              token: {
                colorBgBase: "#0b0b0b",
                colorBgContainer: "#141414",
                colorBgLayout: "#0b0b0b",
                borderRadius: 12,
              },
            }}
          >
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
