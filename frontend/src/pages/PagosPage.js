import React, { useState, useEffect } from "react";
import SectionTable from "../components/SectionTable";

const PagosPage = ({ data }) => {
  const [pagos, setPagos] = useState([]);

  // Mock data
  useEffect(() => {
    setPagos([
      { id_pago: 1, id_residente: 1, fecha: "2025-08-15", monto: 250000, metodo: "Transferencia" },
      { id_pago: 2, id_residente: 2, fecha: "2025-08-16", monto: 200000, metodo: "Efectivo" },
      { id_pago: 3, id_residente: 3, fecha: "2025-09-01", monto: 300000, metodo: "Tarjeta" },
    ]);
  }, []);

  const columns = [
    { title: "ID Pago", dataIndex: "id_pago", key: "id_pago" },
    { title: "Residente", dataIndex: "id_residente", key: "id_residente", render: (id) => {
      const residente = data.residentes?.find((r) => r.id_residente === id);
      return residente ? `${residente.nombre} ${residente.apellido}` : "-";
    }},
    { title: "Fecha", dataIndex: "fecha", key: "fecha" },
    { title: "Monto", dataIndex: "monto", key: "monto", render: (value) => `$ ${value?.toLocaleString("es-CL") || 0}` },
    { title: "Método", dataIndex: "metodo", key: "metodo" },
  ];

  const handleAdd = () => {
    console.log("Agregar nuevo pago");
    // Implementar modal o API call
  };

  return (
    <SectionTable
      title="Pagos"
      dataSource={pagos}
      columns={columns}
      rowKey="id_pago"
      onAdd={handleAdd}
    />
  );
};

export default PagosPage;