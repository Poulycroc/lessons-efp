# Comment utiliser Firebase Auth avec un backend personnalisé (en node)

Je vais expliquer ici la configuration très basique d'une application utilisant un backend en node et une interface utilisateur en utilisant [ReactJS](https://react.dev/).

la version avec le backend en PHP se [trouve ici]()

## Préparation de la structure

Commencez par faire 2 dossiers `frontend` et `backend` 

## Node
On va commencer par le `backend`, dans le terminal:
```bash
touch index .env .gitignore
npm init
npm i cookie-parser cors dotenv express firebase-admin -S
```

dans notre fichier `.gitignore`, on pense a ajouter les éléments que l'on ne veut pas voir sur notre repo
```bash
node_modules/
package-lock.json
```

dans notre fichier `server.js`:
```js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const admin = require("firebase-admin");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.listen(9999, () => {
  console.log(`App running on localhost:9999`)
});
```

<details>
<summary>Explication</summary>

Ce code utilise le framework Express pour créer un serveur HTTP en Node.js.

La première ligne importe la bibliothèque Express dans le code. Ensuite, il utilise également les bibliothèques CORS, cookie-parser et firebase-admin.

La ligne `const app = express();` crée une instance d'application Express.

Les lignes `app.use(cors());`, `app.use(express.json());`, `app.use(express.urlencoded({ extended: false }));` et `app.use(cookieParser());` ajoutent des middleware à l'application Express.

- Le middleware `cors` autorise les requêtes provenant de domaines différents de celui de l'API.
- Le middleware `express.json` analyse les corps des requêtes HTTP au format JSON.
- Le middleware `express.urlencoded` analyse les corps des requêtes HTTP au format x-www-form-urlencoded.
- Le middleware `cookie-parser` analyse les cookies envoyés dans les requêtes.
- La méthode `app.get('/', (req, res) => { ... })` définit une route pour la méthode GET sur la racine de l'API. Cette route renvoie une réponse JSON contenant le message "Hello World!".

Enfin, la méthode `app.listen(9999, () => { ... })` démarre le serveur sur le port `9999` et affiche un message dans la console pour indiquer que l'application est en cours d'exécution.

En résumé, ce code définit un serveur Express avec des middleware courants, une route GET pour la racine de l'API et démarre le serveur sur le port `9999`.
</details>

Nous pouvons tester cela en exécutant notre application (en utilisant la commande `node server.js` ou `npm run start` (si vous l'avez configuré dans votre `package.json`) vous pouvez aussi télécharger le package [nodemon](https://www.npmjs.com/package/nodemon) (si vous ne l'avez pas déjà installé), puis en utilisant la commande `npm run dev`. Ensuite, accédez à l'endpoint dans Postman, curl, ou votre navigateur en visitant l'url `http://localhost:9999/`. Vous devriez obtenir ceci en réponse :

si vous utilisez `nodemon` vous pouvez avoir ce code la dans `package.json`:
```json
//
"scripts": {
  "start": "node server.js",
  "dev": "nodemon package.js"
},
//
```

Enfin, ajoutons une fonction factice d'autorisation que nous remplirons ultérieurement avec la logique de Firebase. Nous ajouterons un booléen d'autorisation factice et l'utiliserons dans un middleware personnalisé pour vérifier l'authentification. Si l'utilisateur est autorisé, nous continuerons, sinon, nous renverrons une réponse [403](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403) : Non autorisé. Au-dessus de `app.get(..)`, voici le code que j'ai écrit :

```js
// Définition d'une variable booléenne factice autorisant l'accès (à remplacer plus tard)
const authorized = true;

// Fonction middleware pour vérifier l'authentification
function checkAuth(req, res, next) {
  if (authorized) { // Si l'utilisateur est authentifié, continuer vers la prochaine fonction middleware
    next();
  } else { // Sinon, renvoyer une réponse 403 : Non autorisé
    res.status(403).send('Unauthorized!');
    return;
  }
}
```

<details>
<summary>Explication "checkAuth"</summary>

Cette fonction `checkAuth` est un middleware personnalisé qui vérifie l'authentification avant de permettre à la fonction de route suivante de s'exécuter. Si l'utilisateur est autorisé, la fonction `next()` est appelée pour passer au prochain middleware ou à la route. Sinon, une réponse [403](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403) avec le message "Unauthorized!" est envoyée. Dans ce cas, le middleware s'arrête ici et n'exécute pas la fonction de route suivante.

Notez que dans cet exemple, la variable authorized est définie sur true, ce qui signifie que l'accès est autorisé à tous les utilisateurs. On ne va évidément pas laisser ça comme ça.
</details>


```js
// Définition de la route '/secret' qui nécessite une authentification
app.get('/secret', checkAuth, (req, res) => {
  res.json({ message: 'Information secrète' })
});
```

## React
Maintenant que c'est fait on va pouvoir créer notre `frontend` <br>
rendez-vous dans le dossier `frontend/`:
```bash
npm create vite@latest .
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
dans notre dossier `src/` on va tout retirer a part `main.jsx` et `index.css`

dans votre fichier `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

dans notre fichier `src/index.css` on éfface tout et on met juste:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

on va construire notre structure de dossiers/fichier pour avoir quelque chose de propre
```bash
mkdir src/components src/contexts src/pages src/routes
touch src/firebase.js
touch src/contexts/{ApiContext,AuthContext,AppContextProvider}.jsx
touch src/components/{App,LoginForm}.jsx
touch src/pages/{Dashboard,LoginPage}.jsx
touch src/routes/PrivateRoutes.jsx
```
> **NOTE:** on reviendra sur ces fichiers et dossiers au fure et a mesures

notre `src/main.jsx`:
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

notre `src/components/App.jsx`:
```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AppContextProviders from '../contexts/AppContextProvider';
import { AuthProvider } from '../contexts/AuthContext';
import { ApiProvider } from '../contexts/ApiContext';

import PrivateRoute from './../routes/PrivateRoutes';

import LoginPage from './../pages/LoginPage';
import Dashboard from './../pages/Dashboard';

function App() {
  const providers = [AuthProvider, ApiProvider];

  return (
    <Router>
      <AppContextProviders components={providers}>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<Dashboard/>} path="/" />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AppContextProviders>
    </Router>
  )
}

export default App
```

on va configurer notre [firebase auth](https://firebase.google.com/docs/auth?hl=fr) 
## Authentification Firebase côté client

Tout d'abord, installez Firebase dans votre projet Vue en utilisant la commande `npm i firebase`. Ensuite, allez dans le fichier `src/firebase.js`:
```js
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const app = firebase.initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
})

export const auth = app.auth()
export default app
```

Cliquez sur l'icône `</>` sur la page d'accueil de votre application Firebase, puis créez un projet client.


<img src="https://miro.medium.com/v2/resize:fit:640/1*oh5C7070kYEhv-EYhwR-lg.gif" alt="connect to firebase" />

on va maintenant pouvoir établire la connection grace a un formulaire de connection.
je suis parti chercher le mien [ici](https://www.hyperui.dev/components/marketing/forms)

```jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function LoginForm() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = ({ target }) => setEmail(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    console.log('envoi du formulaire')
    console.log({ email, password })

    setLoading(false)
  }

  return (
    <>
      {!!error ? (<div role="alert" className="rounded border-l-4 border-red-500 bg-red-50 p-4">
        <strong className="block font-medium text-red-800"> Something went wrong </strong>

        <p className="mt-2 text-sm text-red-700">{error}</p>
      </div>) : null}

      <form
        className="mx-auto mt-8 mb-0 max-w-md space-y-4"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="email" className="sr-only">Email</label>

          <div className="relative">
            <input
              type="email"
              value={email}
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter email"
              onChange={handleEmailChange}
            />

            <span className="absolute inset-y-0 right-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="password" className="sr-only">Password</label>

          <div className="relative">
            <input
              type="password"
              value={password}
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter password"
              onChange={handlePasswordChange}
            />

            <span className="absolute inset-y-0 right-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            No account?
            <Link className="underline" to="/signup">
              Sign up
            </Link>
          </p>

          <button
            type="submit"
            disabled={loading}
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Sign in
          </button>
        </div>
      </form>
    </>
  )
}

export default LoginForm;
```

> **Note:** c'est effectivement un formulaire assez basique

Plus qu'a ajouter la logique **FireBase** pour la connection maintenant, pour ça on va avoir besoin de la function de `signInWithEmailAndPassword` de fire base qui nous permettra comme son nom l'indique de se connecter via un `email` et un `mot de passe` 

```js
import { auth } from '../firebase';

function LoginForm() {
  // ... 
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    console.log('envoi du formulaire')
    console.log({ email, password })

    const res = auth.signInWithEmailAndPassword(email, password);
    return res
    console.log({ res })

    setLoading(false)
  }
  // ...
}
```

on va pouvoir cleaner ça et ajouter une redirection vers notre dashboard..

```js
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function LoginForm() {
  // ... 
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await auth.signInWithEmailAndPassword(email, password);
      navigate('/')
    } catch {
      setError('Failed to log in')
    }

    setLoading(false)
  }
  // ...
}
```

au niveau de notre dashboard on va avoir besoin de vérifier si notre utilisateur est bien connecté

on va commencer par notre `src/routes/PrivateRoutes.jsx`:
```jsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './../contexts/AuthContext'

// Définition du composant PrivateRoutes
export default function PrivateRoutes() {
  const { currentUser } = useAuth()
  // Obtient l'utilisateur courant à partir du contexte d'authentification

  // Si l'utilisateur est authentifié, retourne les routes enfants à l'aide de Outlet
  // Sinon, navigue vers la page de connexion à l'aide de Navigate
  return currentUser ? (<Outlet />) : (<Navigate to="/login" />)
}
```
pour éviter les répétitions dans notre code on va effectivement travailler sur notre fichier `src/contexts/AuthContext.jsx`:
```jsx
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';

// Crée un contexte d'authentification
export const AuthContext = React.createContext({});

// Crée un composant qui fournit le contexte d'authentification à ses enfants
export function AuthProvider({ children }) {
  // Initialise l'état local pour l'utilisateur actuel et l'état de chargement
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Utilise useEffect pour écouter les changements d'état
  // d'authentification de l'utilisateur
  useEffect(() => {
    // Abonne une fonction de rappel à la méthode onAuthStateChanged de Firebase
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // Met à jour l'état local pour l'utilisateur actuel avec l'utilisateur reçu
      setCurrentUser(user);
      // Indique que le chargement est terminé
      setLoading(false);
    });

    // Désabonne la fonction de rappel lorsqu'elle n'est plus nécessaire
    return unsubscribe;
  }, []);

  // Définit la valeur du contexte en fonction de l'utilisateur actuel
  const value = {
    currentUser,
  };

  // Rend les enfants du composant lorsqu'ils sont chargés et que l'état de chargement est terminé
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
```

on va setup ce fameux `AuthContext` dans notre `App.js`:
```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from './../routes/PrivateRoutes';
import LoginPage from './../pages/LoginPage';
import Dashboard from './../pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<Dashboard />} path="/" />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;
```



on commence par la base de code `src/pages/Dashboard.jsx`:
```jsx
import { useAuth } from './../contexts/AuthContext';

function DashboardPage() {
  // Récupère l'utilisateur actuellement authentifié depuis le contexte d'authentification
  const { currentUser } = useAuth();

  return(
    <header aria-label="Page Header">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            {/* Affiche le message de bienvenue avec l'e-mail de l'utilisateur */}
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Welcome Back, {currentUser.email}!
            </h1>
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardPage;
```
ça devrait nous donner quelque chose comme ça:<br>
<img src=".screenshots/Screenshot 2023-03-27 at 10.56.43.png" alt="dashboard results"><br>

## On reviens sur le Node

1. Tout d'abord, nous avons besoin d'un compte de service pour notre projet Firebase. Allez dans votre console Firebase, cliquez sur l'icône "Paramètres" à gauche <br><img src=".screenshots/Screenshot 2023-03-27 at 11.07.23.png" alt="Paramètres"><br>
2. puis sélectionnez "Paramètres du projet".<br><img src=".screenshots/Screenshot 2023-03-25 at 13.19.58.png" alt="Paramètres du projet" /><br>
3. Ensuite, allez dans l'onglet "Comptes de service".<br><img src=".screenshots/Screenshot 2023-03-25 at 13.20.07.png" alt="Comptes de service"><br>
4. Là, nous allons cliquer sur "Générer une nouvelle clé privée" et la stocker dans notre projet client sous `test-auth-ce9a4-firebase-adminsdk-u9qsn-8b6a6937c8.json`. <br><img src=".screenshots/Screenshot 2023-03-25 at 13.22.42.png" alt="Générer une nouvelle clé privée"><br> 
5. Ensuite, nous pouvons copier le code qu'ils nous donnent pour initialiser l'application admin, en remplaçant le chemin factice par notre véritable chemin où nous avons stocké la clé.

> Evidement le fichier json que vous allez récupérer ne se nommera sans doute pas de la même manière que le miens dans mon il s'appel `test-auth-ce9a4-firebase-adminsdk-u9qsn-8b6a6937c8.json` parceque mon projet s'appel `test-auth`

> Il est important d'ajouter le fichier `config/test-auth-ce9a4-firebase-adminsdk-u9qsn-8b6a6937c8.json` au fichier `.gitignore` pour éviter de le télécharger sur un repository public. Pour ce faire, il suffit d'ajouter une ligne contenant `config/test-auth-ce9a4-firebase-adminsdk-u9qsn-8b6a6937c8.json` dans le fichier `.gitignore` à la racine de votre projet.

une fois votre fichier de config placé au bon endroit.. 

on va pour voir le configurer dans notre `server.js`

```js
const admin = require('firebase-admin');

const serviceAccount = require('./config/test-auth-ce9a4-firebase-adminsdk-u9qsn-8b6a6937c8.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
```

Maintenant, au lieu de vérifier la variable factice dans notre fonction checkAuth(), utilisons Firebase pour vérifier le AuthToken dans les en-têtes de requête. Tout d'abord, vérifions qu'il existe, et si c'est le cas, utilisons Firebase Admin pour le vérifier. Si cela revient comme vérifié, nous passons à l'étape suivante, sinon nous renvoyons une réponse "403 : non autorisé".

```js
function checkAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send('Unauthorized')
  }

  admin
    .auth()
    .verifyIdToken(req.headers.authorization)
    .then(() => next())
    .catch(() => res.status(403).send('Unauthorized'));
}
```

## on test tout ça avec PostMan
si dans mon fichier `src/components/Dashboard.jsx` j'avoute un "console.log" de currentUser de jevrais récupérer un token (`accessToken`)

```js
console.log({ currentUser })
```

<img src=".screenshots/Screenshot 2023-03-25 at 13.39.19.png" alt="currentUser log" />

dans post man je peux donc tester mes 2 routes disponible '/' et 'secret/'

pour la route `/`:<br>
<img src=".screenshots/Screenshot 2023-03-25 at 13.36.38.png" alt="postman hello word" /><br>

pour la route `secret/`: (sans mon accessToken)<br>
<img src=".screenshots/Screenshot 2023-03-25 at 13.36.54.png" alt="postman sans accesstoken" /><br>

pour la route `secret/`: (avec accessToken)<br>
<img src=".screenshots/Screenshot 2023-03-25 at 13.39.02.png" alt="postman avec accesstoken" /><br>

## On test ce nouveau backend end front

Dans notre fichier `src/components/Dashboard.jsx` on va ajouter une requeête vers la route "secret/"

la première chose qu'on va devoir faire c'est ajouter une récupération de notre fameux token dans notre fichier `src/contexts/AuthContext.jsx`
```jsx
  async function getCurrentUserToken() {
    if (!currentUser) return null;
    const token = await currentUser.getIdToken();
    return token;
  }
```

on va pouvoir l'ajouter directement dans nos values ce qui nous donnera un fichier comme ça:
```jsx
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';

// Crée un contexte d'authentification
export const AuthContext = React.createContext({});

// Crée un composant qui fournit le contexte d'authentification à ses enfants
export function AuthProvider({ children }) {
  // Initialise l'état local pour l'utilisateur actuel et l'état de chargement
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Utilise useEffect pour écouter les changements d'état
  // d'authentification de l'utilisateur
  useEffect(() => {
    // Abonne une fonction de rappel à la méthode onAuthStateChanged de Firebase
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // Met à jour l'état local pour l'utilisateur actuel avec l'utilisateur reçu
      setCurrentUser(user);
      // Indique que le chargement est terminé
      setLoading(false);
    });

    // Désabonne la fonction de rappel lorsqu'elle n'est plus nécessaire
    return unsubscribe;
  }, []);

  // Définit la valeur du contexte en fonction de l'utilisateur actuel
  const value = {
    currentUser,
    getCurrentUserToken: async () => {
      // si pas de currentUser je sors de la function
      if (!currentUser) return null;
      // si user je récupère son access token
      const token = await currentUser.getIdToken();
      return token;
    },
  };

  // Rend les enfants du composant lorsqu'ils sont chargés et que l'état de chargement est terminé
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
```

on ajoute "axios" a notre frontend si ce n'est pas déjà fait
```bash
npm i axios -S
```

on se retrouve donc avec ce code la pour notre `Dashboard`:
```jsx
import { useEffect, useState, useContext } from 'react';
import axios from 'axios'
import { useAuth } from './../contexts/AuthContext'

function DashboardPage() {
  const { currentUser, getCurrentUserToken } = useAuth();
  const [message, setMessage] = useState();

  const getSecrectMessage = async () => {
    const { data } = await axios.get('http://localhost:9999/secret/', {
      headers: {
        Authorization: await getCurrentUserToken()
      }
    })
    setMessage(data.message)
  }

  useEffect(() => {
    getSecrectMessage();
  }, [])

  console.log({ currentUser })

  return(
    <header aria-label="Page Header">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Welcome Back, {currentUser.email}!
            </h1>
          </div>
        </div>
      </div>
      
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <h2>{message}</h2>
      </div>
    </header>
  )
}

export default DashboardPage;
```

ce qui devrait nous retouner ça:<br><img src=".screenshots/Screenshot 2023-03-27 at 11.45.47.png" alt="le message secret sur le dashboard" /><br>


## Bonus providers
on peut remarquer que c'est quand même un peu chiant de faire une requete axios 
1. on va surement appeler souvant notre backend "http://localhost:9999" et j'ai pas envie de devoir l'écrire a chaque foi 
2. quand je suis connecté je dois ajouter une header dans ma requête c'est aussi chiant parceque je risque de le faire souvant...

pour réparer ce problème et s'atifaire notre envie d'en faire le moins possible je vais créer un `src/context/ApiContext.jsx` qui va m'aider a changer ça:

```jsx
import React, { useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const ApiContext = React.createContext({});

export function useApi() {
  return useContext(ApiContext);
}
```

- Cette partie importe React, axios et le hook useAuth du AuthContext.
- Elle crée également un contexte nommé ApiContext qui sera utilisé pour fournir l'API aux composants enfants.
- Elle définit également un hook nommé useApi, qui sera utilisé pour accéder à l'API dans les composants enfants.

```jsx
export function ApiProvider({ children }) {
  const { getCurrentUserToken } = useAuth();

  const axiosConfig = {
    baseURL: import.meta.env.VITE_API_URL,
  };
  const api = axios.create(axiosConfig);

  api.interceptors.request.use(async (config) => {
    if (config.url !== '/users/login') {
      const token = await getCurrentUserToken();
      if (config?.headers && token) {
        config.headers.Authorization = `${token}`;
      }
    }

    return config;
  });

  const value = { api };

  return (<ApiContext.Provider value={value}>{children}</ApiContext.Provider>);
}
```
- Cette partie définit le composant `ApiProvider` qui fournit l'API aux composants enfants.
- Elle utilise le hook useAuth pour obtenir le token `JWT` de l'utilisateur actuellement connecté.
- Elle crée une instance d'axios avec la base de l'URL de l'API récupérée à partir de l'environnement.
- Elle utilise un interceptor axios pour ajouter automatiquement le jeton d'autorisation à toutes les requêtes sortantes, sauf pour l'endpoint de connexion.
- Elle crée un objet value qui contient l'API.
- Elle retourne un composant de fournisseur ApiContext.Provider avec value en tant que propriété value.

> **Note:** j'ai ajouté `VITE_API_URL=http://localhost:9999` dans mon `.env`

<details>
<summary>Code complet de `src/context/ApiContext.jsx`:</summary>

```jsx
import React, { useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const ApiContext = React.createContext({});

export function useApi() {
  return useContext(ApiContext);
}

export function ApiProvider({ children }) {
  const { getCurrentUserToken } = useAuth();

  const axiosConfig = {
    baseURL: import.meta.env.VITE_API_URL,
  };
  const api = axios.create(axiosConfig);

  api.interceptors.request.use(async (config) => {
    if (config.url !== '/users/login') {
      const token = await getCurrentUserToken();
      if (config?.headers && token) {
        config.headers.Authorization = `${token}`;
      }
    }

    return config;
  });

  const value = { api };

  return (<ApiContext.Provider value={value}>{children}</ApiContext.Provider>);
}
```
</details>

mon Dashboard devrait ressembler a ça maintenant:
```jsx
import { useEffect, useState, useContext } from 'react';
import axios from 'axios'
import { useAuth } from './../contexts/AuthContext'
import { useApi } from './../contexts/ApiContext';

function DashboardPage() {
  const { currentUser, getCurrentUserToken } = useAuth();
  const { api } = useApi();
  const [message, setMessage] = useState();

  const getSecrectMessage = async () => {
    const { data } = await api.get('secret/');
    setMessage(data.message)
  }

  useEffect(() => {
    getSecrectMessage();
  }, [])

  console.log({ currentUser })

  return(
    <header aria-label="Page Header">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Welcome Back, {currentUser.email}!
            </h1>
          </div>
        </div>
      </div>
      
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <h2>{message}</h2>
      </div>
    </header>
  )
}

export default DashboardPage;
```

évidement pour que ça marche on doit ajouter notre `ApiContext` dans notre `App` 
```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { ApiProvider } from '../contexts/ApiContext';
import PrivateRoute from './../routes/PrivateRoutes';
import LoginPage from './../pages/LoginPage';
import Dashboard from './../pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <ApiProvider>
        <Router>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route element={<Dashboard/>} path="/" />
            </Route>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
      </ApiProvider>
    </AuthProvider>
  )
}

export default App;
```

## Bonus du Bonus

c'est cool on a donc nos providers qui fonctionne bien mais je trouve c'est un chouilla le bordel d'avoir seulement avec 2 providers j'aimerais quelque chose de plus clean

on va donc ajouter un fichier `src/contexts/AppContextProvider.jsx` qui nous permettra de gérer tous les providers de notre `App` le code consite a faire une boucle qui ajoutera tous les providers que l'on veut autour de notre `<Router />`

`src/contexts/AppContextProvider.jsx`:
```jsx
function AppContextProviders(props) {
  const { components = [], children } = props;

  return (
    <>
      {components.reduceRight((acc, Comp) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </>
  );
}

export default AppContextProviders;
```

L'objectif de ce composant est de fournir une syntaxe plus concise pour encapsuler plusieurs composants de contexte en un seul, en utilisant la méthode "reduceRight()" pour inverser l'ordre des composants.

on va pouvoir réécrire le code de `App.jsx`:
```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AppContextProviders from '../contexts/AppContextProvider';
import { AuthProvider } from '../contexts/AuthContext';
import { ApiProvider } from '../contexts/ApiContext';

import PrivateRoute from './../routes/PrivateRoutes';

import LoginPage from './../pages/LoginPage';
import Dashboard from './../pages/Dashboard';

function App() {
  const providers = [AuthProvider, ApiProvider];

  return (
    <AppContextProviders components={providers}>
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<Dashboard/>} path="/" />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </AppContextProviders>
  )
}

export default App
```