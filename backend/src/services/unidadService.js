// src/services/unidadService.js
const Unidad = require('../models/Unidad');

class UnidadService {
  async getAll() {
    return await Unidad.findAll({
      where: { estado: 1 },
      order: [['id_unidad', 'ASC']]
    });
  }

  async getById(id) {
    return await Unidad.findOne({
      where: { id_unidad: id, estado: 1 }
    });
  }

  async create(data) {
    return await Unidad.create(data);
  }

  async update(id, data) {
    const [updated] = await Unidad.update(data, {
      where: { id_unidad: id, estado: 1 }
    });
    return updated > 0;
  }

  async delete(id) {
    const [updated] = await Unidad.update(
      { estado: 0, fecha_eliminacion: new Date() },
      { where: { id_unidad: id, estado: 1 } }
    );
    return updated > 0;
  }
}

module.exports = new UnidadService();

