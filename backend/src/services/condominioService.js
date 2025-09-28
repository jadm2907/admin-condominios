const sequelize = require("../config/db");

class CondominioService {
  static async getAll() {
    const [rows] = await sequelize.query(`
      SELECT * FROM Condominio
    `);
    return rows;
  }

  static async getById(id) {
    const [rows] = await sequelize.query(
      `SELECT * FROM Condominio WHERE id_condominio = :id`,
      { replacements: { id } }
    );
    return rows[0] || null;
  }

  static async create(data) {
    const { nombre, direccion, rut, fondo_reserva } = data;
    const [result] = await sequelize.query(
      `INSERT INTO Condominio (nombre, direccion, rut, fondo_reserva)
       VALUES (:nombre, :direccion, :rut, :fondo_reserva)`,
      { replacements: { nombre, direccion, rut, fondo_reserva } }
    );
    return { id_condominio: result, ...data };
  }

  static async update(id, data) {
    const fields = [];
    const replacements = { id };

    for (const key in data) {
      fields.push(`${key} = :${key}`);
      replacements[key] = data[key];
    }

    await sequelize.query(
      `UPDATE Condominio SET ${fields.join(", ")} WHERE id_condominio = :id`,
      { replacements }
    );

    return this.getById(id);
  }

  static async delete(id) {
    const [result] = await sequelize.query(
      `DELETE FROM Condominio WHERE id_condominio = :id`,
      { replacements: { id } }
    );
    return result.affectedRows > 0;
  }
}

module.exports = CondominioService;
