// src/services/residenteService.js
const Residente = require('../models/Residente');

class ResidenteService {
  async getAll() {
    return await Residente.findAll({
      where: { estado: 1 },
      order: [['id_residente', 'ASC']]
    });
  }

  async getById(id) {
    return await Residente.findOne({
      where: { id_residente: id, estado: 1 }
    });
  }

  async create(data) {
    return await Residente.create(data);
  }

  async update(id, data) {
    const [updated] = await Residente.update(data, {
      where: { id_residente: id, estado: 1 }
    });
    return updated > 0;
  }

  async delete(id) {
    const [updated] = await Residente.update(
      { estado: 0, fecha_eliminacion: new Date() },
      { where: { id_residente: id, estado: 1 } }
    );
    return updated > 0;
  }
}

module.exports = new ResidenteService();

