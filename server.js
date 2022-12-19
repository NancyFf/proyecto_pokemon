const express = require('express')
const usuariosRouter = require('./router/usuarios')
const pokemonsRouter = require('./router/pokemons')
const cors = require('cors')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.paths = {
            usuarios:"/api/v1/usuarios",
            pokemons:"/api/v1/pokemons"
        }
        this.middleware()
        this.routes()
    }

    routes(){
        //this.app.get('/', (req, res) => {
        //    res.send('Mensaje recibido')
        //})//End Point
        this.app.use(this.paths.usuarios, usuariosRouter)
        this.app.use(this.paths.pokemons, pokemonsRouter)
    }

    middleware(){
        this.app.use(cors())//Habilita Origen Cruzado
        this.app.use(express.json())
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto 4000', this.port)
        })
    }
}

module.exports = Server