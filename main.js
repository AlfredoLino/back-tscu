//const fetch = require('node-fetch')
require('dotenv').config()
const express = require("express")
const cors = require("cors")
const app = express()
const con = require("./Models/dbcon")
const User = require("./Models/User")
const Datos = require("./Models/Datos")
const Bitacora = require("./Models/Bitacora")
const informe = require("./routes/POST/informe")
const rtTemp = require("./routes/GET/temperatura")
const SignInRoute = require('./routes/POST/SignIn')
const LogInRoute = require('./routes/POST/LogIn')
const getInformes = require("./routes/GET/informes")
const getUserAndroid = require("./routes/Android/getUser")
const dialogFulfillment = require("dialogflow-fulfillment")
const path = require("path")
const expfileup = require("express-fileupload")
const MainControllerSocket = require("./socket/MainController")
/**
 * Middlewares
 */
app.use(express.static("public"))
app.use(express.json())
app.use(cors())
/**
 * Declaracion de rutas
 */
app.use(require("./routes/GET/getUserById"))
app.use(getUserAndroid)
app.use(getInformes)
app.use(informe)
app.use(LogInRoute)
app.use(SignInRoute)
app.use(rtTemp)


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
app.post("/webhook", (req, res, next) => {

    const agent = new dialogFulfillment.WebhookClient({
        request: req,
        response: res
    })

    function pandemicInfo (agent){


        agent.add("Respuesta desde Node")
    }

    function userSettings(agent){

        agent.add("Vamos a cambiar su usario crack")

    }
    var intentMap = new Map()

    intentMap.set('pandemicInfo', pandemicInfo)
    intentMap.set('userSettings', userSettings)

    agent.handleRequest(intentMap)
    console.log(req.body)
})

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

/**
 * Alta del servidor Express.js
 */
con.sync().then(inf => {

    const express_serv = app.listen(process.env.PORT || 8080, () => {
        console.log("Listen 8080")
    })

    const io = require("socket.io")(express_serv, { cors : '*' })

    io.on('connection', MainControllerSocket)
    
}).catch(err => {
    console.log("HUBO ERROR:", err)
})



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