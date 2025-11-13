import {
    getAllConductores,
    getConductorById,
    createConductor,
    updateConductor,
    deleteConductor
} from '../models/conductorModel.js';

export const obtenerConductores = async (req, res) => {
    try{
        const conductores = await getAllConductores();
        res.json (conductores)
    }catch(error){
        console.error("Error al obtener conductores:", error);
        res.status(500).json({message: "Error al obtener conductores"});
    }
};

//aqui lo obtengo por id
export const obtenerConductorId = async (req, res) => {
    try{
        const condutor = await getConductorById(req.params.id);
        if(!condutor) return res.status(404).json({message: "Conductor no encontrado"});
        res.json (condutor)
    }catch(error){
        console.error("Error al obtener conductor:", error);
        res.status(500).json({message: "Error al obtener conductor"});
    }
};

//creamos el conductor
export const crearConductor = async (req,res)=>{
    try{
        const nuevoConductor = await createConductor(req.body);
        res.status(201).json(nuevoConductor);
    }catch(error){
        console.error("Error al crear conductor:", error);
        res.status(500).json({message: "Error al crear conductor"});
    }
}

//actualizamos el conductor
export const actualizarConductor = async (req,res)=>{   
    try{
        const conductorActualizado = await updateConductor(req.params.id, req.body);
        res.json(conductorActualizado);
    }catch(error){
        console.error("Error al actualizar conductor:", error); 
        res.status(500).json({message: "Error al actualizar conductor"});
    }
}

//eliminamos el conductor
export const eliminarConductor = async (req,res)=>{
    try{
        await deleteConductor(req.params.id);  
        res.json({message: "Conductor eliminado correctamente"});
    }catch(error){
        console.error("Error al eliminar conductor:", error);
        res.status(500).json({message: "Error al eliminar conductor"});
    }   
}