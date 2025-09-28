import React, { useState, useEffect } from "react";
import SectionTable from "../components/SectionTable";

const OrdenesPage = ({ data }) => {
  const [ordenes, setOrdenes] = useState([]);

  // Mock data
  useEffect(() => {
    setOrdenes([
      { id_orden: 1, id_proveedor: 1, fecha: "2025-08-10", monto: 450000, descripcion: "Compra de materiales" },
      { id_orden: 2, id_proveedor: 2, fecha: "2025-08-15", monto: 600000, descripcion: "Reparación eléctrica" },
      { id_orden: 3, id_proveedor: 3, fecha: "2025-09-01", monto: 300000, descripcion: "Servicio de limpieza" },
    ]);
  }, []);

  const columns = [
    { title: "ID Orden", dataIndex: "id_orden", key: "id_orden" },
    { title: "Proveedor", dataIndex: "id_proveedor", key: "id_proveedor", render: (id) => data.proveedores?.find((p) => p.id_proveedor === id)?.nombre || "-" },
    { title: "Fecha", dataIndex: "fecha", key: "fecha" },
    { title: "Monto", dataIndex: "monto", key: "monto", render: (value) => `$ ${value?.toLocaleString("es-CL") || 0}` },
    { title: "Descripción", dataIndex: "descripcion", key: "descripcion" },
  ];

  const handleAdd = () => {
    console.log("Agregar nueva orden de compra");
    // Implementar modal or API call
  };

  return (
    <SectionTable
      title="Órdenes de Compra"
      dataSource={ordenes}
      columns={columns}
      rowKey="id_orden"
      onAdd={handleAdd}
    />
  );
};

export default OrdenesPage;