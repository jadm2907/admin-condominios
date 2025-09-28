import React, { useState, useEffect } from "react";
import SectionTable from "../components/SectionTable";

const ComunicadosPage = () => {
  const [comunicados, setComunicados] = useState([]);

  // Mock data
  useEffect(() => {
    setComunicados([
      { id_comunicado: 1, titulo: "Corte de agua programado", contenido: "Habrá corte de agua el 01/10/2025 de 10:00 a 14:00.", fecha: "2025-09-28", estado: "publicado" },
      { id_comunicado: 2, titulo: "Asamblea general", contenido: "Convocatoria para asamblea el 05/10/2025.", fecha: "2025-09-27", estado: "borrador" },
      { id_comunicado: 3, titulo: "Mantenimiento áreas comunes", contenido: "Limpieza de jardines programada para el 03/10/2025.", fecha: "2025-09-26", estado: "publicado" },
    ]);
  }, []);

  const columns = [
    { title: "ID Comunicado", dataIndex: "id_comunicado", key: "id_comunicado" },
    { title: "Título", dataIndex: "titulo", key: "titulo" },
    { title: "Contenido", dataIndex: "contenido", key: "contenido", render: (text) => text.length > 50 ? `${text.slice(0, 50)}...` : text },
    { title: "Fecha", dataIndex: "fecha", key: "fecha" },
    { title: "Estado", dataIndex: "estado", key: "estado" },
  ];

  const handleAdd = () => {
    console.log("Agregar nuevo comunicado");
    // Implementar modal o API call
  };

  return (
    <SectionTable
      title="Comunicados"
      dataSource={comunicados}
      columns={columns}
      rowKey="id_comunicado"
      onAdd={handleAdd}
    />
  );
};

export default ComunicadosPage;