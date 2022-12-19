const { request, response } = require("express");
const { query } = require("../db/connection");
const pool = require("../db/connection")
const modelPokemon = require("../models/pokemons")

const addPOkemon = async (req = request, res = response) => {
    const {Name, Type, Category, Weakness, Height, Weight, Active} = req.body//URI params

    if(!Name || !Type || !Category || !Weakness || !Height || !Weight || !Active){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }
    
    let conn;

    try {

        conn = await pool.getConnection()//Realizamos la conexión
        //generamos la consulta
        const [pokemonExits] = await conn.query(modelPokemon.queryPokemonExits, [Name], (error) =>{if(error) throw error})
        console.log(pokemonExits)
        if (pokemonExits) {
            res.json({msg:`El Pokemon: '${Name}' ya se encuentra registrado.`})
            return
        }
        //generamos la consulta
        const result = await conn.query(modelPokemon.queryPokemonAdd,[Name,Type,Category,Weakness,Height,Weight,Active] ,(error) => {if(error) throw error})

        if (result.affectedRows === 0) {//En caso de no haber resgistros lo informamos
            res.status(404).json({msg: `No se pudo agregar el pokemon con el Nombre ${Name}`})
            return
        }
        res.json({msg:`Se agregó satisfactoriamente el usuario con Nombre ${Name}`})//Se manda la lista de usuarios
        
    } catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }

}
const getPokemons = async (req = request, res = response) => {
    let conn;

    try {
        conn = await pool.getConnection()//Realizamos la conexión

        const poke = await conn.query(modelPokemon.queryGetPokemons, (error) => {if(error) throw error})

        if (!poke) {//En caso de no haber resgistros lo informamos
            res.status(404).json({msg: "No exiten pokemon registrados"})
            return
        }

        res.json({poke})//Se manda la lista de usuarios
    }
    catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }

}
const getPokemonByID = async (req = request, res = response) => {
    const {id} = req.params//URI params
    let conn;

    try {
        conn = await pool.getConnection()//Realizamos la conexión
        //generamos la consulta
        const [poke] = await conn.query(`SELECT * FROM Pokemon WHERE ID = ${id}`, (error) => {if(error) throw error})

        console.log(poke)
        if (!poke) {//En caso de no haber resgistros lo informamos
            res.status(404).json({msg: `No exiten pokemon registrados con el ID ${id}`})
            return
        }

        res.json({poke})//Se manda la lista de usuarios
    }
    catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }
}
const deletePokemonByID = async (req = request, res = response) => {
    const {id} = req.params//URI params
    let conn;

    try {
        conn = await pool.getConnection()//Realizamos la conexión
        //generamos la consulta
        const result = await conn.query(modelPokemon.queryDeletePokemonByID, [id], (error) => {if(error) throw error})

        console.log(result.affectedRows)
        if (result.affectedRows === 0) {//En caso de no haber resgistros lo informamos
            res.status(404).json({msg: `No exiten pokemon registrados con el ID ${id}`})
            return
        }

        res.json({msg:`Se eliminó satisfactoriamente el pokemon con ID ${id}`})//Se manda la lista de usuarios
    }
    catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }

}
const updatePokeByName = async (req = request, res = response) => {
    const {Name, Type, Category, Weakness, Height, Weight, Active} = req.body//URI params

    if(!Name || !Type || !Category || !Weakness || !Height || !Weight || !Active){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }
    let conn;
    try {
        conn = await pool.getConnection()//Realizamos la conexión

        const [pokeExist] = await conn.query(modelPokemon.queryPokemonExits,[Name])
        
        //generamos la consulta
            if(!pokeExist){ 
                res.json({msg:`El Pokemon ${Name} no existe.`})
                return
            }
            const result = await conn.query(modelPokemon.queryUpdatePokemon, [Name, Type, Category, Weakness, Height, Weight, Active, Name] ,(error) => {if (error) throw error})

            if (result.affectedRows === 0) {//En caso de no haber resgistros lo informamos
                res.status(404).json({msg: `No se pudo agregar el usuarios con el Nombre ${Name}`})
                return
            }
            res.json({msg:`Se actualizo satisfactoriamente el pokemon ${Name}`})//Se manda la lista de usuarios
    }catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }

}
module.exports = {addPOkemon, getPokemons, getPokemonByID, deletePokemonByID, updatePokeByName}