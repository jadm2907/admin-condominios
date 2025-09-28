// backend/src/models/Unidad.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Unidad = sequelize.define("Unidad", {
  id_unidad: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_condominio: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM("departamento", "bodega", "estacionamiento"),
    allowNull: true,
  },
  numero: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  superficie: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  fecha_eliminacion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  estado: {
    type: DataTypes.ENUM("ocupada", "vacia"),
    allowNull: true,
  },
}, {
  tableName: "Unidad",
  timestamps: false,
});

module.exports = Unidad;
