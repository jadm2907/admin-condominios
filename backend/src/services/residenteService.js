const sequelize = require("../config/db");

class ResidenteService {
  static async getAll() {
    const [rows] = await sequelize.query(`
      SELECT r.*
      FROM Residente r
    `);
    return rows;
  }

  static async getById(id) {
    const [rows] = await sequelize.query(
      `SELECT r.* FROM Residente r WHERE r.id_residente = :id`,
      { replacements: { id } }
    );
    return rows[0] || null;
  }

  static async create(data) {
    const { nombre, apellido, rut, correo, telefono, tipo, estado } = data;
    const [result] = await sequelize.query(
      `INSERT INTO Residente (nombre, apellido, rut, correo, telefono, tipo, estado)
       VALUES (:nombre, :apellido, :rut, :correo, :telefono, :tipo, :estado)`,
      { replacements: { nombre, apellido, rut, correo, telefono, tipo, estado } }
    );
    return { id_residente: result, ...data };
  }

  static async update(id, data) {
    const fields = [];
    const replacements = { id };

    for (const key in data) {
      fields.push(`${key} = :${key}`);
      replacements[key] = data[key];
    }

    await sequelize.query(
      `UPDATE Residente SET ${fields.join(", ")} WHERE id_residente = :id`,
      { replacements }
    );

    return this.getById(id);
  }

  static async delete(id) {
    const [result] = await sequelize.query(
      `DELETE FROM Residente WHERE id_residente = :id`,
      { replacements: { id } }
    );
    return result.affectedRows > 0;
  }
}

module.exports = ResidenteService;
