import AppLayout from "@/components/AppLayout";

export default async function HomePage() {
  return (
    <AppLayout>
      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        }}
      >
        <a
          href="/combats/new"
          className="ant-card ant-card-bordered"
          style={{ borderRadius: 16, padding: 16 }}
        >
          <h3 style={{ marginBottom: 4 }}>Crear combate</h3>
          <p style={{ color: "#999" }}>Armá una plantilla antes de la sesión</p>
        </a>

        <a
          href="/combats"
          className="ant-card ant-card-bordered"
          style={{ borderRadius: 16, padding: 16 }}
        >
          <h3 style={{ marginBottom: 4 }}>Ver combates</h3>
          <p style={{ color: "#999" }}>Tus plantillas guardadas</p>
        </a>
      </div>
    </AppLayout>
  );
}
