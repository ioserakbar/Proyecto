const jwt = require('jsonwebtoken');


const ensureToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(" ")[1];

    jwt.verify(bearerToken, process.env.AUTH_TOKEN_SECRET, function (err) {
      if (err) res.sendStatus(403);
      else next();
    });
  } else {
    res.sendStatus(403);
  }
}


module.exports = ensureToken;