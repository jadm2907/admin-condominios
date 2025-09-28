import React, { useState, useEffect } from "react";
import SectionTable from "../components/SectionTable";

const VehiculosPage = ({ data }) => {
  const [vehiculos, setVehiculos] = useState([]);

  // Mock data
  useEffect(() => {
    setVehiculos([
      { id_vehiculo: 1, id_residente: 1, id_unidad: 1, patente: "ABCD-12", marca: "Toyota", modelo: "Corolla" },
      { id_vehiculo: 2, id_residente: 2, id_unidad: 2, patente: "WXYZ-34", marca: "Honda", modelo: "Civic" },
      { id_vehiculo: 3, id_residente: 3, id_unidad: 3, patente: "LMNO-56", marca: "Ford", modelo: "Fiesta" },
    ]);
  }, []);

  const columns = [
    { title: "ID Vehículo", dataIndex: "id_vehiculo", key: "id_vehiculo" },
    { title: "Residente", dataIndex: "id_residente", key: "id_residente", render: (id) => {
      const residente = data.residentes?.find((r) => r.id_residente === id);
      return residente ? `${residente.nombre} ${residente.apellido}` : "-";
    }},
    { title: "Unidad", dataIndex: "id_unidad", key: "id_unidad", render: (id) => data.unidades?.find((u) => u.id_unidad === id)?.numero || "-" },
    { title: "Patente", dataIndex: "patente", key: "patente" },
    { title: "Marca", dataIndex: "marca", key: "marca" },
    { title: "Modelo", dataIndex: "modelo", key: "modelo" },
  ];

  const handleAdd = () => {
    console.log("Agregar nuevo vehículo");
    // Implementar modal o API call
  };

  return (
    <SectionTable
      title="Vehículos"
      dataSource={vehiculos}
      columns={columns}
      rowKey="id_vehiculo"
      onAdd={handleAdd}
    />
  );
};

export default VehiculosPage;