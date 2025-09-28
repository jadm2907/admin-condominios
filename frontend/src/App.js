import React, { useState, useEffect } from "react";
import MainLayout from "./layouts/MainLayout";

function App() {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [data, setData] = useState({
    condominios: [],
    unidades: [],
    residentes: [],
    relaciones: [],
    gastos: [],
    detalleGastos: [],
    pagos: [],
    personal: [],
    turnos: [],
    proveedores: [],
    contratos: [],
    ordenes: [],
    visitas: [],
    vehiculos: [],
    mantenimientos: [],
    reclamos: [],
    tickets: [],
    comunicados: [],
    asambleas: [],
    votaciones: [],
    votos: [],
    usuarios: [],
    logs: [],
  });
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Mock data for all sections (centralized for dashboard)
    setData({
      condominios: [
        { id_condominio: 1, nombre: "Condominio Los Olivos", direccion: "Av. Principal 123, Santiago", rut: "76.123.456-7", fondo_reserva: 15000000 },
        { id_condominio: 2, nombre: "Condominio Las Palmas", direccion: "Calle Norte 456, Viña del Mar", rut: "77.987.654-3", fondo_reserva: 8200000 },
      ],
      unidades: [
        { id_unidad: 1, id_condominio: 1, numero: "101A", tipo: "departamento", superficie: 75.5, estado: "ocupada" },
        { id_unidad: 2, id_condominio: 1, numero: "102B", tipo: "departamento", superficie: 80.0, estado: "vacía" },
        { id_unidad: 3, id_condominio: 2, numero: "B-01", tipo: "bodega", superficie: 10.0, estado: "ocupada" },
      ],
      residentes: [
        { id_residente: 1, nombre: "Juan", apellido: "Pérez", rut: "12.345.678-9", correo: "juan.perez@mail.com", telefono: "+56 9 1234 5678", tipo: "propietario", id_unidad: 1 },
        { id_residente: 2, nombre: "María", apellido: "López", rut: "98.765.432-1", correo: "maria.lopez@mail.com", telefono: "+56 9 8765 4321", tipo: "arrendatario", id_unidad: 2 },
        { id_residente: 3, nombre: "Pedro", apellido: "González", rut: "11.223.344-5", correo: "pedro.gonzalez@mail.com", telefono: "+56 9 3344 5566", tipo: "propietario", id_unidad: 3 },
      ],
      relaciones: [
        { id_relacion: 1, id_residente: 1, id_unidad: 1, rol: "propietario" },
        { id_relacion: 2, id_residente: 2, id_unidad: 2, rol: "arrendatario" },
        { id_relacion: 3, id_residente: 3, id_unidad: 3, rol: "propietario" },
      ],
      gastos: [
        { id_gasto: 1, id_condominio: 1, mes: "2025-08", monto_total: 5000000, descripcion: "Gastos comunes agosto" },
        { id_gasto: 2, id_condominio: 1, mes: "2025-09", monto_total: 5200000, descripcion: "Gastos comunes septiembre" },
        { id_gasto: 3, id_condominio: 2, mes: "2025-08", monto_total: 3000000, descripcion: "Gastos comunes agosto" },
      ],
      detalleGastos: [
        { id_detalle: 1, id_gasto: 1, descripcion: "Luz común", monto: 1200000, fecha: "2025-08-01" },
        { id_detalle: 2, id_gasto: 1, descripcion: "Agua", monto: 800000, fecha: "2025-08-01" },
        { id_detalle: 3, id_gasto: 2, descripcion: "Mantenimiento ascensor", monto: 1500000, fecha: "2025-09-01" },
        { id_detalle: 4, id_gasto: 3, descripcion: "Limpieza", monto: 900000, fecha: "2025-08-01" },
      ],
      pagos: [
        { id_pago: 1, id_residente: 1, fecha: "2025-08-15", monto: 250000, metodo: "Transferencia" },
        { id_pago: 2, id_residente: 2, fecha: "2025-08-16", monto: 200000, metodo: "Efectivo" },
        { id_pago: 3, id_residente: 3, fecha: "2025-09-01", monto: 300000, metodo: "Tarjeta" },
      ],
      personal: [
        { id_personal: 1, nombre: "Carlos", apellido: "Gómez", cargo: "Conserje", telefono: "+56 9 1122 3344", correo: "carlos.gomez@condos.com" },
        { id_personal: 2, nombre: "Ana", apellido: "Martínez", cargo: "Administradora", telefono: "+56 9 2233 4455", correo: "ana.martinez@condos.com" },
        { id_personal: 3, nombre: "Luis", apellido: "Rodríguez", cargo: "Seguridad", telefono: "+56 9 3344 5566", correo: "luis.rodriguez@condos.com" },
      ],
      turnos: [
        { id_turno: 1, id_personal: 1, fecha: "2025-09-01", horario: "08:00-16:00", descripcion: "Turno matutino" },
        { id_turno: 2, id_personal: 2, fecha: "2025-09-01", horario: "09:00-17:00", descripcion: "Turno administrativo" },
        { id_turno: 3, id_personal: 3, fecha: "2025-09-02", horario: "16:00-00:00", descripcion: "Turno nocturno" },
      ],
      proveedores: [
        { id_proveedor: 1, nombre: "Agua Limpia Ltda.", rubro: "Servicios de Agua", telefono: "+56 2 2345 6789", correo: "contacto@agualimpia.cl" },
        { id_proveedor: 2, nombre: "ElectroFix", rubro: "Mantenimiento Eléctrico", telefono: "+56 2 3456 7890", correo: "info@electrofix.cl" },
        { id_proveedor: 3, nombre: "Limpieza Total", rubro: "Limpieza", telefono: "+56 2 4567 8901", correo: "ventas@limpiezatotal.cl" },
      ],
      contratos: [
        { id_contrato: 1, id_proveedor: 1, fecha_inicio: "2025-01-01", fecha_fin: "2025-12-31", monto: 5000000, descripcion: "Contrato de suministro de agua" },
        { id_contrato: 2, id_proveedor: 2, fecha_inicio: "2025-02-01", fecha_fin: "2025-08-31", monto: 3000000, descripcion: "Mantenimiento eléctrico" },
        { id_contrato: 3, id_proveedor: 3, fecha_inicio: "2025-03-01", fecha_fin: "2025-09-30", monto: 2000000, descripcion: "Servicios de limpieza" },
      ],
      ordenes: [
        { id_orden: 1, id_proveedor: 1, fecha: "2025-08-10", monto: 450000, descripcion: "Compra de materiales" },
        { id_orden: 2, id_proveedor: 2, fecha: "2025-08-15", monto: 600000, descripcion: "Reparación eléctrica" },
        { id_orden: 3, id_proveedor: 3, fecha: "2025-09-01", monto: 300000, descripcion: "Servicio de limpieza" },
      ],
      visitas: [
        { id_visita: 1, id_residente: 1, nombre: "Carlos Ramírez", motivo: "Reunión", fecha: "2025-09-01", hora: "10:00" },
        { id_visita: 2, id_residente: 2, nombre: "Sofía Torres", motivo: "Visita familiar", fecha: "2025-09-02", hora: "14:00" },
        { id_visita: 3, id_residente: 3, nombre: "Andrés Vega", motivo: "Entrega", fecha: "2025-09-03", hora: "16:30" },
      ],
      vehiculos: [
        { id_vehiculo: 1, id_residente: 1, id_unidad: 1, patente: "ABCD-12", marca: "Toyota", modelo: "Corolla" },
        { id_vehiculo: 2, id_residente: 2, id_unidad: 2, patente: "WXYZ-34", marca: "Honda", modelo: "Civic" },
        { id_vehiculo: 3, id_residente: 3, id_unidad: 3, patente: "LMNO-56", marca: "Ford", modelo: "Fiesta" },
      ],
      mantenimientos: [
        { id_mantenimiento: 1, descripcion: "Mantención ascensor", fecha: "2025-09-01", estado: "completado", costo: 1500000 },
        { id_mantenimiento: 2, descripcion: "Reparación tuberías", fecha: "2025-09-05", estado: "pendiente", costo: 800000 },
        { id_mantenimiento: 3, descripcion: "Limpieza de techos", fecha: "2025-09-10", estado: "en progreso", costo: 500000 },
      ],
      reclamos: [
        { id_reclamo: 1, id_residente: 1, asunto: "Ruido excesivo", fecha: "2025-09-02", estado: "abierto" },
        { id_reclamo: 2, id_residente: 2, asunto: "Fuga de agua", fecha: "2025-09-03", estado: "en revisión" },
        { id_reclamo: 3, id_residente: 3, asunto: "Problema eléctrico", fecha: "2025-09-04", estado: "cerrado" },
      ],
      tickets: [
        { id_ticket: 1, descripcion: "Reparación portón", fecha: "2025-09-04", estado: "pendiente", prioridad: "Alta" },
        { id_ticket: 2, descripcion: "Mantenimiento caldera", fecha: "2025-09-05", estado: "en progreso", prioridad: "Media" },
        { id_ticket: 3, descripcion: "Cambio de luminarias", fecha: "2025-09-06", estado: "completado", prioridad: "Baja" },
      ],
      comunicados: [
        { id_comunicado: 1, titulo: "Corte de agua programado", contenido: "Habrá corte de agua el 01/10/2025 de 10:00 a 14:00.", fecha: "2025-09-28", estado: "publicado" },
        { id_comunicado: 2, titulo: "Asamblea general", contenido: "Convocatoria para asamblea el 05/10/2025.", fecha: "2025-09-27", estado: "borrador" },
        { id_comunicado: 3, titulo: "Mantenimiento áreas comunes", contenido: "Limpieza de jardines programada para el 03/10/2025.", fecha: "2025-09-26", estado: "publicado" },
      ],
      asambleas: [
        { id_asamblea: 1, titulo: "Asamblea Anual 2025", fecha: "2025-10-05", hora: "18:00", lugar: "Salón Comunal", estado: "programada" },
        { id_asamblea: 2, titulo: "Asamblea Extraordinaria", fecha: "2025-09-30", hora: "19:00", lugar: "Zoom", estado: "completada" },
        { id_asamblea: 3, titulo: "Revisión Presupuesto", fecha: "2025-11-01", hora: "17:00", lugar: "Salón Comunal", estado: "programada" },
      ],
      votaciones: [
        { id_votacion: 1, id_asamblea: 1, pregunta: "¿Aprobar el presupuesto 2025?", fecha_inicio: "2025-10-05", fecha_fin: "2025-10-06", estado: "abierta" },
        { id_votacion: 2, id_asamblea: 2, pregunta: "¿Renovar contrato de limpieza?", fecha_inicio: "2025-09-30", fecha_fin: "2025-10-01", estado: "cerrada" },
        { id_votacion: 3, id_asamblea: 3, pregunta: "¿Instalar cámaras adicionales?", fecha_inicio: "2025-11-01", fecha_fin: "2025-11-02", estado: "programada" },
      ],
      votos: [
        { id_voto: 1, id_votacion: 1, id_residente: 1, voto: "Sí", fecha: "2025-10-05" },
        { id_voto: 2, id_votacion: 1, id_residente: 2, voto: "No", fecha: "2025-10-05" },
        { id_voto: 3, id_votacion: 2, id_residente: 3, voto: "Sí", fecha: "2025-09-30" },
      ],
      usuarios: [
        { id_usuario: 1, id_residente: 1, nombre_usuario: "admin1", correo: "admin1@condos.com", rol: "Administrador", fecha_creacion: "2025-01-01" },
        { id_usuario: 2, id_residente: 2, nombre_usuario: "staff1", correo: "staff1@condos.com", rol: "Personal", fecha_creacion: "2025-02-01" },
        { id_usuario: 3, id_residente: null, nombre_usuario: "superadmin", correo: "superadmin@condos.com", rol: "Superadministrador", fecha_creacion: "2025-03-01" },
      ],
      logs: [
        { id_log: 1, id_usuario: 1, accion: "Creó un condominio", fecha: "2025-09-28 10:00:00", detalles: "Condominio ID: 1" },
        { id_log: 2, id_usuario: 2, accion: "Actualizó residente", fecha: "2025-09-28 12:30:00", detalles: "Residente ID: 2" },
        { id_log: 3, id_usuario: 3, accion: "Eliminó gasto", fecha: "2025-09-28 15:45:00", detalles: "Gasto ID: 3" },
      ],
    });

    // Mock user data
    setUser({
      id_usuario: 1,
      nombre_usuario: "admin1",
      rol: "Administrador",
      correo: "admin1@condos.com",
    });

    // Mock notifications data
    setNotifications([
      { id_notificacion: 1, titulo: "Nuevo Reclamo", mensaje: "Se ha registrado un nuevo reclamo sobre ruido excesivo.", fecha: "2025-09-28 10:00", leida: false },
      { id_notificacion: 2, titulo: "Asamblea Programada", mensaje: "Asamblea Anual 2025 programada para el 05/10/2025.", fecha: "2025-09-27 15:30", leida: true },
      { id_notificacion: 3, titulo: "Pago Recibido", mensaje: "Se recibió un pago de $300,000 el 01/09/2025.", fecha: "2025-09-27 09:00", leida: false },
    ]);
  }, []);

  return (
    <MainLayout
      selectedKey={selectedKey}
      setSelectedKey={setSelectedKey}
      data={data}
      user={user}
      notifications={notifications}
    />
  );
}

export default App;