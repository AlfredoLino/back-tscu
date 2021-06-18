const Datos = require("../../Models/Datos");

module.exports = (req, res, next) =>{
    Datos.findAll().then(data => {
        const records = data.map(rec => {
            
            const {temperatura, distancia, createdAt} = rec.dataValues
            const dateString =createdAt.toISOString()
            const [fecha, horarw] = dateString.split("T")
            const hora = horarw.split(".")[0]
            const created = `${fecha}/${hora}`
            return {temperatura, distancia, created}
            
        })
        res.status(201).json({
            ...records
        })
    }).catch(err => {
        console.log(err)
        res.status(404).json({
            ok:false,
            message: "Error al obtener los datos"
        })
    })
}