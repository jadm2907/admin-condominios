import React from "react";
import { Layout, theme } from "antd";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import CondominiosPage from "../pages/CondominiosPage";
import UnidadesPage from "../pages/UnidadesPage";
import ResidentesPage from "../pages/ResidentesPage";
import RelacionesPage from "../pages/RelacionesPage";
import GastosPage from "../pages/GastosPage";
import DetalleGastosPage from "../pages/DetalleGastosPage";
import PagosPage from "../pages/PagosPage";
import PersonalPage from "../pages/PersonalPage";
import TurnosPage from "../pages/TurnosPage";
import ProveedoresPage from "../pages/ProveedoresPage";
import ContratosPage from "../pages/ContratosPage";
import OrdenesPage from "../pages/OrdenesPage";
import VisitasPage from "../pages/VisitasPage";
import VehiculosPage from "../pages/VehiculosPage";
import MantenimientosPage from "../pages/MantenimientosPage";
import ReclamosPage from "../pages/ReclamosPage";
import TicketsPage from "../pages/TicketsPage";
import ComunicadosPage from "../pages/ComunicadosPage";
import AsambleasPage from "../pages/AsambleasPage";
import VotacionesPage from "../pages/VotacionesPage";
import VotosPage from "../pages/VotosPage";
import UsuariosPage from "../pages/UsuariosPage";
import LogsPage from "../pages/LogsPage";

const { Content, Sider } = Layout;

const MainLayout = ({ selectedKey, setSelectedKey, data, user, notifications }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const renderContent = () => {
    switch (selectedKey) {
      case "dashboard":
        return <Dashboard data={data} />;
      case "condominios":
        return <CondominiosPage data={data.condominios} />;
      case "unidades":
        return <UnidadesPage data={data} />;
      case "residentes":
        return <ResidentesPage data={data} />;
      case "residente_unidad":
        return <RelacionesPage data={data} />;
      case "gastos":
        return <GastosPage data={data} />;
      case "detalle_gastos":
        return <DetalleGastosPage data={data} />;
      case "pagos":
        return <PagosPage data={data} />;
      case "personal":
        return <PersonalPage />;
      case "turnos":
        return <TurnosPage data={data} />;
      case "proveedores":
        return <ProveedoresPage />;
      case "contratos":
        return <ContratosPage data={data} />;
      case "ordenes":
        return <OrdenesPage data={data} />;
      case "visitas":
        return <VisitasPage data={data} />;
      case "vehiculos":
        return <VehiculosPage data={data} />;
      case "mantenimientos":
        return <MantenimientosPage />;
      case "reclamos":
        return <ReclamosPage data={data} />;
      case "tickets":
        return <TicketsPage />;
      case "comunicados":
        return <ComunicadosPage />;
      case "asambleas":
        return <AsambleasPage />;
      case "votaciones":
        return <VotacionesPage data={data} />;
      case "votos":
        return <VotosPage data={data} />;
      case "usuarios":
        return <UsuariosPage data={data} />;
      case "logs":
        return <LogsPage data={data} />;
      default:
        return <div><h2>Pantalla: {selectedKey}</h2><p>Aquí cargaremos el módulo seleccionado.</p></div>;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <div style={{ height: 32, margin: 16, background: "rgba(255, 255, 255, 0.3)", borderRadius: 6, textAlign: "center", color: "#fff", lineHeight: "32px", fontWeight: "bold" }}>Nomos</div>
        <Sidebar selectedKey={selectedKey} onSelect={setSelectedKey} user={user} />
      </Sider>
      <Layout>
        <Header user={user} notifications={notifications} />
        <Content style={{ margin: "16px" }}>
          <div style={{ padding: 24, background: colorBgContainer, borderRadius: 8 }}>
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;