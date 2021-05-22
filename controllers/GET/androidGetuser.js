const User = require("../../Models/User")

module.exports.controller =  async (req, res, next) => {
    
    console.log(req.params);
    const { email, pass } = req.params
    try {
        const record = await User.findAll({
            where: {
                email,
                pass
            }
        })
        if(record.length > 0){
            const [user] = record
            const token = jwt.sign({iduser : user.id, email: user.email}, process.env.JWTKEY)
            res.status(201).send(token)    
        }
        else 
            res.status(400).send("Error")
    } catch (error) {
        console.log(error)
        res.status(401).json({ ok : false, msg: "No se ha podido iniciar sesión. Revise sus credenciales."})
    }
}