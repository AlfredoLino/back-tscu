const User = require("../Models/User")

module.exports = async (id) => {
    try {
        const record = await User.findOne({
            where : {
                id
            }
        })
        if(record){
            return {
                ok : true,
                user: record
            }
        }
        return {
            ok : false
        }
        
        
    } catch (error) {
        return{
            ok : false
        }
    }
}