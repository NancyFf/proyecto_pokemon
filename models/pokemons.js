modelPokemon = { 
    queryGetPokemons: `SELECT * FROM Pokemon;`,
    queryPokemonExits:`SELECT Name FROM Pokemon WHERE Name = ?`,
    queryPokemonAdd: `INSERT INTO Pokemon(Name,Type, Category, Weakness, Height, Weight, Active) VALUES (?,?,?,?,?,?,?)`,
    queryDeletePokemonByID: `UPDATE Pokemon SET Active = 'N' WHERE ID = ?`,
    queryUpdatePokemon: `UPDATE Pokemon SET Name = ?, Type = ?, Category = ?, Weakness = ?, Height = ?, Weight = ?, Active = ? WHERE Name = ?`
}
module.exports = modelPokemon