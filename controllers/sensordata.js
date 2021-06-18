const Datos = require("../Models/Datos")

module.exports = (req, res, next) => {
    const {id, temperatura, distancia} = req.body
    Datos.create({
        UsuarioId: id,
        temperatura,
        distancia
    }).then(rec => {
        if(rec){
            res.status(201).json({
                ok: true
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(401).json({
            ok:false
        })
    })
}