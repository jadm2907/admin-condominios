import React from "react";
import SectionTable from "../components/SectionTable";

const columns = [
  { title: "ID", dataIndex: "id_condominio", key: "id_condominio" },
  { title: "Nombre", dataIndex: "nombre", key: "nombre" },
  { title: "Dirección", dataIndex: "direccion", key: "direccion" },
  { title: "RUT", dataIndex: "rut", key: "rut" },
  { title: "Fondo de Reserva", dataIndex: "fondo_reserva", key: "fondo_reserva", render: (value) => `$ ${value?.toLocaleString("es-CL") || 0}` },
];

const CondominiosPage = ({ data }) => {
  const handleAdd = () => {
    console.log("Agregar nuevo condominio");
    // Implementar modal o API call
  };

  return (
    <SectionTable
      title="Condominios"
      dataSource={data}
      columns={columns}
      rowKey="id_condominio"
      onAdd={handleAdd}
    />
  );
};

export default CondominiosPage;