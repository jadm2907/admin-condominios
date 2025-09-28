import React, { useState, useEffect } from "react";
import SectionTable from "../components/SectionTable";

const ProveedoresPage = () => {
  const [proveedores, setProveedores] = useState([]);

  // Mock data
  useEffect(() => {
    setProveedores([
      { id_proveedor: 1, nombre: "Agua Limpia Ltda.", rubro: "Servicios de Agua", telefono: "+56 2 2345 6789", correo: "contacto@agualimpia.cl" },
      { id_proveedor: 2, nombre: "ElectroFix", rubro: "Mantenimiento Eléctrico", telefono: "+56 2 3456 7890", correo: "info@electrofix.cl" },
      { id_proveedor: 3, nombre: "Limpieza Total", rubro: "Limpieza", telefono: "+56 2 4567 8901", correo: "ventas@limpiezatotal.cl" },
    ]);
  }, []);

  const columns = [
    { title: "ID Proveedor", dataIndex: "id_proveedor", key: "id_proveedor" },
    { title: "Nombre", dataIndex: "nombre", key: "nombre" },
    { title: "Rubro", dataIndex: "rubro", key: "rubro" },
    { title: "Teléfono", dataIndex: "telefono", key: "telefono" },
    { title: "Correo", dataIndex: "correo", key: "correo" },
  ];

  const handleAdd = () => {
    console.log("Agregar nuevo proveedor");
    // Implementar modal o API call
  };

  return (
    <SectionTable
      title="Proveedores"
      dataSource={proveedores}
      columns={columns}
      rowKey="id_proveedor"
      onAdd={handleAdd}
    />
  );
};

export default ProveedoresPage;