import React, { useState, useEffect } from "react";
import SectionTable from "../components/SectionTable";

const VotacionesPage = ({ data }) => {
  const [votaciones, setVotaciones] = useState([]);

  // Mock data
  useEffect(() => {
    setVotaciones([
      { id_votacion: 1, id_asamblea: 1, pregunta: "¿Aprobar el presupuesto 2025?", fecha_inicio: "2025-10-05", fecha_fin: "2025-10-06", estado: "abierta" },
      { id_votacion: 2, id_asamblea: 2, pregunta: "¿Renovar contrato de limpieza?", fecha_inicio: "2025-09-30", fecha_fin: "2025-10-01", estado: "cerrada" },
      { id_votacion: 3, id_asamblea: 3, pregunta: "¿Instalar cámaras adicionales?", fecha_inicio: "2025-11-01", fecha_fin: "2025-11-02", estado: "programada" },
    ]);
  }, []);

  const columns = [
    { title: "ID Votación", dataIndex: "id_votacion", key: "id_votacion" },
    { title: "Asamblea", dataIndex: "id_asamblea", key: "id_asamblea", render: (id) => data.asambleas?.find((a) => a.id_asamblea === id)?.titulo || "-" },
    { title: "Pregunta", dataIndex: "pregunta", key: "pregunta" },
    { title: "Fecha Inicio", dataIndex: "fecha_inicio", key: "fecha_inicio" },
    { title: "Fecha Fin", dataIndex: "fecha_fin", key: "fecha_fin" },
    { title: "Estado", dataIndex: "estado", key: "estado" },
  ];

  const handleAdd = () => {
    console.log("Agregar nueva votación");
    // Implementar modal o API call
  };

  return (
    <SectionTable
      title="Votaciones"
      dataSource={votaciones}
      columns={columns}
      rowKey="id_votacion"
      onAdd={handleAdd}
    />
  );
};

export default VotacionesPage;