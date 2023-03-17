# Routes sur REACT JS

## Intro
React Router est une bibliothèque standard pour le routage dans React. Elle permet la navigation entre les vues de différents composants dans une application React, permet de modifier l'URL du navigateur et maintient l'interface utilisateur synchronisée avec l'URL.
Créons une application React simple pour comprendre comment fonctionne React Router. L'application contiendra trois composants : un composant d'accueil, un composant à propos et un composant de contact. Nous utiliserons React Router pour naviguer entre ces composants.
<br>
<br>

## Préparation
Configuration de l'application React : Créez une application React en utilisant create-react-app et appelons-la `app-routes`.

> **Remarque**
> Si vous avez déjà installé create-react-app globalement via npm, utilisez directement la commande ci-dessous

```bash
npx create-react-app app-routes
```

Votre environnement de développement est prêt. Installons maintenant React Router dans notre application.

*Installation de React Router* : React Router peut être installé via npm dans votre application React. Suivez les étapes ci-dessous pour installer Router dans votre application React :

1. Accédez au répertoire de votre projet, c'est-à-dire geeks.
1. Pour installer React Router, utilisez la commande suivante

```bash 
npm install – -save react-router-dom 
# ou 
npm i -S react-router-dom
```

Après avoir installé react-router-dom, ajoutez ses composants à votre application React.

*Ajout de composants React Router* : Les principaux composants de React Router sont :

<ol>
<li><strong>BrowserRouter</strong> : BrowserRouter est une implémentation de routeur qui utilise l'API de l'historique HTML5 (pushState, replaceState et l'événement popstate) pour synchroniser votre interface utilisateur avec l'URL. C'est le composant parent qui est utilisé pour stocker tous les autres composants.</li>
<li><strong>Routes</strong> : C'est un nouveau composant introduit dans la version 6 et une amélioration du composant. Les principaux avantages de Routes par rapport à Switch sont :
  <ul><li>les routes et les s relatifs</li>
    <li>Les routes sont choisies en fonction de la meilleure correspondance au lieu d'être parcourues dans l'ordre.</li>
  </ul>
</li>
<li><strong>Route</strong> : Route est le composant affiché de manière conditionnelle qui rend une interface utilisateur lorsque son chemin correspond à l'URL actuelle.</li>
<li><strong>Link</strong> : Le composant Link est utilisé pour créer des liens vers différentes routes et mettre en œuvre la navigation dans l'application. Il fonctionne comme la balise d'ancrage HTML.</li>
</ol>

Pour ajouter des composants React Router dans votre application, ouvrez le répertoire de votre projet dans l'éditeur que vous utilisez et allez dans le fichier `src/App.js`. Maintenant, ajoutez le code ci-dessous dans `App.js`.

```js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
```
> **Attention**
> BrowserRouter est aliasé en tant que Router.

Utilisation de React Router : Pour utiliser React Router, créons d'abord quelques composants dans l'application React. Dans votre répertoire de projet, créez un dossier nommé "pages" à l'intérieur du dossier "src" et ajoutez maintenant les 3 fichiers nommés `"HomePage.js"`, `"ProfilePage.js"` et `"FeedPage.js"` au dossier `"pages"`.

> **Note**
> vous pouvez utiliser cette commande la
```bash
mkdir src/pages
touch src/pages/HomePage.js src/pages/ProfilePage.js src/pages/FeedPage.js
```

Vous dervier avoir ce résultat<br><img src=".screenshots/Screenshot 2023-03-07 at 11.11.05.png">
<br>
<br>

## Les Pages

On va commencer par créer nos 3 pages

<details>
<summary>notre page `FeedPage.js`:</summary>

```js
import React from 'react';

function FeedPage() {
  return (
    <div>
      <h1>Feed</h1>
    </div>
  );

export default FeedPage;
```
</details>

<details>
<summary>notre page `HomePage.js`:</summary>

```js
import React from 'react';

function HomePage() {
  return (
    <div>
      <h1>Accueil</h1>
    </div>
  );
}

export default HomePage;
```
</details>
<details>
<summary>notre page `ProfilePage.js`:</summary>

```js
import React from 'react';

function ProfilePage() {
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
}

export default ProfilePage;
```
</details>

Pour plus de faciliter j'ai envie de créer ma navigation dans un component dédié:

je vais donc créer une navbar:
```bash
mkdir src/components && touch src/components/NavBar.js
```

Normalement pour faire un simple lien on va utiliser `<Link />` mais dans notre cas on aimerais détecter si on a bien notre class 'active' quand on est sur la bonne page

le code:
```js
import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? 'active' : '' }
          >
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => isActive ? 'active' : '' }
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) => isActive ? 'active' : '' }
          >
            Home
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
```
> Note
> ici `className={({ isActive }) => isActive ? 'active' : '' }` est une technique possible pour récupérer l'événement "isActive" mais n'est pas forcément le plus simple a mettre en place on verra plus loin comment faire
<br>
<br>

## Notre fichier `App.js`

Le finale de notre code pour que l'application fonction le voila

```js
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import NavBar from './components/NavBar';
import FeedPage from './pages/FeedPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';

import "./App.css";

function App() {
  return (
    <Router>
       <div className="App">
        <header>
          <NavBar />
        </header>
        <main>
          <Routes>
             <Route exact path='/' element={<HomePage />} />
             <Route exact path='/profile' element={<ProfilePage />} />
             <Route exact path='/feed' element={<FeedPage />} />
          </Routes>
        </main>
      </div>
   </Router>
  );
}

export default App;
```

Les différents attributs de `<Route />` servent à définir les routes de notre application et les éléments qui leur sont associés. Voici une explication de chaque attribut :<br>


- *path* : L'attribut path permet de définir le chemin URL pour la route. Lorsque l'URL du navigateur correspond à ce chemin, le composant associé est rendu.

- *element* : L'attribut element est utilisé pour définir le composant qui doit être rendu lorsque l'URL correspond au chemin de la route. Le composant spécifié est rendu à la place du composant Route.

- *exact* : L'attribut exact est utilisé pour s'assurer que la route ne sera activée que si l'URL correspond exactement au chemin de la route.

- *render* : L'attribut render permet de définir une fonction qui sera appelée lorsque l'URL correspond au chemin de la route. Cette fonction doit retourner le composant qui doit être rendu.

- *children* : L'attribut children est utilisé pour définir les composants qui doivent être rendus à l'intérieur du composant Route, indépendamment de l'URL.

> la documentation pour `<Routes />` et `<Route />` [lien ici](https://reactrouter.com/en/main/components/routes)

<br>

## Un peu plus loin..

### Ajouter bootstrap

1. on commence par ajouter `bootstrap` dans les packages:
```bash
bash npm i -S bootstrap
```
2. Importez le fichier CSS de Bootstrap dans votre fichier index.js (ou dans le fichier principal de votre application) :
```js
import 'bootstrap/dist/css/bootstrap.min.css';
```
3. Utilisez les classes de Bootstrap dans votre code pour styliser votre application.
```js
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink exact="true" to="/" className="navbar-brand">Mon application</NavLink>
        
        <button 
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                exact="true"
                to="/" 
                className="nav-link"
              >
                Accueil
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/feed"
                className="nav-link"
              >
                Feed
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink
                to="/profile"
                className="nav-link"
              >
                Profil
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navigation;
```

### Récupérer un feed Reddit

1. On va dans un premier temps ajouter `Axios` qui nous permettra de récupérer le feed de [Reddit](reddit.com)
```bash
npm i -S axios
```

2. Créez un composant Feed dans votre dossier pages pour récupérer les données du feed de Reddit en utilisant l'*API* Reddit. Vous pouvez utiliser la méthode `axios.get` pour effectuer une requête *GET* sur l'*API* Reddit et récupérer les données du feed.

```bash
touch src/components/RedditFeed.js
```
dans notre fichier `RedditFeed.js`
```js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RedditFeed() {
  // Utilisation de la méthode useState pour stocker les données du feed
  const [feedData, setFeedData] = useState([]);
  const [isLoading, setLoadingStatus] = useState(false);

  // Utilisation de la méthode useEffect pour effectuer une requête GET sur l'API Reddit et mettre à jour les données du feed
  useEffect(() => {
    // Je set le loading a true
    setLoadingStatus(true);

    // Effectue une requête GET sur l'API Reddit
    axios.get('https://www.reddit.com/r/popular.json')
      .then(response => {
        // Met à jour les données du feed avec les données récupérées de l'API Reddit
        setFeedData(response.data.data.children);

        // Quand le les donnée sont passée dans "feedData" on stop le loading
        setLoadingStatus(false);
      })
      .catch(error => console.log(error));
  }, []); // Le tableau vide en deuxième argument indique que useEffect ne doit être exécuté qu'une seule fois lors du montage du composant

  // Affichage des données du feed dans une liste
  return (
    <div>
      {isLoading 
        ? (<div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>)
        : (<ul>
            {feedData.map(item => (
              <li key={item.data.id}>
                <a href={`https://www.reddit.com${item.data.permalink}`} target="_blank" rel="noopener noreferrer">
                  {item.data.title}
                </a>
              </li>
            ))}
          </ul>)
      }
    </div>
  );
}

export default RedditFeed;
```


Le composant Feed utilise la méthode `useState` pour stocker les données du feed de Reddit dans un tableau feedData. La méthode `useEffect` est utilisée pour effectuer une requête GET sur l'API Reddit et mettre à jour les données du feed.

`useEffect` est une méthode de cycle de vie qui est appelée après chaque rendu de votre composant. Elle prend deux arguments : une fonction de rappel qui effectue une action, et un tableau de dépendances qui permet de contrôler quand la fonction de rappel doit être appelée. Si le tableau de dépendances est vide, la fonction de rappel ne sera appelée qu'une seule fois lors du montage du composant.

<details><summary>Différence avec "componentDidMount" ?</summary>

La méthode `useState` et `componentDidMount` sont deux éléments différents en React.

`useState` est une méthode de hook qui permet de définir et de mettre à jour l'état local d'un composant. Lorsque vous utilisez `useState`, React se charge de conserver et de mettre à jour l'état local de manière performante et fiable.

`componentDidMount`, en revanche, est une méthode de cycle de vie de React qui est appelée immédiatement après que le composant est monté. Elle permet d'effectuer des actions lors du premier rendu du composant, telles que la récupération de données à partir d'une API ou la configuration d'un intervalle de temps.

En d'autres termes, `useState` est utilisé pour définir et mettre à jour l'état local d'un composant de manière performante, tandis que `componentDidMount` est utilisé pour effectuer des actions lors du premier rendu du composant.

Il est important de noter que les méthodes de cycle de vie de React, telles que `componentDidMount`, sont utilisées dans les composants de classe, tandis que les hooks, tels que `useState`, sont utilisés dans les composants fonctionnels.
</details><br>

Dans cet exemple, nous avons utilisé `useEffect` avec un tableau de dépendances vide pour effectuer la requête *GET* sur l'*API* Reddit et mettre à jour les données du feed une seule fois lors du montage du composant. Nous avons également utilisé la méthode axios.get pour effectuer la requête *GET*, puis la méthode setFeedData pour mettre à jour les données du feed avec les données récupérées de l'*API* Reddit.

Enfin, nous avons affiché les données du feed dans une liste à l'aide de la méthode map, en créant un lien pour chaque élément du feed qui ouvrira la page Reddit correspondante dans un nouvel onglet.