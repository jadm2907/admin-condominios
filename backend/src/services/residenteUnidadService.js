// src/services/residenteUnidadService.js
const ResidenteUnidad = require("../models/Residente_Unidad");

class ResidenteUnidadService {
  async getAll() {
    return await ResidenteUnidad.findAll({ where: { estado: 1 } });
  }

  async getById(id) {
    return await ResidenteUnidad.findOne({ where: { id_residente_unidad: id, estado: 1 } });
  }

  async create(data) {
    return await ResidenteUnidad.create({ ...data, estado: 1 });
  }

  async update(id, data) {
    const residenteUnidad = await this.getById(id);
    if (!residenteUnidad) return null;
    return await residenteUnidad.update({
      ...data,
      fecha_modificacion: new Date(),
    });
  }

  async delete(id) {
    const residenteUnidad = await this.getById(id);
    if (!residenteUnidad) return null;

    await residenteUnidad.update({
      estado: 0,
      fecha_eliminacion: new Date(),
    });

    return residenteUnidad;
  }
}

module.exports = new ResidenteUnidadService();
