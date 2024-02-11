const Router = require("express")
const {signupUser, getUsers, sendMail} = require("../controllers/user");


const router = Router();


router.post("/signup",sendMail, signupUser)
router.get("/", getUsers)


module.exports = router