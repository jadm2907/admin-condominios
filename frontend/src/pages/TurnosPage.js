import React, { useState, useEffect } from "react";
import SectionTable from "../components/SectionTable";

const TurnosPage = ({ data }) => {
  const [turnos, setTurnos] = useState([]);

  // Mock data
  useEffect(() => {
    setTurnos([
      { id_turno: 1, id_personal: 1, fecha: "2025-09-01", horario: "08:00-16:00", descripcion: "Turno matutino" },
      { id_turno: 2, id_personal: 2, fecha: "2025-09-01", horario: "09:00-17:00", descripcion: "Turno administrativo" },
      { id_turno: 3, id_personal: 3, fecha: "2025-09-02", horario: "16:00-00:00", descripcion: "Turno nocturno" },
    ]);
  }, []);

  const columns = [
    { title: "ID Turno", dataIndex: "id_turno", key: "id_turno" },
    { title: "Personal", dataIndex: "id_personal", key: "id_personal", render: (id) => {
      const persona = data.personal?.find((p) => p.id_personal === id);
      return persona ? `${persona.nombre} ${persona.apellido}` : "-";
    }},
    { title: "Fecha", dataIndex: "fecha", key: "fecha" },
    { title: "Horario", dataIndex: "horario", key: "horario" },
    { title: "Descripción", dataIndex: "descripcion", key: "descripcion" },
  ];

  const handleAdd = () => {
    console.log("Agregar nuevo turno");
    // Implementar modal o API call
  };

  return (
    <SectionTable
      title="Turnos"
      dataSource={turnos}
      columns={columns}
      rowKey="id_turno"
      onAdd={handleAdd}
    />
  );
};

export default TurnosPage;