const admin = require('firebase-admin');

const verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: "Accès non autorisé" });
  }
};

module.exports = {
  verifyToken,
};

