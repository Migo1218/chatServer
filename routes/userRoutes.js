const {
  register,
  login,
  getAllUsers,
  logOut,
} = require("../controllers/userController");

const router = require("express").Router();
// const allowCors = (fn) => async (req, res) => {
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   // another common pattern
//   // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,OPTIONS,PATCH,DELETE,POST,PUT"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
//   );
//   if (req.method === "OPTIONS") {
//     res.status(200).end();
//     return;
//   }
//   return await fn(req, res);
// };
router.post("/register", register);
router.post("/login", login);
router.get("/allusers/:id", getAllUsers);
router.get("/logout/:id", logOut);

module.exports = router;
