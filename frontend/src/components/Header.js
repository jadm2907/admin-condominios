import React from "react";
import { Layout, Dropdown, Menu, Badge, Avatar, Button } from "antd";
import { BellOutlined, UserOutlined, MenuOutlined } from "@ant-design/icons";

const { Header: AntHeader } = Layout;

const Header = ({ user, notifications, onMenuToggle, isMobile, isLandscape }) => {
  // Notification menu
  const notificationMenu = (
    <Menu
      style={{
        minWidth: isMobile ? (isLandscape ? "300px" : "280px") : "300px",
        maxHeight: isMobile ? "400px" : "300px",
        overflowY: "auto",
        padding: "8px 0",
        borderRadius: "4px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
      }}
    >
      {notifications.length > 0 ? (
        notifications.map((notif) => (
          <Menu.Item
            key={notif.id_notificacion}
            style={{
              padding: "12px 16px",
              margin: "4px 0",
              background: "#f9f9f9",
              borderLeft: "4px solid #1890ff",
              borderRadius: "2px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div style={{ width: "100%" }}>
              <strong style={{ fontSize: isMobile ? "16px" : "16px", color: "#1890ff" }}>{notif.titulo}</strong>
              <div
                style={{
                  fontSize: isMobile ? "14px" : "14px",
                  marginTop: "4px",
                  wordWrap: "break-word",
                  lineHeight: "1.4",
                }}
              >
                {notif.mensaje}
              </div>
              <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>{notif.fecha}</div>
            </div>
          </Menu.Item>
        ))
      ) : (
        <Menu.Item style={{ padding: "12px 16px", textAlign: "center" }}>
          No hay notificaciones
        </Menu.Item>
      )}
    </Menu>
  );

  // User menu
  const userMenu = (
    <Menu>
      <Menu.Item key="profile" style={{ padding: "8px 16px" }}>Perfil</Menu.Item>
      <Menu.Item key="logout" style={{ padding: "8px 16px" }}>Cerrar Sesión</Menu.Item>
    </Menu>
  );

  // Combined mobile menu
  const mobileMenu = (
    <Menu style={{ minWidth: isMobile ? (isLandscape ? "300px" : "280px") : "250px" }}>
      <Menu.SubMenu
        key="notifications"
        title={
          <span style={{ fontSize: isMobile ? "16px" : "16px" }}>
            <Badge count={notifications.filter(n => !n.leida).length} style={{ marginRight: "8px" }}>
              <BellOutlined />
            </Badge>
            Notificaciones
          </span>
        }
        icon={<BellOutlined />}
        style={{ padding: "8px 16px" }}
      >
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <Menu.Item
              key={notif.id_notificacion}
              style={{
                padding: "12px 16px",
                margin: "4px 0",
                background: "#f9f9f9",
                borderLeft: "4px solid #1890ff",
                borderRadius: "2px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div style={{ width: "100%" }}>
                <strong style={{ fontSize: isMobile ? "16px" : "16px", color: "#1890ff" }}>{notif.titulo}</strong>
                <div
                  style={{
                    fontSize: isMobile ? "14px" : "14px",
                    marginTop: "4px",
                    wordWrap: "break-word",
                    lineHeight: "1.4",
                  }}
                >
                  {notif.mensaje}
                </div>
                <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>{notif.fecha}</div>
              </div>
            </Menu.Item>
          ))
        ) : (
          <Menu.Item style={{ padding: "12px 16px", textAlign: "center" }}>
            No hay notificaciones
          </Menu.Item>
        )}
      </Menu.SubMenu>
      <Menu.SubMenu
        key="user"
        title={<span style={{ fontSize: isMobile ? "16px" : "16px" }}>{user ? `${user.nombre_usuario} (${user.rol})` : "Usuario"}</span>}
        icon={<UserOutlined />}
        style={{ padding: "8px 16px" }}
      >
        <Menu.Item key="profile" style={{ padding: "8px 16px" }}>Perfil</Menu.Item>
        <Menu.Item key="logout" style={{ padding: "8px 16px" }}>Cerrar Sesión</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

  return (
    <AntHeader
      style={{
        background: "#fff",
        padding: isMobile ? "0 8px" : "0 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        height: isMobile ? (isLandscape ? "60px" : "50px") : "64px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {isMobile && (
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={onMenuToggle}
            style={{
              fontSize: "20px",
              padding: "8px",
              marginRight: "8px",
              height: "40px",
              width: "40px",
            }}
          />
        )}
        <div
          style={{
            fontSize: isMobile ? "16px" : "18px",
            fontWeight: "bold",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: isMobile ? (isLandscape ? "200px" : "150px") : "300px",
          }}
        >
          Sistema de Administración de Condominios
        </div>
      </div>
      {isMobile ? (
        <Dropdown overlay={mobileMenu} trigger={["click"]} overlayStyle={{ minWidth: isMobile ? (isLandscape ? "300px" : "280px") : "250px" }}>
          <Button
            type="text"
            icon={<UserOutlined />}
            style={{
              fontSize: "20px",
              padding: "8px",
              height: "40px",
              width: "40px",
            }}
          />
        </Dropdown>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "10px" : "20px" }}>
          <Dropdown overlay={notificationMenu} trigger={["click"]}>
            <Badge count={notifications.filter(n => !n.leida).length} style={{ padding: "4px" }}>
              <BellOutlined style={{ fontSize: "22px", cursor: "pointer", padding: "8px" }} />
            </Badge>
          </Dropdown>
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
              <Avatar icon={<UserOutlined />} style={{ marginRight: "8px" }} />
              <span style={{ fontSize: isMobile ? "14px" : "16px" }}>
                {user ? `${user.nombre_usuario} (${user.rol})` : "Usuario"}
              </span>
            </div>
          </Dropdown>
        </div>
      )}
    </AntHeader>
  );
};

export default Header;