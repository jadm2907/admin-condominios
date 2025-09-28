import React, { useState, useEffect } from "react";
import SectionTable from "../components/SectionTable";

const DetalleGastosPage = ({ data }) => {
  const [detalleGastos, setDetalleGastos] = useState([]);

  // Mock data
  useEffect(() => {
    setDetalleGastos([
      { id_detalle: 1, id_gasto: 1, descripcion: "Luz común", monto: 1200000, fecha: "2025-08-01" },
      { id_detalle: 2, id_gasto: 1, descripcion: "Agua", monto: 800000, fecha: "2025-08-01" },
      { id_detalle: 3, id_gasto: 2, descripcion: "Mantenimiento ascensor", monto: 1500000, fecha: "2025-09-01" },
      { id_detalle: 4, id_gasto: 3, descripcion: "Limpieza", monto: 900000, fecha: "2025-08-01" },
    ]);
  }, []);

  const columns = [
    { title: "ID Detalle", dataIndex: "id_detalle", key: "id_detalle" },
    { title: "ID Gasto", dataIndex: "id_gasto", key: "id_gasto" },
    { title: "Descripción", dataIndex: "descripcion", key: "descripcion" },
    { title: "Monto", dataIndex: "monto", key: "monto", render: (value) => `$ ${value?.toLocaleString("es-CL") || 0}` },
    { title: "Fecha", dataIndex: "fecha", key: "fecha" },
  ];

  const handleAdd = () => {
    console.log("Agregar nuevo detalle de gasto");
    // Implementar modal o API call
  };

  return (
    <SectionTable
      title="Detalle de Gastos"
      dataSource={detalleGastos}
      columns={columns}
      rowKey="id_detalle"
      onAdd={handleAdd}
    />
  );
};

export default DetalleGastosPage;