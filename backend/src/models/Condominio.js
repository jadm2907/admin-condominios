// ==============================
// Modelo: Condominio
// ==============================
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Condominio = sequelize.define(
  "Condominio",
  {
    id_condominio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING(200),
    },
    rut: {
      type: DataTypes.STRING(20),
    },
    fondo_reserva: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Condominio",
    timestamps: false, // porque usamos fecha_creacion manual
  }
);

module.exports = Condominio;
