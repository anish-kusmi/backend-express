// const jwt = require('jsonwebtoken')
// const jwtSecret=  process.env.JWT_SECRET;

// const fecthUser = (req, res, next) => {
//     const token = req.header("auth-token");
//     if (!token) {
//       return res.status(401).send({ error: "please use valid token" });
//     }
//     try {
//       const data = jwt.verify(token, jwtSecret);
//       req.user = data.user;
//       next();
//     } catch (error) {
//       return res.status(401).send({ error: "please use valid token" });
//     }
//   };
//   module.exports = fecthUser;



const jwt = require("jsonwebtoken");
const JWT_SECRET = "heisagoodboy";

const fecthUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ error: "please use valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).send({ error: "please use valid token" });
  }
};
module.exports = fecthUser;



