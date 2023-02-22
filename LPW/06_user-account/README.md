# Authentification NodeJS

## Intro
---

L'authentification est une étape cruciale dans le développement d'applications sécurisées. Dans le monde de Node.js, JSON Web Tokens (JWT) sont de plus en plus utilisés pour gérer l'authentification des utilisateurs.

Les `JWT` (pour `"JSON Web Token"`) sont des chaînes de caractères encodées qui contiennent des informations sur l'utilisateur et leur accès. Les informations stockées dans un JWT sont cryptées pour garantir leur intégrité et leur confidentialité. Les JWT peuvent être émis par un serveur et utilisés pour authentifier des demandes d'utilisateurs subséquentes.

Dans cet environnement, Node.js offre des modules pour la création, la vérification et le stockage de JWT. L'utilisation de JWT avec Node.js est simple et efficace pour implémenter un système d'authentification robuste et sûr pour vos applications.

Dans ce guide, nous allons examiner les bases de l'authentification avec JWT sur Node.js. Nous allons explorer les étapes nécessaires pour créer, vérifier et stocker des JWT dans une application Node.js, et nous verrons comment intégrer l'authentification JWT avec d'autres bibliothèques populaires pour créer des systèmes d'authentification complets et sécurisés.

Commençons !

### JWT ? 
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

Ce token JWT est composé de trois parties, séparées par des points. La première partie est l'en-tête (header), qui spécifie l'algorithme de signature utilisé pour le JWT. Dans cet exemple, l'algorithme est "HS256", ce qui signifie que la clé secrète est utilisée pour signer et vérifier le JWT.

La deuxième partie est le corps (payload), qui contient les informations sur l'utilisateur ou l'entité qui possède le JWT. Dans cet exemple, le corps contient le nom d'utilisateur et l'ID de l'utilisateur.

La troisième partie est la signature, qui est utilisée pour vérifier que le JWT n'a pas été modifié ou altéré depuis sa création. La signature est calculée en utilisant l'en-tête, le corps et la clé secrète.

En utilisant ce token JWT, un serveur peut authentifier l'utilisateur en vérifiant la signature et en décodant le corps pour récupérer les informations d'identification. Cela permet de créer un système d'authentification sécurisé et fiable pour les applications Node.js.


### Comment ça marche ? 

1. L'utilisateur entre ses informations d'identification (par exemple, nom d'utilisateur et mot de passe) sur le frontend (l'interface utilisateur de l'application Web).
2. Le frontend envoie les informations d'identification au backend (le serveur de l'application).
3. Le backend vérifie les informations d'identification et génère un JWT qui contient les informations sur l'utilisateur (par exemple, l'ID de l'utilisateur et ses autorisations d'accès).
4. Le backend envoie le JWT au frontend.
5. Le frontend stocke le JWT (par exemple, dans un cookie ou un espace de stockage local) et l'envoie dans l'en-tête de chaque requête subséquente au backend.
6. Le backend vérifie le JWT à chaque requête et autorise l'accès à l'application en fonction des informations contenues dans le JWT. <br><img src=".screenshots/Screenshot 2023-02-21 at 15.50.07.png" alt="header auth">
7. En cas de connexion réussie, l'utilisateur peut accéder à l'application en utilisant le JWT. En cas de connexion ratée, le backend envoie un message d'erreur au frontend et l'utilisateur doit réessayer avec des informations d'identification valides.

> Pour que le frontend reste connecté, il doit **stocker le JWT localement** et l'**envoyer avec chaque requête subséquente**. Le backend **vérifie le JWT à chaque requête** et **autorise l'accès en fonction des informations contenues dans le JWT**. Si le JWT **expire ou est invalide**, le backend **renvoie une réponse indiquant que l'utilisateur doit se reconnecter**.<br><img src=".screenshots/Screenshot 2023-02-21 at 16.03.21.png" alt="access token in localstorage">

En utilisant un système d'authentification avec JWT, les applications Web peuvent créer des connexions sécurisées et efficaces entre le frontend et le backend, tout en permettant aux utilisateurs d'accéder aux ressources de l'application de manière contrôlée et protégée.

## On commencerait pas notre code ?
---

On va commencer par créer un dossier de travail dans le quel on va ajouter un `frontend` et un `backend`

on commence par le backend

### Dans notre dossier backend
<details>
<summary>Commandes de bases</summary>

On va lancer quelque peiite commande pour aller plus vite

```bash
touch .gitignore server.js
```
`.gitignore` contiendra évidement:
```
node_modules/
package-lock.json
```

on initialise npm...
```bash
npm init
```
</details> 

<details>
<summary>gestion de base de donnée</summary>

on se rend sur notre phpMyadmin (ou autre endroit ou on gère la base de donnée)

</details>

Ensuite on va installer nos différent plugins node js qu'on aura besoin
```bash
npm install express cors mysql2 jsonwebtoken
```
