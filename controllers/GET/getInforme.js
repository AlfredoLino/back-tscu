const Bitacora = require("../../Models/Bitacora");


const controller = async (req, res, next) => {
    const {UsuarioId} = req.params
    try {
        const records = await Bitacora.findAll({where: {UsuarioId}})
        res.json({ok : true, records})
        
    } catch (error) {
        res.json({ok: false, message: "Error en la consulta"})
    }
}

module.exports = controller