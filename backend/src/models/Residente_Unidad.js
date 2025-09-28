// src/models/Residente_Unidad.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ResidenteUnidad = sequelize.define(
  "Residente_Unidad",
  {
    id_residente_unidad: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_residente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_unidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM("propietario", "arrendatario"),
      allowNull: true,
    },
    fecha_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    fecha_fin: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    fecha_modificacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    fecha_eliminacion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    estado: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
  },
  {
    tableName: "Residente_Unidad",
    timestamps: false,
  }
);

module.exports = ResidenteUnidad;
