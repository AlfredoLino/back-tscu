const User = require("../../Models/User")

module.exports = async (req, res, next) => {
    const {id} = req.body
    try {
        const record = await User.findOne({
            where : {
                id
            }
        })
        if(record){
            res.status(201).json({
                ok : true,
                user: record
            })
            return 
        }
        res.status(404).json({
            ok : false
        })
        
        
    } catch (error) {
        res.status(404).json({
            ok : false
        })
    }
}