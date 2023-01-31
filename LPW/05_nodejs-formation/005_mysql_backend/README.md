# Mysql avec NodeJS
Travailler avec des applications REST API est intéressant car cela permet une communication simple et efficace entre différents systèmes. Les API REST utilisent des conventions standardisées pour échanger des données, ce qui les rend faciles à utiliser et à comprendre pour les développeurs. De plus, les API REST peuvent être utilisées avec de nombreux langages de programmation différents, ce qui les rend flexibles et réutilisables pour de nombreux projets.

## Mysql c'est quoi ?
MySQL est un système de gestion de base de données relationnelle qui peut être utilisé avec Node.js pour stocker et accéder à des données. En utilisant le plugin `mysql2`, vous pouvez facilement exécuter des requêtes SQL dans votre application `Node.js`. Il est important de préparer les requêtes SQL pour éviter les attaques par injection SQL et pour améliorer les performances.

## Outils
Lorsque vous travaillez sur une application REST <abbr title="Une API (application programming interface ou « interface de programmation d'application ») est une interface logicielle qui permet de « connecter » un logiciel ou un service à un autre logiciel ou service afin d'échanger des données et des fonctionnalités.">API</abbr>, il peut être utile d'utiliser un outil comme Postman pour tester et vérifier les différents appels API. Cela vous permet de voir les réponses des API et de déboguer plus facilement en cas de problèmes.

j'utilise [Postman](https://www.postman.com/) avec un [petit tuto si jamais](https://www.youtube.com/watch?v=pUbrKIdUhjo) <br>
y a aussi [Insomnia](https://insomnia.rest/) [le tuto](https://www.youtube.com/watch?v=mX8HI87itBw)

## C'est parti pour le code !

### On prépare le terrain
1. on va commencer par faire notre petit
```bash
npm init
```
qui va donc nous générer notre `package.js`
<br>

2. on oublie pas d'ajouter un fichier `.gitignore` dans le quel on va ajouter: 
```bash
node_modules
package-lock.js
```
<br>

3. on avoir besoin de de plugin `express` et `mysql2`, je vais donc les installer via la commande
```bash
npm install express mysql2 --save
```
<details>
<summary>Mmmh ? pas tout compris ?</summary>

"`npm install express mysql2 --save`" est une commande que vous tapez dans votre terminal pour installer deux paquets (ou bibliothèques) pour votre application Node.js.

"`npm`" est le gestionnaire de paquets pour Node.js, qui vous permet d'installer et de gérer les dépendances pour votre application.

"`install`" indique à npm de télécharger et d'installer les paquets express et mysql2.

"`express`" est un framework web populaire pour Node.js qui facilite la création d'applications web.

"`mysql2`" est un plugin pour Node.js qui vous permet de travailler avec des bases de données MySQL.

"`--save`" indique à npm d'enregistrer ces paquets comme dépendances de votre application dans le fichier "`package.json`". Cela signifie que ces paquets seront automatiquement installés pour toute personne qui clonerait votre projet.
</details>
<br>

4. on crée notre base de données (oui il faut bien ça)<br><img src=".screenshots/Screenshot 2023-01-31 at 10.57.56.png" alt="base de donnée création" /><br>
<br/>

5. on crée une structure assez simple<br><img src=".screenshots/Screenshot 2023-01-31 at 11.07.31.png" alt="base de donnée structure" />

<br>

### On passe au vif du sujet.. Le code !
on va commencer par créer un fichier `server.js` dans le quel on va travailler

Dans ce code, on définit d'abord le port d'écoute du serveur (`9999`), puis on crée une application **ExpressJS**. On utilise également la méthode "[express.json()](https://www.geeksforgeeks.org/express-js-express-json-function/)" pour permettre l'envoi et la réception de données JSON.

Ensuite, nous créons une connexion à la base de données MySQL en spécifiant les détails de connexion (database, host, user, password, port).

dans mon cas: 
```js
{
  database: "efp-nodejs-goldenbook",
  host: "127.0.0.1",
  user: "root",
  password: "root",
  port: 8889,
}
```

Il y a trois endpoints définis pour notre application : "`/guestbook`", "`/guestbook/:id`", et "`/guestbook`".

- L'endpoint "`/guestbook`" renvoie tous les enregistrements de la table "guestbook".
- L'endpoint "`/guestbook/:id`" renvoie un enregistrement spécifique en utilisant l'identifiant fourni dans la requête.
- L'endpoint "`/guestbook`" permet d'ajouter un nouvel enregistrement en utilisant les données envoyées dans la requête.


### on commence pour de vrai !!

```js
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

// démarrez l'écoute du serveur sur un port spécifié
app.listen(PORT, () => {
  // une fois que le serveur a démarré, affichez un message dans la console
  console.log(`Server running on port: ${PORT}`);
});
```

on se retrouve donc avec une première route qui va nous retourner la liste des **guestbook** <br><img src=".screenshots/Screenshot 2023-01-31 at 11.16.13.png" alt="get sur la route guestbook" /><br> évidement on a pas encore de résultats... donc pour le moment ça ne retourne rien

Pour ajouter comment faire ? C'est assez simple on va faire notre route `POST` qui va envoyer des données depuis le l'utilisateur vers le backend.. 

```js
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
```
<br><img src=".screenshots/Screenshot 2023-01-31 at 11.19.32.png" alt="post sur la route guestbook" /><br>

la je vois que ça me retourne une info comme quoi c'est bien ajouté, biensure je peux configurer ce massage comme je le veux

j'ai vais pouvoir tester ce que ça donne si je refais la première route `localhost:9999/guestbook` <br><img src=".screenshots/Screenshot 2023-01-31 at 11.19.44.png" alt="get sur la route guestbook (bis)" /><br> super, on a bien la liste, j'aimerais maintenant récupérer juste une guestbook.. 

`/guestbook/:id`
```js
// définissez une route pour obtenir un message spécifique du livre d'or
app.get("/guestbook/:id", (req, res) => {
  // le " :id " sera le params que l'on veut faire passer dans notre backend dans ce cas ci l'id du guestbook que l'on veut récupérer

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
      // comme "results" est un array (même si il n'y a qu'un seul élément dedans) je récupère l'index 0 pour être sure que jaurais un objet 
    }
  );
});
```

ça devrait donner quelque chose comme ça <br><img src=".screenshots/Screenshot 2023-01-31 at 11.20.29.png" alt="get sur la route guestbook/:id" /><br>



### Conclusion:
Cet exercice vous a permis de découvrir comment utiliser **MySQL** avec **Node.js** en utilisant le module "`mysql2`". Vous avez vu comment gérer les données en utilisant des requêtes SQL et comment les requêtes sont préparées pour éviter les vulnérabilités de sécurité.

### Idées d'amélioration:
1. Ajouter plus de routes pour gérer les opérations [CRUD](https://fr.wikipedia.org/wiki/CRUD) (créer, lire, mettre à jour, supprimer).
2. Sécuriser les requêtes en utilisant des techniques telles que la validation des données.
3. Développer une interface utilisateur pour le livre d'or, en utilisant des technologies telles que [React](https://reactjs.org/) ou [Vue.js](https://vuejs.org/).
4. Ajouter une authentification pour le livre d'or pour protéger les données.
Stocker les mots de passe de manière sécurisée en utilisant des algorithmes de hachage tels que [bcrypt](https://www.npmjs.com/package/bcrypt) ou [Argon2](https://www.npmjs.com/package/argon2).