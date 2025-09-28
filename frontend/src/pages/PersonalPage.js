import React, { useState, useEffect } from "react";
import SectionTable from "../components/SectionTable";

const PersonalPage = () => {
  const [personal, setPersonal] = useState([]);

  // Mock data
  useEffect(() => {
    setPersonal([
      { id_personal: 1, nombre: "Carlos", apellido: "Gómez", cargo: "Conserje", telefono: "+56 9 1122 3344", correo: "carlos.gomez@condos.com" },
      { id_personal: 2, nombre: "Ana", apellido: "Martínez", cargo: "Administradora", telefono: "+56 9 2233 4455", correo: "ana.martinez@condos.com" },
      { id_personal: 3, nombre: "Luis", apellido: "Rodríguez", cargo: "Seguridad", telefono: "+56 9 3344 5566", correo: "luis.rodriguez@condos.com" },
    ]);
  }, []);

  const columns = [
    { title: "ID", dataIndex: "id_personal", key: "id_personal" },
    { title: "Nombre", dataIndex: "nombre", key: "nombre" },
    { title: "Apellido", dataIndex: "apellido", key: "apellido" },
    { title: "Cargo", dataIndex: "cargo", key: "cargo" },
    { title: "Teléfono", dataIndex: "telefono", key: "telefono" },
    { title: "Correo", dataIndex: "correo", key: "correo" },
  ];

  const handleAdd = () => {
    console.log("Agregar nuevo personal");
    // Implementar modal o API call
  };

  return (
    <SectionTable
      title="Personal"
      dataSource={personal}
      columns={columns}
      rowKey="id_personal"
      onAdd={handleAdd}
    />
  );
};

export default PersonalPage;