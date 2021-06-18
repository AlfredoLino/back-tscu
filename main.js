require('dotenv').config()
const express = require("express")
const cors = require("cors")
const sessions = require("express-session")
const {controller_df} = require("./controllers/informe")
const app = express()
const con = require("./Models/dbcon")
const User = require("./Models/User")
const Datos = require("./Models/Datos")
const Bitacora = require("./Models/Bitacora")
const informe = require("./routes/POST/informe")
const rtTemp = require("./routes/GET/temperatura")
const sensorRoute = require('./routes/POST/sensor')
const SignInRoute = require('./routes/POST/SignIn')
const LogInRoute = require('./routes/POST/LogIn')
const getInformes = require("./routes/GET/informes")
const getUserAndroid = require("./routes/Android/getUser")
const dialogFulfillment = require("dialogflow-fulfillment")
const path = require("path")
const expfileup = require("express-fileupload")
const MainControllerSocket = require("./socket/MainController")
let userIn;

module.exports.userOut = () => {
    userIn = undefined
}
module.exports.userIn = userIn;
/**
 * Middlewares
 */
app.use(express.static("public"))
app.use(express.json())
app.use(cors())
app.use(sessions({ secret:"dialogflow", saveUninitialized:false, resave:false }))

/**
 * Relaciones de la base de datos MySQL
 */
User.hasMany(Datos, {
    onDelete: 'cascade'
})
User.hasMany(Bitacora, {
    onDelete: 'cascade'
}) 
Datos.belongsTo(User)
Bitacora.belongsTo(User)


con.sync().then(inf => {

    console.log("BDD sincronizada")
    
}).catch(err => {
    console.log("HUBO ERROR:", err)
})
/**
 * Alta del servidor Express.js
 * y
 * Socket.io
 */
const express_serv = app.listen(process.env.PORT || 8080, () => {
    console.log("Listen 8080")
})

const io = require("socket.io")(express_serv, { cors : '*' })

io.on('connection', MainControllerSocket)


/**
 * Webhook DialogFlow
 */

app.post("/hook", (req, res, next) => {
    const agent = new dialogFulfillment.WebhookClient({
        request: req,
        response: res
    })
    /**
     * @param {Dialogflow} agent
     * @event Dialogflow intent
     * @async Crea petición asincrona a la base de datos.
     * @summary: Añade un informe nuevo a la bitacora del usuario registrado y esta
     * se refleja en tiempo real
     */
    async function informeNuevo(agent){
        console.log(userIn)
        const payload = {
            "richContent": [
              [
                {
                  "type": "description",
                  "title": "Esto se añadirá a la bitacora: ",
                  "text": [
                    agent.parameters.informe,
                  ]
                }
              ]
            ]
        }
        ///
        try {
            const isOk = await controller_df(userIn.id, agent.parameters.informe)
            if(isOk){
                io.in(userIn.email).emit("newInf", "Nueva bitacora para: "+userIn.email)
                agent.add(new dialogFulfillment.Payload(agent.UNSPECIFIED, payload,
                    {sendAsMessage:true, rawPayload:true}))
                agent.add("Puedo ayudarte en otra cosa?")
            }else{
                agent.add("Hubo un error al hacerlo :c")
            }
            
        } catch (error) {
            agent.add("Hubo un error al hacerlo :c")
        }
        ///
    }

    /**
     * @param {DialogFlow Agent} agent
     * @event DialogFlow Intent
     * @async Crea petición asincrona a la base de datos.
     * @summary: Busca un perfil por ID de usuario y regresa parte de sus datos, un enlace 
     * a su perfil en la pagina y la foto de perfil 
     */

    async function goToProfile(agent){
        const getUserById = require("./utils/getUserById")
        const getPayload = require("./DialogFlow/Payloads/GotoProfile")
        const id = agent.parameters.idusuario;
        const rec = await getUserById(id)
        console.log("Perfil: ",agent.parameters)
        if(rec.ok){
            const {id, nombre, photoProfile} = rec.user.dataValues
            const payload = getPayload(id, `http://localhost:3000/profile/${id}`, `https://c77322e035ac.ngrok.io/user/${photoProfile}`, nombre)
            agent.add(new dialogFulfillment.Payload(agent.UNSPECIFIED, payload, {sendAsMessage : true, rawPayload:true}))
        }else{
            agent.add("No encontramos tal perfil :cc")
        }
    }

    /**
     * Vinculando que funcion despachará cierto intent dado
     */

    const intentMap = new Map()
    intentMap.set('InformeNuevo', informeNuevo)
    intentMap.set('buscarPerfil', goToProfile)
    agent.handleRequest(intentMap)
})


/**
 * Webhook for DialogFlow
 */

/**
 * Declaracion de rutas
 */
app.post("/upload/:id", expfileup(), (req, res, next) => {
    console.log(req.params, req.files)
    const id_user = req.params.id
    const file = req.files.perfil
    const urlFile = `${id_user}${file.name}`
    file.mv(path.join(__dirname, "public", "user", urlFile), (err, succ) => {
        if(err){
            
            res.status(401).json({ok: false, message : "Error al subir archivo"})
        }else{
            User.findOne( {
                where: {
                    id : id_user
                }
            } ).then(async (data) => {
                data.setDataValue("photoProfile", urlFile)
                try {
                    await data.save()
                    res.status(201).json({ok : true, message : "Archivo subido con exito!!"})
                } catch (error) {
                    res.status(401).json({ok: false, message : "Error al subir archivo"})
                }
                
            }).catch(err => {
                res.status(401).json({ok: false, message : "Error al subir archivo"})
            })
            
            
        }
    })
})

app.use(sensorRoute)
app.use(require("./routes/GET/getUserById"))
app.use(getUserAndroid)
app.use(getInformes)
app.use(informe)
/**
 * LOG IN
 */ 

app.use(SignInRoute)
app.use(LogInRoute, (req, res) => {
    userIn = req.session.user
    console.log("Usuario en", userIn)
})    
app.use(rtTemp)





/*
const token = 'https://api.telegram.org/bot1640792569:AAHlO_XBd-THDR7qsuXMGRueNYa_1RLSubo'

var lastmsg_id = 0
setInterval(async () => {

    try {
        const req = await fetch('https://api.telegram.org/bot1640792569:AAHlO_XBd-THDR7qsuXMGRueNYa_1RLSubo/getUpdates')
        const data = await req.json()
        const {result} = data;
        /*
        result.forEach( ({message}) => {
            console.log(`CHAT_ID: |${message.chat.id}| ${message.message_id}. ${message.from.first_name}: ${message.text}`)
        })
        
        const lastmsg = result.slice(-1)[0]
        const newmsg = lastmsg.message ? result.slice(-1)[0].message : undefined;
        if(newmsg){
            if(newmsg.message_id > lastmsg_id){
                if(newmsg.text === "quetal"){
                    
                    fetch(token+'/sendMessage?text=HOLA&chat_id=1443066639')
                    .then(req => req.json()).then(res =>{
                        console.log(res)
                    })
                }
                console.log('Hay mensaje nuevo: '+newmsg.message_id)
            }
            lastmsg_id = newmsg.message_id
        }else{
            if(lastmsg.channel_post.chat.id === -1001428855060){
                console.log('Mensaje desde el canal')
                console.log(lastmsg)
            }
        }
    } catch (err) {
        console.log(err)
    }

}, 1000);


*/