// importez le paquet express pour utiliser son framework
const express = require("express");
// importez le paquet mysql2 pour gérer les bases de données MySQL
const mysql = require("mysql2");

// définissez le port pour votre serveur
const PORT = 9999;
// créez une instance d'application express
const app = express();
// utilisez express.json pour traiter les données envoyées par l'utilisateur
app.use(express.json());

// créez une connexion à votre base de données
const connection = mysql.createConnection({
  // nom de la base de données
  database: "efp-nodejs-goldenbook",
  // adresse IP du serveur hôte
  host: "127.0.0.1",
  // nom d'utilisateur pour se connecter à la base de données
  user: "root",
  // mot de passe pour se connecter à la base de données
  password: "root",
  // port de la base de données
  port: 8889,
});

// définissez une route pour obtenir tous les messages du livre d'or
app.get("/guestbook", (req, res) => {
  // exécutez une requête SQL pour obtenir tous les enregistrements de la table "guestbook"
  connection.query(
    "SELECT * FROM `guestbook`",
    // une fonction de rappel est appelée lorsque la requête est terminée
    function (err, results, fields) {
      // si une erreur se produit, renvoyez un message d'erreur
      if (err) {
        return res.json({ success: false, message: err });
      }
      // renvoyez les résultats de la requête SQL
      res.json({ results });
    }
  );
});

// définissez une route pour obtenir un message spécifique du livre d'or
app.get("/guestbook/:id", (req, res) => {
  // exécutez une requête SQL pour obtenir un enregistrement spécifique de la table "guestbook"
  connection.query(
    "SELECT * FROM `guestbook` WHERE `id` = ?",
    [req.params.id],
    function (err, results) {
      // si une erreur se produit, renvoyez un message d'erreur
      if (err) {
        return res.json({ success: false, message: err });
      }
      // renvoyez le résultat de la requête SQL
      res.json(results[0]);
    }
  );
});

// définissez une route pour ajouter un message au livre d'or
app.post("/guestbook", (req, res) => {
  // récupérez les données envoyées par l'utilisateur
  const data = req.body;
  // création de la date
  const date = new Date();

  // petit soucis le formatage de la date en js n'est pas le même que celui de mysql
  // on va donc devoir le formater avant de l'envoyer (il y a évidement des plugins pour ça)
  // mais ici on reste sur du simple
  const createdAt = `${date.toISOString().split("T")[0]} ${
    date.toTimeString().split(" ")[0]
  }`;

  // exécutez une requête SQL pour ajouter un enregistrement dans la base de donnée
  connection.query(
    "INSERT INTO `guestbook` (pseudo, message, created_at) VALUES (?, ?, ?)",
    [data.pseudo, data.message, createdAt],
    function (err, results, fields) {
      if (err) {
        // si une erreur se produit, renvoyez un message d'erreur
        return res.json({ success: false, message: err });
      }
      // renvoyez les résultats de la requête SQL
      res.json({ results });
    }
  );
});

// démarrez l'écoute du serveur sur un port spécifié
app.listen(PORT, () => {
  // une fois que le serveur a démarré, affichez un message dans la console
  console.log(`Server running on port: ${PORT}`);
});
