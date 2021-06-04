const Bitacora = require("../Models/Bitacora")

const df_NewInforme = async(UsuarioId, informe) => {
    console.log("El informe es: ", informe)
    try {
        const record = await Bitacora.create(
            {
                UsuarioId : Number(UsuarioId),
                informe,
            }
        )
        if(record){
            return true
        }
        return false
        
    } catch (error) {
        return false
    }
}
const controller = (req, res, next) => {
    const { UsuarioId, informe, foto } = req.body;

    Bitacora.create(
        {
            UsuarioId,
            informe,
            foto
        }
    ).then(rec => {
        return res.status(202).json({
            ok: true,
            rec
        })
    }).catch( err => {    
        switch (err.parent.code) {
            case "ER_DUP_ENTRY":
                res.status(401).json({ok: false, err: err.parent.code, message: "El correo ya habia sido registrado previamente"})        
                break;
            default:
                res.status(400).json(
                    {ok : false, err, message: "Error en el servidor. Intentar mas tarde o ponerse en contacto con soporte."}
                )
                break;
        }
    })
}

module.exports.controller_ep = controller
module.exports.controller_df = df_NewInforme