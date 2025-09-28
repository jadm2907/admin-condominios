import React, { useState, useEffect } from "react";
import SectionTable from "../components/SectionTable";

const UsuariosPage = ({ data }) => {
  const [usuarios, setUsuarios] = useState([]);

  // Mock data
  useEffect(() => {
    setUsuarios([
      { id_usuario: 1, id_residente: 1, nombre_usuario: "admin1", correo: "admin1@condos.com", rol: "Administrador", fecha_creacion: "2025-01-01" },
      { id_usuario: 2, id_residente: 2, nombre_usuario: "staff1", correo: "staff1@condos.com", rol: "Personal", fecha_creacion: "2025-02-01" },
      { id_usuario: 3, id_residente: null, nombre_usuario: "superadmin", correo: "superadmin@condos.com", rol: "Superadministrador", fecha_creacion: "2025-03-01" },
    ]);
  }, []);

  const columns = [
    { title: "ID Usuario", dataIndex: "id_usuario", key: "id_usuario" },
    { title: "Nombre de Usuario", dataIndex: "nombre_usuario", key: "nombre_usuario" },
    { title: "Correo", dataIndex: "correo", key: "correo" },
    { title: "Rol", dataIndex: "rol", key: "rol" },
    { title: "Residente", dataIndex: "id_residente", key: "id_residente", render: (id) => {
      const residente = data.residentes?.find((r) => r.id_residente === id);
      return residente ? `${residente.nombre} ${residente.apellido}` : "-";
    }},
    { title: "Fecha de Creación", dataIndex: "fecha_creacion", key: "fecha_creacion" },
  ];

  const handleAdd = () => {
    console.log("Agregar nuevo usuario");
    // Implementar modal o API call
  };

  return (
    <SectionTable
      title="Usuarios del Sistema"
      dataSource={usuarios}
      columns={columns}
      rowKey="id_usuario"
      onAdd={handleAdd}
    />
  );
};

export default UsuariosPage;