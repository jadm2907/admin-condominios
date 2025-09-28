import React from "react";
import { Menu, Typography, Drawer } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Text } = Typography;

const Sidebar = ({ selectedKey, onSelect, user, visible, onClose, isMobile, isLandscape }) => {
  const menuItems = [
    { key: "dashboard", label: "Dashboard" },
    {
      key: "condominios",
      label: "Condominios",
      children: [
        { key: "condominios", label: "Condominios" },
        { key: "unidades", label: "Unidades" },
        { key: "residentes", label: "Residentes" },
        { key: "residente_unidad", label: "Relaciones Residente-Unidad" },
      ],
    },
    {
      key: "finanzas",
      label: "Finanzas",
      children: [
        { key: "gastos", label: "Gastos Comunes" },
        { key: "detalle_gastos", label: "Detalle de Gastos" },
        { key: "pagos", label: "Pagos" },
      ],
    },
    {
      key: "personal_proveedores",
      label: "Personal y Proveedores",
      children: [
        { key: "personal", label: "Personal" },
        { key: "turnos", label: "Turnos" },
        { key: "proveedores", label: "Proveedores" },
        { key: "contratos", label: "Contratos" },
        { key: "ordenes", label: "Órdenes de Compra" },
      ],
    },
    {
      key: "seguridad_acceso",
      label: "Seguridad y Acceso",
      children: [
        { key: "visitas", label: "Visitas" },
        { key: "vehiculos", label: "Vehículos" },
      ],
    },
    {
      key: "mantenimiento_reclamos",
      label: "Mantenimiento y Reclamos",
      children: [
        { key: "mantenimientos", label: "Mantenimientos" },
        { key: "reclamos", label: "Reclamos" },
        { key: "tickets", label: "Tickets" },
      ],
    },
    {
      key: "comunicacion_documentos",
      label: "Comunicación y Documentos",
      children: [
        { key: "comunicados", label: "Comunicados" },
        { key: "asambleas", label: "Asambleas" },
        { key: "votaciones", label: "Votaciones" },
        { key: "votos", label: "Votos" },
      ],
    },
    {
      key: "auditoria_seguridad",
      label: "Auditoría y Seguridad",
      children: [
        { key: "usuarios", label: "Usuarios" },
        { key: "logs", label: "Auditoría" },
      ],
    },
  ];

  const sidebarContent = (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={({ key }) => {
          onSelect(key);
          if (isMobile) onClose();
        }}
        items={menuItems}
        style={{ flex: 1, padding: "8px 0" }}
      />
      <div
        style={{
          padding: isMobile ? "16px" : "16px 8px",
          color: "#fff",
          textAlign: "center",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          background: "rgba(0, 0, 0, 0.2)",
          fontSize: isMobile && isLandscape ? "12px" : "14px",
        }}
      >
        <UserOutlined style={{ marginRight: "8px", fontSize: isMobile ? "16px" : "14px" }} />
        <Text
          style={{ color: "#fff" }}
          ellipsis={{ tooltip: user ? `${user.nombre_usuario} (${user.rol})` : "Usuario" }}
        >
          {user ? `${user.nombre_usuario} (${user.rol})` : "Usuario"}
        </Text>
      </div>
    </div>
  );

  return isMobile ? (
    <Drawer
      placement="left"
      closable={true}
      onClose={onClose}
      visible={visible}
      width={isLandscape ? "50%" : "80%"}
      bodyStyle={{ padding: 0, background: "#001529" }}
    >
      {sidebarContent}
    </Drawer>
  ) : (
    sidebarContent
  );
};

export default Sidebar;