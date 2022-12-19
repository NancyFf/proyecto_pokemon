modelUsuario = { 
    queryGetUsers: `SELECT * FROM usuarios;`,
    queryUserExits:`SELECT Nombre FROM usuarios WHERE Nombre = ?`,
    queryUserAdd: `INSERT INTO usuarios (Usuarios,Nombre, Apellidos, Edad, Genero, Contrasena, Fecha_Nacimiento, Active) VALUES (?,?,?,?,?,?,?)`,
    queryDeleteUserByID: `UPDATE Pokemon SET Active = 'N' WHERE ID = ?`,
    queryUpdateUser: `UPDATE Pokemon SET Name = ?, Type = ?, Category = ?, Weakness = ?, Height = ?, Weight = ?, Active = ? WHERE Name = ?`
}

const updateUsuario = (
    Nombre, Apellidos, Edad, Genero, Usuario, Fecha_Nacimiento
)=>{
    return `UPDATE Usuarios SET Nombre = '${Nombre}', Apellidos = '${Apellidos}', Edad = ${Edad}, ${Genero ? `Genero = '${Genero}',` : ''} Fecha_Nacimiento = '${Fecha_Nacimiento}' WHERE Usuario = '${Usuario}'`
}
module.exports = modelPokemon