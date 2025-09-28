import React from "react";
import { Card, Row, Col, Table } from "antd";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const Dashboard = ({ data, isLandscape }) => {
  // KPIs from data
  const numCondominios = data.condominios?.length || 0;
  const numUnidades = data.unidades?.length || 0;
  const numResidentes = data.residentes?.length || 0;
  const numReclamosAbiertos = data.reclamos?.filter(r => r.estado === "abierto")?.length || 0;
  const numTicketsPendientes = data.tickets?.filter(t => t.estado === "pendiente")?.length || 0;
  const totalGastos = data.gastos?.reduce((acc, g) => acc + (g.monto_total || 0), 0) || 0;
  const totalPagos = data.pagos?.reduce((acc, p) => acc + (p.monto || 0), 0) || 0;
  const numPersonal = data.personal?.length || 0;
  const numProveedores = data.proveedores?.length || 0;

  // Chart Data Preparation
  const ocupacionData = [
    { name: "Ocupadas", value: data.unidades?.filter(u => u.estado === "ocupada")?.length || 0 },
    { name: "Vacías", value: data.unidades?.filter(u => u.estado === "vacía")?.length || 0 },
  ];

  const finanzasData = data.gastos?.map(g => ({
    mes: g.mes,
    gastos: g.monto_total,
    ingresos: data.pagos?.filter(p => p.fecha.slice(0, 7) === g.mes)?.reduce((acc, p) => acc + p.monto, 0) || 0,
  })) || [];

  const reclamosData = [
    { name: "Abiertos", value: numReclamosAbiertos },
    { name: "En Revisión", value: data.reclamos?.filter(r => r.estado === "en revisión")?.length || 0 },
    { name: "Cerrados", value: data.reclamos?.filter(r => r.estado === "cerrado")?.length || 0 },
  ];

  const ticketsData = [
    { name: "Pendientes", value: numTicketsPendientes },
    { name: "En Progreso", value: data.tickets?.filter(t => t.estado === "en progreso")?.length || 0 },
    { name: "Completados", value: data.tickets?.filter(t => t.estado === "completado")?.length || 0 },
  ];

  const gastosCategoriaData = data.detalleGastos?.reduce((acc, d) => {
    const existing = acc.find(item => item.name === d.descripcion);
    if (existing) {
      existing.value += d.monto;
    } else {
      acc.push({ name: d.descripcion, value: d.monto });
    }
    return acc;
  }, []) || [];

  const votacionesData = data.votaciones?.map(v => ({
    name: v.pregunta.slice(0, 20) + "...",
    votos: data.votos?.filter(vo => vo.id_votacion === v.id_votacion)?.length || 0,
  })) || [];

  return (
    <div>
      <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>Dashboard General</h2>

      {/* KPI Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={isLandscape ? 4 : 6}><Card title="Condominios">{numCondominios}</Card></Col>
        <Col xs={24} sm={12} md={isLandscape ? 4 : 6}><Card title="Unidades">{numUnidades}</Card></Col>
        <Col xs={24} sm={12} md={isLandscape ? 4 : 6}><Card title="Residentes">{numResidentes}</Card></Col>
        <Col xs={24} sm={12} md={isLandscape ? 4 : 6}><Card title="Reclamos Abiertos">{numReclamosAbiertos}</Card></Col>
        <Col xs={24} sm={12} md={isLandscape ? 4 : 6}><Card title="Tickets Pendientes">{numTicketsPendientes}</Card></Col>
        <Col xs={24} sm={12} md={isLandscape ? 4 : 6}><Card title="Total Gastos">$ {totalGastos.toLocaleString("es-CL")}</Card></Col>
        <Col xs={24} sm={12} md={isLandscape ? 4 : 6}><Card title="Total Ingresos">$ {totalPagos.toLocaleString("es-CL")}</Card></Col>
        <Col xs={24} sm={12} md={isLandscape ? 4 : 6}><Card title="Personal Activo">{numPersonal}</Card></Col>
        <Col xs={24} sm={12} md={isLandscape ? 4 : 6}><Card title="Proveedores">{numProveedores}</Card></Col>
        <Col xs={24} sm={12} md={isLandscape ? 4 : 6}><Card title="Comunicados Publicados">{data.comunicados?.filter(c => c.estado === "publicado")?.length || 0}</Card></Col>
        <Col xs={24} sm={12} md={isLandscape ? 4 : 6}><Card title="Asambleas Programadas">{data.asambleas?.filter(a => a.estado === "programada")?.length || 0}</Card></Col>
        <Col xs={24} sm={12} md={isLandscape ? 4 : 6}><Card title="Votaciones Abiertas">{data.votaciones?.filter(v => v.estado === "abierta")?.length || 0}</Card></Col>
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={isLandscape ? 8 : 12}>
          <Card title="Ocupación de Unidades">
            <BarChart width={Math.min(window.innerWidth - 40, isLandscape ? 400 : 500)} height={isLandscape ? 200 : 300} data={ocupacionData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </Card>
        </Col>
        <Col xs={24} md={isLandscape ? 8 : 12}>
          <Card title="Ingresos vs Gastos">
            <LineChart width={Math.min(window.innerWidth - 40, isLandscape ? 400 : 500)} height={isLandscape ? 200 : 300} data={finanzasData}>
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="ingresos" stroke="#82ca9d" />
              <Line type="monotone" dataKey="gastos" stroke="#ff7300" />
            </LineChart>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={isLandscape ? 6 : 8}>
          <Card title="Estado de Reclamos">
            <PieChart width={Math.min(window.innerWidth - 40, isLandscape ? 250 : 300)} height={isLandscape ? 200 : 300}>
              <Pie data={reclamosData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                {reclamosData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Card>
        </Col>
        <Col xs={24} md={isLandscape ? 6 : 8}>
          <Card title="Estado de Tickets">
            <PieChart width={Math.min(window.innerWidth - 40, isLandscape ? 250 : 300)} height={isLandscape ? 200 : 300}>
              <Pie data={ticketsData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                {ticketsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Card>
        </Col>
        <Col xs={24} md={isLandscape ? 6 : 8}>
          <Card title="Gastos por Categoría">
            <BarChart width={Math.min(window.innerWidth - 40, isLandscape ? 250 : 300)} height={isLandscape ? 200 : 300} data={gastosCategoriaData}>
              <XAxis dataKey="name" angle={-45} textAnchor="end" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#413ea0" />
            </BarChart>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={isLandscape ? 8 : 12}>
          <Card title="Votaciones Recientes">
            <BarChart width={Math.min(window.innerWidth - 40, isLandscape ? 400 : 500)} height={isLandscape ? 200 : 300} data={votacionesData}>
              <XAxis dataKey="name" angle={-45} textAnchor="end" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="votos" fill="#ff7300" />
            </BarChart>
          </Card>
        </Col>
        <Col xs={24} md={isLandscape ? 8 : 12}>
          <Card title="Últimos Logs">
            <Table
              dataSource={data.logs?.slice(0, 5) || []}
              columns={[
                { title: "Fecha", dataIndex: "fecha", key: "fecha" },
                { title: "Acción", dataIndex: "accion", key: "accion" },
              ]}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Tables */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={isLandscape ? 6 : 8}>
          <Card title="Últimos Pagos">
            <Table
              dataSource={data.pagos?.slice(0, 5) || []}
              columns={[
                { title: "Fecha", dataIndex: "fecha" },
                { title: "Monto", dataIndex: "monto", render: (v) => `$ ${v.toLocaleString("es-CL")}` },
              ]}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} md={isLandscape ? 6 : 8}>
          <Card title="Últimos Reclamos">
            <Table
              dataSource={data.reclamos?.slice(0, 5) || []}
              columns={[
                { title: "Asunto", dataIndex: "asunto" },
                { title: "Estado", dataIndex: "estado" },
              ]}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} md={isLandscape ? 6 : 8}>
          <Card title="Últimos Comunicados">
            <Table
              dataSource={data.comunicados?.slice(0, 5) || []}
              columns={[
                { title: "Título", dataIndex: "titulo" },
                { title: "Fecha", dataIndex: "fecha" },
              ]}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;