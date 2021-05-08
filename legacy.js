User.create({ email: "alfredolinomendoza@gmail.com", pass: "17070714" }).then( inf => {
    console.log("Insercion:", inf)
}).catch( err => { console.log(`Error al insertar. \n Mensaje del error:\n ${err.original.sqlMessage}`) })


User.findAll().then(data => {
    data.forEach( async (inf) => {
        console.log(inf.dataValues)
        
        /*
        if(inf.dataValues.email == 'alfredolinomendoza@gmail.com'){
            inf.setDataValue('email', "otroemail@gmail.com")
            try {
                await inf.save()
            } catch (err) {
                console.log("Error al actualizar:", err)
            }
        }
        */
    } )
}).catch(err => {
    console.log(err)
}) 