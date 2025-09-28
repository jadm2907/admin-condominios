// backend/src/models/Residente.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Residente = sequelize.define("Residente", {
  id_residente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  rut: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING(150),
    allowNull: true,
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  tipo: {
    type: DataTypes.ENUM("propietario", "arrendatario", "visitante"),
    defaultValue: "propietario",
  },
  estado: {
    type: DataTypes.ENUM("activo", "inactivo"),
    defaultValue: "activo",
  },
}, {
  tableName: "Residente",
  timestamps: false,
});

module.exports = Residente;
