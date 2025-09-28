import React from "react";
import SectionTable from "../components/SectionTable";

const UnidadesPage = ({ data }) => {
  const columns = [
    { title: "ID", dataIndex: "id_unidad", key: "id_unidad" },
    { title: "Número", dataIndex: "numero", key: "numero" },
    { title: "Tipo", dataIndex: "tipo", key: "tipo" },
    { title: "Superficie (m²)", dataIndex: "superficie", key: "superficie" },
    { title: "Estado", dataIndex: "estado", key: "estado" },
    { title: "Condominio", dataIndex: "id_condominio", key: "id_condominio", render: (id) => data.condominios?.find((c) => c.id_condominio === id)?.nombre || "-" },
  ];

  const handleAdd = () => {
    console.log("Agregar nueva unidad");
  };

  return (
    <SectionTable
      title="Unidades"
      dataSource={data.unidades}
      columns={columns}
      rowKey="id_unidad"
      onAdd={handleAdd}
    />
  );
};

export default UnidadesPage;