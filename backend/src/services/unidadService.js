const sequelize = require("../config/db");

class UnidadService {
  static async getAll() {
    const [rows] = await sequelize.query(`
      SELECT u.*, c.nombre AS nombre_condominio, c.direccion AS direccion_condominio
      FROM Unidad u
      JOIN Condominio c ON u.id_condominio = c.id_condominio
    `);
    return rows;
  }

  static async getById(id) {
    const [rows] = await sequelize.query(`
      SELECT u.*, c.nombre AS nombre_condominio, c.direccion AS direccion_condominio
      FROM Unidad u
      JOIN Condominio c ON u.id_condominio = c.id_condominio
      WHERE u.id_unidad = :id
    `, { replacements: { id } });
    return rows[0] || null;
  }

  static async create(data) {
    const { id_condominio, tipo, numero, superficie, estado } = data;
    const [result] = await sequelize.query(
      `INSERT INTO Unidad (id_condominio, tipo, numero, superficie, estado) 
       VALUES (:id_condominio, :tipo, :numero, :superficie, :estado)`,
      { replacements: { id_condominio, tipo, numero, superficie, estado } }
    );
    return { id_unidad: result, ...data };
  }

  static async update(id, data) {
    const fields = [];
    const replacements = { id };

    for (const key in data) {
      fields.push(`${key} = :${key}`);
      replacements[key] = data[key];
    }

    await sequelize.query(
      `UPDATE Unidad SET ${fields.join(", ")} WHERE id_unidad = :id`,
      { replacements }
    );

    return this.getById(id);
  }

  static async delete(id) {
    const [result] = await sequelize.query(
      `DELETE FROM Unidad WHERE id_unidad = :id`,
      { replacements: { id } }
    );
    return result.affectedRows > 0;
  }
}

module.exports = UnidadService;
