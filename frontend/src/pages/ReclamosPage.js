import React, { useState, useEffect } from "react";
import SectionTable from "../components/SectionTable";

const ReclamosPage = ({ data }) => {
  const [reclamos, setReclamos] = useState([]);

  // Mock data
  useEffect(() => {
    setReclamos([
      { id_reclamo: 1, id_residente: 1, asunto: "Ruido excesivo", fecha: "2025-09-02", estado: "abierto" },
      { id_reclamo: 2, id_residente: 2, asunto: "Fuga de agua", fecha: "2025-09-03", estado: "en revisión" },
      { id_reclamo: 3, id_residente: 3, asunto: "Problema eléctrico", fecha: "2025-09-04", estado: "cerrado" },
    ]);
  }, []);

  const columns = [
    { title: "ID Reclamo", dataIndex: "id_reclamo", key: "id_reclamo" },
    { title: "Residente", dataIndex: "id_residente", key: "id_residente", render: (id) => {
      const residente = data.residentes?.find((r) => r.id_residente === id);
      return residente ? `${residente.nombre} ${residente.apellido}` : "-";
    }},
    { title: "Asunto", dataIndex: "asunto", key: "asunto" },
    { title: "Fecha", dataIndex: "fecha", key: "fecha" },
    { title: "Estado", dataIndex: "estado", key: "estado" },
  ];

  const handleAdd = () => {
    console.log("Agregar nuevo reclamo");
    // Implementar modal o API call
  };

  return (
    <SectionTable
      title="Reclamos"
      dataSource={reclamos}
      columns={columns}
      rowKey="id_reclamo"
      onAdd={handleAdd}
    />
  );
};

export default ReclamosPage;