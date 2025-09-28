import React from "react";
import SectionTable from "../components/SectionTable";

const ResidentesPage = ({ data }) => {
  const columns = [
    { title: "ID", dataIndex: "id_residente", key: "id_residente" },
    { title: "Nombre", dataIndex: "nombre", key: "nombre" },
    { title: "Apellido", dataIndex: "apellido", key: "apellido" },
    { title: "RUT", dataIndex: "rut", key: "rut" },
    { title: "Correo", dataIndex: "correo", key: "correo" },
    { title: "Teléfono", dataIndex: "telefono", key: "telefono" },
    { title: "Tipo", dataIndex: "tipo", key: "tipo" },
    { title: "Unidad", dataIndex: "id_unidad", key: "id_unidad", render: (id) => data.unidades?.find((u) => u.id_unidad === id)?.numero || "-" },
  ];

  const handleAdd = () => {
    console.log("Agregar nuevo residente");
  };

  return (
    <SectionTable
      title="Residentes"
      dataSource={data.residentes}
      columns={columns}
      rowKey="id_residente"
      onAdd={handleAdd}
    />
  );
};

export default ResidentesPage;