// src/services/condominioService.js
const Condominio = require('../models/Condominio');



class CondominioService {
  async getAll() {
    return await Condominio.findAll({
      where: { estado: 1 },
      order: [['id_condominio', 'ASC']]
    });
  }

  async getById(id) {
    return await Condominio.findOne({
      where: { id_condominio: id, estado: 1 }
    });
  }

  async create(data) {
    return await Condominio.create(data);
  }

  async update(id, data) {
    const [updated] = await Condominio.update(data, {
      where: { id_condominio: id, estado: 1 }
    });
    return updated > 0;
  }

  async delete(id) {
  // Buscar el condominio por ID
  const condominio = await Condominio.findOne({ where: { id_condominio: id } });

  if (!condominio) {
    return false; // No existe
  }

  if (condominio.estado === 0) {
    return false; // Ya estaba eliminado
  }

  // Soft delete: marcar eliminado y registrar fecha
  condominio.estado = 0;
  condominio.fecha_eliminacion = new Date();

  await condominio.save();

  return true;
}
}

module.exports = new CondominioService();

