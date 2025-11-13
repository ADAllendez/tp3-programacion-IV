import * as vehiculosModel from '../models/vehiculosModel.js';


export const vehiculosController = {
    getAll: async (req, res) => {
        try {
            const data = await vehiculosModel.getAll();
            res.json(data);
        } catch (error) {
            console.error("Error al obtener vehículos:", error);
            res.status(500).json({ message: "Error al obtener vehículos" });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const vehiculo = await vehiculosModel.getById(id);
            if (!vehiculo) return res.status(404).json({ message: "Vehículo no encontrado" });
            res.json(vehiculo);
        } catch (error) {
            console.error("Error al obtener vehículo:", error);
            res.status(500).json({ message: "Error al obtener vehículo" });
        }
    },
    create: async (req, res) => {
        try {
            const vehiculo = await vehiculosModel.create(req.body);
            res.status(201).json(vehiculo);
        } catch (error) {
            res.status(500).json({ message: "Error al crear vehículo" });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const vehiculo = await vehiculosModel.update(id, req.body);
            res.json(vehiculo);
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar vehículo" });
        }
    },
    remove: async (req, res) => {
        try {
            const { id } = req.params;
            await vehiculosModel.remove(id);
            res.json({ message: "Vehículo eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar vehículo" });
        }
    },
};