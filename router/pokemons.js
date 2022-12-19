const {Router} = require("express")
const { addPOkemon, getPokemons, getPokemonByID, deletePokemonByID, updatePokeByName } = require("../controllers/pokemons")
const router = Router()

///GET///
router.get("/", getPokemons)
router.get("/ID/:id", getPokemonByID)
///POST///
router.post("/addPokemon",addPOkemon)
///PATH///
router.put("/updatePokemon", updatePokeByName)
///DELETE///
router.delete("/ID/:id", deletePokemonByID)

module.exports = router