const con = require('../Models/dbcon');
const User = require("../Models/User")


const controller = (req, res, next) => {
        
    const {email, pass} = req.body
    User.create({ email, pass }).then( inf => {
        res.status(201).json({
            ok: true,
            message: "Cuenta creada con exito!"
        })
    }).catch( err => { 
    
        switch (err.parent.code) {
            case "ER_DUP_ENTRY":
                res.status(401).json({ok: false, err: err.parent.code, message: "El correo ya habia sido registrado previamente"})        
                break;
            default:
                res.status(400).json({ok : false, err, message: "Error en el servidor. Intentar mas tarde o ponerse en contacto con soporte."})
                break;
        }
        
        
    })
    
    
}

module.exports = controller