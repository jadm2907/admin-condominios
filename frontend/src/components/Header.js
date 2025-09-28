import React from "react";
import { Layout, Dropdown, Menu, Badge, Avatar } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";

const { Header: AntHeader } = Layout;

const Header = ({ user, notifications }) => {
  // Notification menu
  const notificationMenu = (
    <Menu>
      {notifications.length > 0 ? (
        notifications.map((notif) => (
          <Menu.Item key={notif.id_notificacion}>
            <div>
              <strong>{notif.titulo}</strong>
              <div>{notif.mensaje}</div>
              <div style={{ fontSize: "12px", color: "#888" }}>{notif.fecha}</div>
            </div>
          </Menu.Item>
        ))
      ) : (
        <Menu.Item>No hay notificaciones</Menu.Item>
      )}
    </Menu>
  );

  // User menu
  const userMenu = (
    <Menu>
      <Menu.Item key="profile">Perfil</Menu.Item>
      <Menu.Item key="logout">Cerrar Sesión</Menu.Item>
    </Menu>
  );

  return (
    <AntHeader style={{ background: "#fff", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ fontSize: "18px", fontWeight: "bold" }}>Sistema de Administración de Condominios</div>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Dropdown overlay={notificationMenu} trigger={["click"]}>
          <Badge count={notifications.filter(n => !n.leida).length}>
            <BellOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
          </Badge>
        </Dropdown>
        <Dropdown overlay={userMenu} trigger={["click"]}>
          <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
            <Avatar icon={<UserOutlined />} style={{ marginRight: "8px" }} />
            <span>{user ? `${user.nombre_usuario} (${user.rol})` : "Usuario"}</span>
          </div>
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header;