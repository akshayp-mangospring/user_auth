const dotEnv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const { parsed: { TOKEN_KEY } } = dotEnv;

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Assuming 'Bearer <token>'

    jwt.verify(token, TOKEN_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Invalid token
      }

      req.user = user; // Attach the user object to the request
      next(); // Continue to the next middleware or route handler
    });
  } else {
    res.sendStatus(401); // No token provided
  }
};

module.exports = authenticateJWT;
