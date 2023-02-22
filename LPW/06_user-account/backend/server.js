const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');

// Configuration de la base de données MySQL
const pool = mysql.createPool({
  host: '127.0.0.1',
  port: 8889,
  user: 'root',
  password: 'root',
  database: 'efp-backend-auth-jwt'
});

// Configuration de l'application Express
const app = express();
app.use(cors());
app.use(express.json());

// Route pour l'authentification de l'utilisateur
app.post('/login', async (req, res) => {
  try {
    // Récupération des informations d'identification de la demande
    const { email, password } = req.body;

    // Recherche de l'utilisateur dans la base de données
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    // Vérification des informations d'identification
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }

    // Création d'un JWT pour l'utilisateur
    const token = jwt.sign({ userId: user.id }, 'ma_clé_secrète');

    // Envoi du JWT au frontend
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'authentification.' });
  }
});

// Route pour accéder aux ressources protégées
app.get('/protected', (req, res) => {
  try {
    // Vérification du JWT envoyé par le frontend
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'ma_clé_secrète');

    // Vérification des informations de l'utilisateur
    if (!decodedToken || !decodedToken.userId) {
      return res.status(401).json({ message: 'Vous n\'êtes pas autorisé à accéder à cette ressource.' });
    }

    // Accès autorisé aux ressources protégées
    res.json({ message: 'Vous avez accès aux ressources protégées.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'accès aux ressources protégées.' });
  }
});

// Démarrage du serveur
app.listen(8080, () => {
  console.log('Serveur démarré sur le port 8080.');
});

