-- ==========================================
-- Script de creación de base de datos
-- Administración de Condominios y Edificios
-- (corregido: evitar DEFAULT CURRENT_DATE para DATE)
-- ==========================================

CREATE DATABASE IF NOT EXISTS admin_condominios;
USE admin_condominios;

-- ===============================
-- Tablas Principales
-- ===============================

CREATE TABLE Condominio (
    id_condominio INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(200),
    rut VARCHAR(20),
    fondo_reserva DECIMAL(12,2) DEFAULT 0,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Unidad (
    id_unidad INT AUTO_INCREMENT PRIMARY KEY,
    id_condominio INT,
    tipo ENUM('departamento','bodega','estacionamiento'),
    numero VARCHAR(20),
    superficie DECIMAL(10,2),
    estado ENUM('ocupada','vacia'),
    FOREIGN KEY (id_condominio) REFERENCES Condominio(id_condominio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Residente (
    id_residente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    rut VARCHAR(20) UNIQUE,
    correo VARCHAR(150),
    telefono VARCHAR(20),
    tipo ENUM('propietario','arrendatario','visitante'),
    estado ENUM('activo','inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Residente_Unidad (
    id_residente INT,
    id_unidad INT,
    rol ENUM('propietario','arrendatario'),
    fecha_inicio DATE,
    fecha_fin DATE,
    PRIMARY KEY (id_residente, id_unidad),
    FOREIGN KEY (id_residente) REFERENCES Residente(id_residente),
    FOREIGN KEY (id_unidad) REFERENCES Unidad(id_unidad)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===============================
-- Finanzas
-- ===============================

CREATE TABLE Gasto_Comun (
    id_gasto INT AUTO_INCREMENT PRIMARY KEY,
    id_condominio INT,
    periodo VARCHAR(7), -- formato MM-YYYY
    monto_total DECIMAL(12,2),
    fecha_generacion DATE,
    FOREIGN KEY (id_condominio) REFERENCES Condominio(id_condominio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Detalle_Gasto_Comun (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_gasto INT,
    id_unidad INT,
    monto_cuota DECIMAL(12,2),
    estado ENUM('pendiente','pagado','moroso') DEFAULT 'pendiente',
    FOREIGN KEY (id_gasto) REFERENCES Gasto_Comun(id_gasto),
    FOREIGN KEY (id_unidad) REFERENCES Unidad(id_unidad)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Pago (
    id_pago INT AUTO_INCREMENT PRIMARY KEY,
    id_detalle INT,
    fecha_pago DATE,
    monto DECIMAL(12,2),
    metodo_pago ENUM('transferencia','efectivo','tarjeta'),
    referencia VARCHAR(100),
    FOREIGN KEY (id_detalle) REFERENCES Detalle_Gasto_Comun(id_detalle)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===============================
-- Personal y Proveedores
-- ===============================

CREATE TABLE Personal (
    id_personal INT AUTO_INCREMENT PRIMARY KEY,
    id_condominio INT,
    nombre VARCHAR(100),
    rut VARCHAR(20),
    cargo VARCHAR(50),
    fecha_ingreso DATE,
    contrato VARCHAR(200),
    FOREIGN KEY (id_condominio) REFERENCES Condominio(id_condominio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Turno (
    id_turno INT AUTO_INCREMENT PRIMARY KEY,
    id_personal INT,
    fecha DATE,
    hora_inicio TIME,
    hora_fin TIME,
    asistencia BOOLEAN,
    FOREIGN KEY (id_personal) REFERENCES Personal(id_personal)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Proveedor (
    id_proveedor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    rut VARCHAR(20),
    rubro VARCHAR(100),
    contacto VARCHAR(100),
    correo VARCHAR(150),
    telefono VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Contrato_Proveedor (
    id_contrato INT AUTO_INCREMENT PRIMARY KEY,
    id_proveedor INT,
    id_condominio INT,
    fecha_inicio DATE,
    fecha_fin DATE,
    monto DECIMAL(12,2),
    estado ENUM('activo','terminado'),
    FOREIGN KEY (id_proveedor) REFERENCES Proveedor(id_proveedor),
    FOREIGN KEY (id_condominio) REFERENCES Condominio(id_condominio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Orden_Compra (
    id_orden INT AUTO_INCREMENT PRIMARY KEY,
    id_proveedor INT,
    id_condominio INT,
    fecha DATE,
    detalle TEXT,
    monto DECIMAL(12,2),
    estado ENUM('pendiente','pagada'),
    FOREIGN KEY (id_proveedor) REFERENCES Proveedor(id_proveedor),
    FOREIGN KEY (id_condominio) REFERENCES Condominio(id_condominio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===============================
-- Seguridad y Accesos
-- ===============================

CREATE TABLE Visita (
    id_visita INT AUTO_INCREMENT PRIMARY KEY,
    id_unidad INT,
    nombre VARCHAR(100),
    rut VARCHAR(20),
    vehiculo VARCHAR(50),
    fecha_entrada DATETIME,
    fecha_salida DATETIME,
    registrado_por VARCHAR(100),
    FOREIGN KEY (id_unidad) REFERENCES Unidad(id_unidad)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Vehiculo (
    id_vehiculo INT AUTO_INCREMENT PRIMARY KEY,
    id_residente INT,
    patente VARCHAR(10),
    modelo VARCHAR(50),
    color VARCHAR(30),
    FOREIGN KEY (id_residente) REFERENCES Residente(id_residente)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===============================
-- Mantenimiento y Reclamos
-- ===============================

CREATE TABLE Mantenimiento (
    id_mant INT AUTO_INCREMENT PRIMARY KEY,
    id_condominio INT,
    tipo ENUM('preventivo','correctivo'),
    descripcion TEXT,
    fecha_programada DATE,
    fecha_realizada DATE,
    estado ENUM('pendiente','en_progreso','cerrado'),
    FOREIGN KEY (id_condominio) REFERENCES Condominio(id_condominio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Reclamo (
    id_reclamo INT AUTO_INCREMENT PRIMARY KEY,
    id_residente INT,
    id_unidad INT,
    fecha DATE,
    descripcion TEXT,
    estado ENUM('abierto','en_proceso','cerrado'),
    FOREIGN KEY (id_residente) REFERENCES Residente(id_residente),
    FOREIGN KEY (id_unidad) REFERENCES Unidad(id_unidad)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Ticket_Mantenimiento (
    id_ticket INT AUTO_INCREMENT PRIMARY KEY,
    id_reclamo INT,
    id_mant INT,
    responsable VARCHAR(100),
    estado ENUM('pendiente','en_proceso','cerrado'),
    FOREIGN KEY (id_reclamo) REFERENCES Reclamo(id_reclamo),
    FOREIGN KEY (id_mant) REFERENCES Mantenimiento(id_mant)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===============================
-- Comunicación y Documentos
-- ===============================

CREATE TABLE Comunicado (
    id_comunicado INT AUTO_INCREMENT PRIMARY KEY,
    id_condominio INT,
    titulo VARCHAR(200),
    mensaje TEXT,
    fecha_publicacion DATE,
    publicado_por VARCHAR(100),
    FOREIGN KEY (id_condominio) REFERENCES Condominio(id_condominio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Asamblea (
    id_asamblea INT AUTO_INCREMENT PRIMARY KEY,
    id_condominio INT,
    fecha DATE,
    tipo ENUM('ordinaria','extraordinaria'),
    acta VARCHAR(200),
    FOREIGN KEY (id_condominio) REFERENCES Condominio(id_condominio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Votacion (
    id_votacion INT AUTO_INCREMENT PRIMARY KEY,
    id_asamblea INT,
    asunto VARCHAR(200),
    resultado VARCHAR(50),
    FOREIGN KEY (id_asamblea) REFERENCES Asamblea(id_asamblea)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Voto (
    id_voto INT AUTO_INCREMENT PRIMARY KEY,
    id_votacion INT,
    id_residente INT,
    opcion ENUM('si','no','abstencion'),
    FOREIGN KEY (id_votacion) REFERENCES Votacion(id_votacion),
    FOREIGN KEY (id_residente) REFERENCES Residente(id_residente)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===============================
-- Seguridad del Sistema
-- ===============================

CREATE TABLE Usuario_Sistema (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password_hash VARCHAR(255),
    rol ENUM('admin','residente','conserje','contador'),
    estado ENUM('activo','inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Auditoria (
    id_auditoria INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    accion VARCHAR(200),
    entidad_afectada VARCHAR(100),
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip VARCHAR(50),
    FOREIGN KEY (id_usuario) REFERENCES Usuario_Sistema(id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- QUERYS

SELECT * FROM Condominio;
SELECT * FROM Unidad;
SELECT * FROM Residente;
SELECT * FROM Residente_Unidad;


ALTER TABLE Residente_Unidad 
  ADD COLUMN id_residente_unidad INT AUTO_INCREMENT PRIMARY KEY FIRST;

CREATE INDEX idx_residente_unidad_residente ON Residente_Unidad (id_residente);
CREATE INDEX idx_residente_unidad_unidad ON Residente_Unidad (id_unidad);
CREATE INDEX idx_residente_unidad_rol ON Residente_Unidad (rol);

-- 1. Eliminar la PK compuesta
ALTER TABLE Residente_Unidad 
  DROP PRIMARY KEY;

-- 2. Agregar nueva columna autoincremental como PK
ALTER TABLE Residente_Unidad 
  ADD COLUMN id_residente_unidad INT AUTO_INCREMENT PRIMARY KEY FIRST;

-- 3. Asegurar relaciones como FKs
ALTER TABLE Residente_Unidad 
  ADD CONSTRAINT fk_residente_unidad_residente
    FOREIGN KEY (id_residente) REFERENCES Residente(id_residente)
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Residente_Unidad 
  ADD CONSTRAINT fk_residente_unidad_unidad
    FOREIGN KEY (id_unidad) REFERENCES Unidad(id_unidad)
    ON DELETE CASCADE ON UPDATE CASCADE;

-- 4. Índices para mejorar performance
CREATE INDEX idx_residente_unidad_residente ON Residente_Unidad (id_residente);
CREATE INDEX idx_residente_unidad_unidad ON Residente_Unidad (id_unidad);
CREATE INDEX idx_residente_unidad_rol ON Residente_Unidad (rol);

CREATE TABLE Residente_Unidad (
    -- NUEVA CLAVE PRIMARIA
    id_residente_unidad INT AUTO_INCREMENT PRIMARY KEY, 
    
    -- Antiguas columnas y FKs
    id_residente INT NOT NULL,
    id_unidad INT NOT NULL,
    rol ENUM('propietario','arrendatario'),
    fecha_inicio DATE,
    fecha_fin DATE,

    -- Restricción de unicidad para la relación (esencial)
    UNIQUE KEY uk_residente_unidad (id_residente, id_unidad),

    -- Claves Foráneas
    FOREIGN KEY (id_residente) REFERENCES Residente(id_residente),
    FOREIGN KEY (id_unidad) REFERENCES Unidad(id_unidad)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



-- INDEXES

CREATE INDEX idx_condominio_nombre ON Condominio (nombre);
CREATE INDEX idx_unidad_condominio ON Unidad (id_condominio);
CREATE UNIQUE INDEX idx_residente_rut ON Residente (rut);
CREATE INDEX idx_residente_correo ON Residente (correo);
CREATE INDEX idx_residente_unidad_estado ON Residente_Unidad (estado);
