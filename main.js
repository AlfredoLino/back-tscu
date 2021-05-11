//const fetch = require('node-fetch')
require('dotenv').config()
const express = require("express")
const cors = require("cors")
const app = express()
const con = require("./Models/dbcon")
const User = require("./Models/User")
const Datos = require("./Models/Datos")
const rtTemp = require("./routes/GET/temperatura")
const SignInRoute = require('./routes/POST/SignIn')
const LogInRoute = require('./routes/POST/LogIn')
const dialogFulfillment = require("dialogflow-fulfillment")
const path = require("path")
const expfileup = require("express-fileupload")
app.use(express.static("public"))
app.use(express.json())
app.use(cors())
app.use(LogInRoute)
app.use(SignInRoute)
app.use(rtTemp)
app.post("/upload/:id", expfileup(), (req, res, next) => {
    console.log(req.params)
    const file = req.files.perfil
    file.mv(path.join(__dirname, "public", "user", file.name), (err, succ) => {
        if(err){
            res.status(401).json({ok: false, message : "Error al subir archivo"})
        }else{
            res.status(201).json({ok : true, message : "Archivo subido con exito!!"})
        }
    })
})
app.post("/webhook", (req, res, next) => {

    const agent = new dialogFulfillment.WebhookClient({
        request: req,
        response: res
    })

    function pandemicInfo (agent){
        agent.add("Info de la pandemia")
        agent.add("Informacion sobre la pandemia")
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

User.hasMany(Datos, {
    onDelete: 'cascade'
}) 
Datos.belongsTo(User)

con.sync().then(inf => {
    
    // const expressServer = app.listen(8080);
            
    app.listen(8080, () => {
        console.log("Listen 8080")
    })
    /*
    Datos.findAll().then(data => {
        data.forEach( async (inf) => {
            console.log(inf.dataValues)
            
        } )
    }).catch(err => {
        console.log(err)
    }) */

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