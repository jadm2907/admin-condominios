import React, { useState, useEffect } from "react";
import SectionTable from "../components/SectionTable";

const VisitasPage = ({ data }) => {
  const [visitas, setVisitas] = useState([]);

  // Mock data
  useEffect(() => {
    setVisitas([
      { id_visita: 1, id_residente: 1, nombre: "Carlos Ramírez", motivo: "Reunión", fecha: "2025-09-01", hora: "10:00" },
      { id_visita: 2, id_residente: 2, nombre: "Sofía Torres", motivo: "Visita familiar", fecha: "2025-09-02", hora: "14:00" },
      { id_visita: 3, id_residente: 3, nombre: "Andrés Vega", motivo: "Entrega", fecha: "2025-09-03", hora: "16:30" },
    ]);
  }, []);

  const columns = [
    { title: "ID Visita", dataIndex: "id_visita", key: "id_visita" },
    { title: "Residente", dataIndex: "id_residente", key: "id_residente", render: (id) => {
      const residente = data.residentes?.find((r) => r.id_residente === id);
      return residente ? `${residente.nombre} ${residente.apellido}` : "-";
    }},
    { title: "Nombre Visitante", dataIndex: "nombre", key: "nombre" },
    { title: "Motivo", dataIndex: "motivo", key: "motivo" },
    { title: "Fecha", dataIndex: "fecha", key: "fecha" },
    { title: "Hora", dataIndex: "hora", key: "hora" },
  ];

  const handleAdd = () => {
    console.log("Agregar nueva visita");
    // Implementar modal o API call
  };

  return (
    <SectionTable
      title="Visitas"
      dataSource={visitas}
      columns={columns}
      rowKey="id_visita"
      onAdd={handleAdd}
    />
  );
};

export default VisitasPage;