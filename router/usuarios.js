const {Router} = require("express")
const { getUsers, getUsersByID, deleteUserByID, addUser, updateUserByUser, signIn, changePass} = require("../controllers/usuarios")
const router = Router()

//http://localhost:4000/api/v1/messages
//http://localhost:4000/api/v1/usuarios/id/

/// GET ///
router.get("/", getUsers)
router.get("/id/:id", getUsersByID)

/// DELETE ///
router.delete("/id/:id", deleteUserByID)

///PATCH///
router.put("/", updateUserByUser)
///POST///
router.post("/", addUser)
router.post("/signin", signIn)
router.post("/signin/changepass", changePass)
module.exports = router