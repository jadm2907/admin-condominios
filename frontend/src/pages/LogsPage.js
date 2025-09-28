import React, { useState, useEffect } from "react";
import SectionTable from "../components/SectionTable";

const LogsPage = ({ data }) => {
  const [logs, setLogs] = useState([]);

  // Mock data
  useEffect(() => {
    setLogs([
      { id_log: 1, id_usuario: 1, accion: "Creó un condominio", fecha: "2025-09-28 10:00:00", detalles: "Condominio ID: 1" },
      { id_log: 2, id_usuario: 2, accion: "Actualizó residente", fecha: "2025-09-28 12:30:00", detalles: "Residente ID: 2" },
      { id_log: 3, id_usuario: 3, accion: "Eliminó gasto", fecha: "2025-09-28 15:45:00", detalles: "Gasto ID: 3" },
    ]);
  }, []);

  const columns = [
    { title: "ID Log", dataIndex: "id_log", key: "id_log" },
    { title: "Usuario", dataIndex: "id_usuario", key: "id_usuario", render: (id) => {
      const usuario = data.usuarios?.find((u) => u.id_usuario === id);
      return usuario ? usuario.nombre_usuario : "-";
    }},
    { title: "Acción", dataIndex: "accion", key: "accion" },
    { title: "Fecha", dataIndex: "fecha", key: "fecha" },
    { title: "Detalles", dataIndex: "detalles", key: "detalles" },
  ];

  const handleAdd = () => {
    console.log("Los logs son generados automáticamente, no se pueden agregar manualmente.");
  };

  return (
    <SectionTable
      title="Auditoría"
      dataSource={logs}
      columns={columns}
      rowKey="id_log"
      onAdd={handleAdd}
    />
  );
};

export default LogsPage;