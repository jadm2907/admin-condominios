import React, { useState, useEffect } from "react";
import SectionTable from "../components/SectionTable";

const TicketsPage = () => {
  const [tickets, setTickets] = useState([]);

  // Mock data
  useEffect(() => {
    setTickets([
      { id_ticket: 1, descripcion: "Reparación portón", fecha: "2025-09-04", estado: "pendiente", prioridad: "Alta" },
      { id_ticket: 2, descripcion: "Mantenimiento caldera", fecha: "2025-09-05", estado: "en progreso", prioridad: "Media" },
      { id_ticket: 3, descripcion: "Cambio de luminarias", fecha: "2025-09-06", estado: "completado", prioridad: "Baja" },
    ]);
  }, []);

  const columns = [
    { title: "ID Ticket", dataIndex: "id_ticket", key: "id_ticket" },
    { title: "Descripción", dataIndex: "descripcion", key: "descripcion" },
    { title: "Fecha", dataIndex: "fecha", key: "fecha" },
    { title: "Estado", dataIndex: "estado", key: "estado" },
    { title: "Prioridad", dataIndex: "prioridad", key: "prioridad" },
  ];

  const handleAdd = () => {
    console.log("Agregar nuevo ticket");
    // Implementar modal o API call
  };

  return (
    <SectionTable
      title="Tickets de Mantenimiento"
      dataSource={tickets}
      columns={columns}
      rowKey="id_ticket"
      onAdd={handleAdd}
    />
  );
};

export default TicketsPage;