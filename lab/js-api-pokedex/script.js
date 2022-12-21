function loadPokemons() {
  const xhr = new XMLHttpRequest(); // on récupère XMLHttpRequest et on l'instancie
  let data = {}; // on crée notre tableau de data

  xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/?limit=100");
  // on appel la methode 'open' depuis 'XMLHttpRequest' qui prend 2 prarams [le type de méthode http que l'on veut (ici get)] et [l'url de l'endoit ou l'on veut récupérer nos donnée]
  //  les types de méthode http -> https://code-garage.fr/blog/comprendre-les-methodes-des-requetes-http/
  xhr.send(); // on envoie la fameuse requete que l'on a construit juste avant

  // triggered when the response is completed
  xhr.onload = function () {
    // quand la réponse de notre requete arrive
    // les différents type de status -> https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP

    if (xhr.status === 200) {
      // si le status est OK
      const pokemonsContainer = document.getElementById("pokemons"); // on récupère l'endroit on l'on va afficher le html

      const reponseAuFormatText = xhr.responseText; // on traite la réponse 'xhr' dans ce cas si on demande a ce quel soit sous le format d'un text

      data = JSON.parse(reponseAuFormatText); // on traite le text que l'on a reçu ppour le transformer en Object javascript

      const listDePokemons = data.results; // on récupère 'results' depuis notre object 'data'

      listDePokemons.forEach((pokemon) => {
        // on boucle dans notre list de pokemon
        // pokemon sera donc un Object qui contiendra 'name' et 'url'
        // console.log(pokemon.name)
        const pokemonName = pokemon.name; // on récupère le name on le met dans une variable
        const pokemonUrl = pokemon.url; // on récupère le url et on le met dans une autre variable

        const li =
          "<li>" +
          pokemonName +
          ' <a href="' +
          pokemonUrl +
          '">voir plus</a></li>';

        // ici on a construit notre html pour la list

        console.log(li); // je test pour voir si on a bien un html pour notre LI

        pokemonsContainer.innerHTML += li; // j'écrit le html dans notre container pour les pokemon
        // petit rappel sur 'innerHTML' -> https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
      });
    } else if (xhr.status === 404) {
      // si l'url n'est pas trouvé
      console.log("No records found");
    } else {
      // le serveur est p-e mort ou autre c'est bien de l'indiquer a l'utilisateur
      console.log("Gros soucis");
    }
  };
}

loadPokemons();
