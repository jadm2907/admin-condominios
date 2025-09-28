import React, { useState, useEffect } from "react";
import SectionTable from "../components/SectionTable";

const VotosPage = ({ data }) => {
  const [votos, setVotos] = useState([]);

  // Mock data
  useEffect(() => {
    setVotos([
      { id_voto: 1, id_votacion: 1, id_residente: 1, voto: "Sí", fecha: "2025-10-05" },
      { id_voto: 2, id_votacion: 1, id_residente: 2, voto: "No", fecha: "2025-10-05" },
      { id_voto: 3, id_votacion: 2, id_residente: 3, voto: "Sí", fecha: "2025-09-30" },
    ]);
  }, []);

  const columns = [
    { title: "ID Voto", dataIndex: "id_voto", key: "id_voto" },
    { title: "Votación", dataIndex: "id_votacion", key: "id_votacion", render: (id) => data.votaciones?.find((v) => v.id_votacion === id)?.pregunta || "-" },
    { title: "Residente", dataIndex: "id_residente", key: "id_residente", render: (id) => {
      const residente = data.residentes?.find((r) => r.id_residente === id);
      return residente ? `${residente.nombre} ${residente.apellido}` : "-";
    }},
    { title: "Voto", dataIndex: "voto", key: "voto" },
    { title: "Fecha", dataIndex: "fecha", key: "fecha" },
  ];

  const handleAdd = () => {
    console.log("Agregar nuevo voto");
    // Implementar modal o API call
  };

  return (
    <SectionTable
      title="Votos"
      dataSource={votos}
      columns={columns}
      rowKey="id_voto"
      onAdd={handleAdd}
    />
  );
};

export default VotosPage;