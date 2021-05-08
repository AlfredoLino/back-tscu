controller = (req, res, next)=>{
    res.status(200).send("Temperatura: 36°C.")
}

module.exports = controller