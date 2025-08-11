const jwt = require('jsonwebtoken');
const config = require('../config'); 

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token manquant' });

  try {
    const decoded = jwt.verify(token, config.secretJwtToken);
    req.user = { userId: decoded.userId };  
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide' });
  }
};

