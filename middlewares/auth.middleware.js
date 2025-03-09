const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Accès refusé, token manquant !" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ✅ Stocke les données du token dans `req.user`
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalide" });
  }
};

module.exports = { authMiddleware };