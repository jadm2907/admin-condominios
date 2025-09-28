import React, { useState, useEffect } from "react";
import SectionTable from "../components/SectionTable";

const MantenimientosPage = () => {
  const [mantenimientos, setMantenimientos] = useState([]);

  // Mock data
  useEffect(() => {
    setMantenimientos([
      { id_mantenimiento: 1, descripcion: "Mantención ascensor", fecha: "2025-09-01", estado: "completado", costo: 1500000 },
      { id_mantenimiento: 2, descripcion: "Reparación tuberías", fecha: "2025-09-05", estado: "pendiente", costo: 800000 },
      { id_mantenimiento: 3, descripcion: "Limpieza de techos", fecha: "2025-09-10", estado: "en progreso", costo: 500000 },
    ]);
  }, []);

  const columns = [
    { title: "ID Mantenimiento", dataIndex: "id_mantenimiento", key: "id_mantenimiento" },
    { title: "Descripción", dataIndex: "descripcion", key: "descripcion" },
    { title: "Fecha", dataIndex: "fecha", key: "fecha" },
    { title: "Estado", dataIndex: "estado", key: "estado" },
    { title: "Costo", dataIndex: "costo", key: "costo", render: (value) => `$ ${value?.toLocaleString("es-CL") || 0}` },
  ];

  const handleAdd = () => {
    console.log("Agregar nuevo mantenimiento");
    // Implementar modal o API call
  };

  return (
    <SectionTable
      title="Mantenimientos"
      dataSource={mantenimientos}
      columns={columns}
      rowKey="id_mantenimiento"
      onAdd={handleAdd}
    />
  );
};

export default MantenimientosPage;