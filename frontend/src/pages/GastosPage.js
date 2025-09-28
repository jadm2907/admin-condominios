import React, { useState, useEffect } from "react";
import SectionTable from "../components/SectionTable";

const GastosPage = ({ data }) => {
  const [gastos, setGastos] = useState([]);

  // Mock data
  useEffect(() => {
    setGastos([
      { id_gasto: 1, id_condominio: 1, mes: "2025-08", monto_total: 5000000, descripcion: "Gastos comunes agosto" },
      { id_gasto: 2, id_condominio: 1, mes: "2025-09", monto_total: 5200000, descripcion: "Gastos comunes septiembre" },
      { id_gasto: 3, id_condominio: 2, mes: "2025-08", monto_total: 3000000, descripcion: "Gastos comunes agosto" },
    ]);
  }, []);

  const columns = [
    { title: "ID Gasto", dataIndex: "id_gasto", key: "id_gasto" },
    { title: "Condominio", dataIndex: "id_condominio", key: "id_condominio", render: (id) => data.condominios?.find((c) => c.id_condominio === id)?.nombre || "-" },
    { title: "Mes", dataIndex: "mes", key: "mes" },
    { title: "Monto Total", dataIndex: "monto_total", key: "monto_total", render: (value) => `$ ${value?.toLocaleString("es-CL") || 0}` },
    { title: "Descripción", dataIndex: "descripcion", key: "descripcion" },
  ];

  const handleAdd = () => {
    console.log("Agregar nuevo gasto");
    // Implementar modal o API call
  };

  return (
    <SectionTable
      title="Gastos Comunes"
      dataSource={gastos}
      columns={columns}
      rowKey="id_gasto"
      onAdd={handleAdd}
    />
  );
};

export default GastosPage;