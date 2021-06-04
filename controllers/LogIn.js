const User = require("../Models/User")
const jwt = require('jsonwebtoken')

const controller = async (req, res, next) => {
    const { email, pass } = req.body
    try {
        const record = await User.findAll({
            where: {
                email,
                pass
            }
        })
        if(record.length > 0){

            const [user] = record
            const token = jwt.sign({id : user.id, email: user.email}, process.env.JWTKEY)
            req.session.user = {
                email : user.email,
                id: user.id,
                nombre: user.nombre
            };
            console.log(req.session)
            res.status(201).json({ok : true, token, pf:user.photoProfile, email: user.email, nombre : user.nombre, id : user.id})    
            next()
        }
        else 
            throw new Error("No hay registro")
    } catch (error) {
        res.status(401).json({ ok : false, msg: "No se ha podido iniciar sesión. Revise sus credenciales."})
    }
    
}

module.exports = controller