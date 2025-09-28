import React, { useState, useEffect } from "react";
import SectionTable from "../components/SectionTable";

const ContratosPage = ({ data }) => {
  const [contratos, setContratos] = useState([]);

  // Mock data
  useEffect(() => {
    setContratos([
      { id_contrato: 1, id_proveedor: 1, fecha_inicio: "2025-01-01", fecha_fin: "2025-12-31", monto: 5000000, descripcion: "Contrato de suministro de agua" },
      { id_contrato: 2, id_proveedor: 2, fecha_inicio: "2025-02-01", fecha_fin: "2025-08-31", monto: 3000000, descripcion: "Mantenimiento eléctrico" },
      { id_contrato: 3, id_proveedor: 3, fecha_inicio: "2025-03-01", fecha_fin: "2025-09-30", monto: 2000000, descripcion: "Servicios de limpieza" },
    ]);
  }, []);

  const columns = [
    { title: "ID Contrato", dataIndex: "id_contrato", key: "id_contrato" },
    { title: "Proveedor", dataIndex: "id_proveedor", key: "id_proveedor", render: (id) => data.proveedores?.find((p) => p.id_proveedor === id)?.nombre || "-" },
    { title: "Fecha Inicio", dataIndex: "fecha_inicio", key: "fecha_inicio" },
    { title: "Fecha Fin", dataIndex: "fecha_fin", key: "fecha_fin" },
    { title: "Monto", dataIndex: "monto", key: "monto", render: (value) => `$ ${value?.toLocaleString("es-CL") || 0}` },
    { title: "Descripción", dataIndex: "descripcion", key: "descripcion" },
  ];

  const handleAdd = () => {
    console.log("Agregar nuevo contrato");
    // Implementar modal o API call
  };

  return (
    <SectionTable
      title="Contratos Proveedores"
      dataSource={contratos}
      columns={columns}
      rowKey="id_contrato"
      onAdd={handleAdd}
    />
  );
};

export default ContratosPage;