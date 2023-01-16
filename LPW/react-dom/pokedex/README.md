# Pokedex avec React

## Création de notre fichier de travail

on crée un fichier `index.html`

notre fichier de base

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pokedex</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

on pense évidement a mettre notre fameuse balise `#root` (c'est évidement la que l'on va charger notre code)

## Importer les librairies

on va commencer par importer nos librairies **React** et **Bootstrap**

on commence par **React** on peut trouver les CDN [ici](https://reactjs.org/docs/cdn-links.html) pour ma part je vais prendre les versions minifié

```html
<script
  crossorigin
  src="https://unpkg.com/react@18/umd/react.production.min.js"
></script>
<script
  crossorigin
  src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
></script>
```

que je vais placer dans le `<head>` de mon fichier html je vais ensuite povoir créer une un balise `<script>` dans la quel je vais pouvoir travailer

<details>
<summary>je me retrouve donc avec ça</summary>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pokedex</title>
    <script
      crossorigin
      src="https://unpkg.com/react@18/umd/react.production.min.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
    ></script>
  </head>
  <body>
    <div id="root"></div>

    <script>
      console.log("coucou");
    </script>
  </body>
</html>
```

</details><br>

je vais maintenant ajouter `bootstrap` grace au cdn que je peux trouver [ici](https://www.bootstrapcdn.com/)<br>
<br>

<details>
<summary>je me retrouve donc avec ça</summary>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pokedex</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
      crossorigin="anonymous"
    />

    <script
      crossorigin
      src="https://unpkg.com/react@18/umd/react.production.min.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
    ></script>
  </head>
  <body>
    <div id="root"></div>

    <script>
      console.log("coucou");
    </script>

    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
      crossorigin="anonymous"
    ></script>
  </body>
</html>
```

</details>
<br>

## Notre première intéraction ReactJS

### 1) on crée la base

pour afficher notre premier contenu je vais donc utiliser les function `createElement` et `render` que l'on a vu précédement

1. je vais définir l'élélement que je veux afficher grace a `React`, dans mon cas ici présent un `<h1>Hello World!</h1>`
2. je vais demander a `ReactDOM` d'afficher cet element

```js
const root = React.createElement("div", null, "Hello World!"); // création de mon élement
ReactDOM.render(root, document.getElementById("root")); // affichage dans l'élément target grace a `getElementById`
```

<details>
<summary>je me retrouve donc avec ça</summary>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pokedex</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
      crossorigin="anonymous"
    />

    <script
      crossorigin
      src="https://unpkg.com/react@18/umd/react.production.min.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
    ></script>
  </head>
  <body>
    <div id="root"></div>

    <script>
      const root = React.createElement("div", null, "Hello World!");
      ReactDOM.render(root, document.getElementById("root"));
    </script>

    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
      crossorigin="anonymous"
    ></script>
  </body>
</html>
```

</details>
<br>
<br>

### 2) on crée notre container

pour plus simplicité j'ai envie d'avoir mon pekedex dans un container a part je vais donc utiliser la force de `React` et créer mon premier `component` pour se faire je vais utiliser les `Classes` de javascript [(plus d'info ici)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes)

```js
class PekedexContainer extends React.Component {
  // on a donc créé une class du nom de PekedexContainer

  // qui hérite des propriété de React.Component
  // (qui est donc une class React avec quelque option et methodes déjà mise en place pour nous aider a créer nos propore components)

  render() {
    // la j'utilise la methode "render" qui va me permettre d'écrire le html
    return React.createElement("div", null, "Hello Word"); // la j'ai repris mon petit hello world
  }
}

// maintenant qu'on a ça on a envie de l'afficher pour ça rien de plus simple
const root = React.createElement(PekedexContainer);
// j'ai juste a demander a React de me créer un élement a partir de mon component
ReactDOM.render(root, document.getElementById("root"));
// la suite ne change pas
```

<details>
<summary>je me retrouve donc avec ça</summary>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pokedex</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
      crossorigin="anonymous"
    />

    <script
      crossorigin
      src="https://unpkg.com/react@18/umd/react.production.min.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
    ></script>
  </head>
  <body>
    <div id="root"></div>

    <script>
      class PekedexContainer extends React.Component {
        render() {
          return React.createElement("div", null, "Hello Word");
        }
      }

      const root = React.createElement(PekedexContainer);
      ReactDOM.render(root, document.getElementById("root"));
    </script>

    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
      crossorigin="anonymous"
    ></script>
  </body>
</html>
```

</details>
<br>
<br>

### 3) Boucler depuis une source api...

1. comme toujours en `JS` je vais devoir créer un tableau sur le quel boucler
2. je vais avoir besoin d'un endroit ou je lance l'appel des différents élements
3. je vais devoir faire une boucle pour afficher tout ça
4. pour que ce soit plus clean j'aimerais séparer les items de mes pokemon en component séparé

---

<details>
<summary>1. définir notre tableau</summary>

comme on l'a vu précédement je vais devoir définir un state dans le quel je vais povoir instencier mon tabelau vide
cette fonctionalité se place dans le `constructor` de notre `class`

```js
class PekedexContainer extends React.Component {
  constructor() {
    super();
    // "super" nous permets de récupérer les options de construction de base de React

    this.state = {
      // la je defini mes différents states
      pokemonsList: ["coucou", "pika", "jesaispas"], // mon tableau vide
    };
  }

  render() {
    return React.createElement(
      "div",
      { className: "pokedex container" },
      React.createElement(
        "ul",
        { className: "list-group list-group-flush" },

        this.state.pokemonsList.map((pokemon, i) => {
          return React.createElement("li", { key: i }, pokemon);
        })
      )
    );
  }
}

const root = React.createElement(PekedexContainer);
ReactDOM.render(root, document.getElementById("root"));
```

<details>
<summary>je me retrouve donc avec ça</summary>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pokedex</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
      crossorigin="anonymous"
    />

    <script
      crossorigin
      src="https://unpkg.com/react@18/umd/react.production.min.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
    ></script>
  </head>
  <body>
    <div id="root"></div>

    <script>
      class PekedexContainer extends React.Component {
        constructor() {
          super();

          this.state = {
            // la je defini mes différents states
            pokemonsList: ["coucou", "pika", "jesaispas"], // mon tableau vide
          };
        }

        render() {
          return React.createElement(
            "div",
            { className: "pokedex container" }, // la classe de mon élément container
            React.createElement(
              "ul",
              { className: "list-group list-group-flush" },

              this.state.pokemonsList.map((pokemon, i) => {
                // la c'est ma bouble qui est donc basé sur mon tableau
                return React.createElement("li", { key: i }, pokemon);
                // la j'écris les élement li
                // key ici est important ça permet a React de comprendre que ce sont des élements différents
              })
            )
          );
        }
      }

      const root = React.createElement(PekedexContainer);
      ReactDOM.render(root, document.getElementById("root"));
    </script>

    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
      crossorigin="anonymous"
    ></script>
  </body>
</html>
```

<br><img src=".screenshots/Screenshot 2023-01-16 at 12.50.57.png"><br>

</details>
</details>

---

<details>
<summary>2. Récupérer mes donnée depuis l'api</summary>

comme la plus plus part des librairie et framework JavaScript React a ce qu'on appel un LifeCycle <br><img src="https://i0.wp.com/reactjsguru.com/wp-content/uploads/2022/06/Screenshot-360.webp?resize=1024%2C640&ssl=1"><br>
on va se baser la dessus pour savoir quand lancer notre requête API

dans l'idée j'aimerais que mon component soit "monté" avant de faire la requête je vais donc utiliser `componentDidMount()` c'est une méthode que je peux retrouver dans n'importe quel component un peu comme `render()` c'est donc la que je vais placer mon `fetch()` qui fera la requête [(plus d'info sur fetch)](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch)

```js
class PekedexContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      // la je defini mes différents states
      pokemonsList: ["coucou", "pika", "jesaispas"], // mon tableau vide
    };
  }

  componentDidMount() {
    console.log("componentDidMount"); // je test si tou va bien

    // la je vais pouvoir du coup utiliser une fonction JavaScript pour charger l'api
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then((response) => response.json()) // ma réponse api
      .then((data) => {
        console.log({ data }); // mes datas
        this.setState({ pokemonsList: data.results }); // j'inject mes résultats directement dans mon tableau
      });
  }

  render() {
    return React.createElement(
      "div",
      { className: "pokedex container" },
      React.createElement(
        "ul",
        { className: "list-group list-group-flush" },

        this.state.pokemonsList.map((pokemon, i) => {
          return React.createElement("li", { key: i }, pokemon.name); // ATTENTION JE DOIS ICI DIRE QUE JE NE VEUX QUE LE NOM
        })
      )
    );
  }
}

const root = React.createElement(PekedexContainer);
ReactDOM.render(root, document.getElementById("root"));
```

<details>
<summary>je me retrouve donc avec ça</summary>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pokedex</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
      crossorigin="anonymous"
    />

    <script
      crossorigin
      src="https://unpkg.com/react@18/umd/react.production.min.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
    ></script>
  </head>
  <body>
    <div id="root"></div>

    <script>
      class PekedexContainer extends React.Component {
        constructor() {
          super();

          this.state = {
            pokemonsList: [],
          };
        }

        componentDidMount() {
          console.log("componentDidMount");

          fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
            .then((response) => response.json())
            .then((data) => {
              console.log({ data });
              this.setState({ pokemonsList: data.results });
            });
        }

        render() {
          return React.createElement(
            "div",
            { className: "pokedex container" },
            React.createElement(
              "ul",
              { className: "list-group list-group-flush" },

              this.state.pokemonsList.map((pokemon, i) => {
                return React.createElement("li", { key: i }, pokemon.name);
              })
            )
          );
        }
      }

      const root = React.createElement(PekedexContainer);
      ReactDOM.render(root, document.getElementById("root"));
    </script>

    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
      crossorigin="anonymous"
    ></script>
  </body>
</html>
```

<br><img src=".screenshots/Screenshot 2023-01-16 at 12.57.33.png"><br>

</details>
</details>

---

<details>
<summary>3. Séparer en 2 components</summary>

pour plus de simplicité au niveau de la gestion de mes élément je vais pouvoir séparer le `li` qui contien pour pokemen dans un `component` séparé

```js
class PokemonItem extends React.Component {
  constructor(props) {
    // ici j'appel l'argument "props" qui va me permetre de récuperer des information que le component parents m'envoie
    super(props); // ici j'inject ces fameux arguments dans mon constructeur
  }

  render() {
    return React.createElement(
      "li", // mon tag "li"
      {
        className:
          "list-group-item d-flex justify-content-between align-items-center",
      }, // les classe Html
      React.createElement("span", null, this.props.name), // petit span avec le nom du pokemon
      React.createElement(
        "button", // mon element button
        {
          type: "button", // type button
          "data-url": this.props.url, // la fameuse url de mon pokemon
          className: "btn btn-outline-info", // la class name
        },
        "more"
      )
    );
  }
}
```

super mais comment je fais pour envoyer les données que je veux depuis le parent ?<br>
et bien en fait c'est assez simple je vais simplement faire de la même manière avec la quel j'ai affiché `PekedexContainer` précédement et ensuite on va lui envoyer ce qu'on appel des `props`

```js
return React.createElement(
  PokemonItem, // le nom de mon component
  {
    key: i, // toujours aussi important la clé
    // la suite c'est 2 props que je vais créer
    name: pokemon.name, // ma props "name" que je crée depuis le nom du pokemon
    url: pokemon.url, // ma props "url" que je crée depuis l'url du pokemon
  }
);
```

on a donc notre JS

```js
class PokemonItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement(
      "li",
      {
        className:
          "list-group-item d-flex justify-content-between align-items-center",
      },
      React.createElement("span", null, this.props.name),
      React.createElement(
        "button",
        {
          type: "button",
          "data-url": this.props.url,
          className: "btn btn-outline-info",
        },
        "more"
      )
    );
  }
}

class PekedexContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      pokemonsList: [],
    };
  }

  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then((response) => response.json())
      .then((data) => this.setState({ pokemonsList: data.results }));
  }

  render() {
    return React.createElement(
      "div",
      { className: "pokedex container" },
      React.createElement(
        "ul",
        { className: "list-group list-group-flush" },

        this.state.pokemonsList.map((pokemon, i) => {
          return React.createElement(PokemonItem, {
            key: i,
            name: pokemon.name,
            url: pokemon.url,
          });
        })
      )
    );
  }
}

const root = React.createElement(PekedexContainer);
ReactDOM.render(root, document.getElementById("root"));
```

<details>
<summary>je me retrouve donc avec ça</summary>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pokedex</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
      crossorigin="anonymous"
    />
    <script
      crossorigin
      src="https://unpkg.com/react@18/umd/react.production.min.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
    ></script>
  </head>
  <body>
    <div id="root"></div>

    <script>
      class PokemonItem extends React.Component {
        constructor(props) {
          super(props);
        }

        render() {
          return React.createElement(
            "li",
            {
              className:
                "list-group-item d-flex justify-content-between align-items-center",
            },
            React.createElement("span", null, this.props.name),
            React.createElement(
              "button",
              {
                type: "button",
                "data-url": this.props.url,
                className: "btn btn-outline-info",
              },
              "more"
            )
          );
        }
      }

      class PekedexContainer extends React.Component {
        constructor() {
          super();

          this.state = {
            pokemonsList: [],
          };
        }

        componentDidMount() {
          fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
            .then((response) => response.json())
            .then((data) => this.setState({ pokemonsList: data.results }));
        }

        render() {
          return React.createElement(
            "div",
            { className: "pokedex container" },
            React.createElement(
              "ul",
              { className: "list-group list-group-flush" },

              this.state.pokemonsList.map((pokemon, i) => {
                return React.createElement(PokemonItem, {
                  key: i,
                  name: pokemon.name,
                  url: pokemon.url,
                });
              })
            )
          );
        }
      }

      const root = React.createElement(PekedexContainer);
      ReactDOM.render(root, document.getElementById("root"));
    </script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
      crossorigin="anonymous"
    ></script>
  </body>
</html>
```

<br><img src=".screenshots/Screenshot 2023-01-16 at 12.57.33.png"><br>

</details>
</details>
