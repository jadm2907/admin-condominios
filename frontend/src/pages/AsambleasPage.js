import React, { useState, useEffect } from "react";
import SectionTable from "../components/SectionTable";

const AsambleasPage = () => {
  const [asambleas, setAsambleas] = useState([]);

  // Mock data
  useEffect(() => {
    setAsambleas([
      { id_asamblea: 1, titulo: "Asamblea Anual 2025", fecha: "2025-10-05", hora: "18:00", lugar: "Salón Comunal", estado: "programada" },
      { id_asamblea: 2, titulo: "Asamblea Extraordinaria", fecha: "2025-09-30", hora: "19:00", lugar: "Zoom", estado: "completada" },
      { id_asamblea: 3, titulo: "Revisión Presupuesto", fecha: "2025-11-01", hora: "17:00", lugar: "Salón Comunal", estado: "programada" },
    ]);
  }, []);

  const columns = [
    { title: "ID Asamblea", dataIndex: "id_asamblea", key: "id_asamblea" },
    { title: "Título", dataIndex: "titulo", key: "titulo" },
    { title: "Fecha", dataIndex: "fecha", key: "fecha" },
    { title: "Hora", dataIndex: "hora", key: "hora" },
    { title: "Lugar", dataIndex: "lugar", key: "lugar" },
    { title: "Estado", dataIndex: "estado", key: "estado" },
  ];

  const handleAdd = () => {
    console.log("Agregar nueva asamblea");
    // Implementar modal o API call
  };

  return (
    <SectionTable
      title="Asambleas"
      dataSource={asambleas}
      columns={columns}
      rowKey="id_asamblea"
      onAdd={handleAdd}
    />
  );
};

export default AsambleasPage;