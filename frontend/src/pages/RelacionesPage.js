import React from "react";
import SectionTable from "../components/SectionTable";

const RelacionesPage = ({ data }) => {
  const columns = [
    { title: "ID Relación", dataIndex: "id_relacion", key: "id_relacion" },
    { title: "Residente", dataIndex: "id_residente", key: "id_residente", render: (id) => {
      const residente = data.residentes?.find((r) => r.id_residente === id);
      return residente ? `${residente.nombre} ${residente.apellido}` : "-";
    }},
    { title: "Unidad", dataIndex: "id_unidad", key: "id_unidad", render: (id) => data.unidades?.find((u) => u.id_unidad === id)?.numero || "-" },
    { title: "Rol", dataIndex: "rol", key: "rol" },
  ];

  const handleAdd = () => {
    console.log("Agregar nueva relación");
  };

  return (
    <SectionTable
      title="Relación Residente – Unidad"
      dataSource={data.relaciones}
      columns={columns}
      rowKey="id_relacion"
      onAdd={handleAdd}
    />
  );
};

export default RelacionesPage;