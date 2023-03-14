const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')
const jwt = require('jsonwebtoken')

const pool = mysql.createPool({
  host: '127.0.0.1',
  port: 8889,
  user: 'root',
  password: 'root',
  database: 'efp-backend-auth-jwt',
})
const privateKey = 'shhhhh'

const app = express()
app.use(cors())
app.use(express.json())

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
    const user = rows[0]

    console.log({ user })
    if (!user || user.password !== password) {
      return res.status(401).json({
        message: 'Email ou mot de passe incorrect'
      })
    }

    const token = jwt.sign({ userId: user.id }, privateKey)

    res.json({ token })
  } catch(err) {
    console.error(err)
    res.status(500).json({
      message: 'Une super erreur je ne sais pas pq'
    })
  }
})

app.get('/checkauth', (req, res) => {
  try {
    // Vérification du JWT envoyé par le frontend
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(500).json({
        message: "Token not sent"
      })
    }
    const decodedToken = jwt.verify(token, privateKey);

    // Vérification des informations de l'utilisateur
    if (!decodedToken || !decodedToken.userId) {
      return res
        .status(401)
        .json({
          message: "Vous n'êtes pas autorisé à accéder à cette ressource.",
        });
    }

    // Accès autorisé aux ressources protégées
    res.json({ message: "Vous avez accès aux ressources protégées." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        message:
          "Une erreur est survenue lors de l'accès aux ressources protégées.",
      });
  }
})

app.listen(8080, () => {
  console.log('Serveur sur 8080')
})
