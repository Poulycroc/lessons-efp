function loadPokemons(limit = 100, callback)
{
  const xhr = new XMLHttpRequest()
  xhr.open("GET", "https://pokeapi.co/api/v2/pokemon?limit=100")
  xhr.send()

  xhr.onload = function() {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      callback(data.results)
    } else if (xhr.status === 404) {
      console.log("No records found");
    } else {
      console.error("Something whent wrong");
    }
  }
}

function writePokemons(pokemons, callback) {
  const container = document.getElementById('pokemons')
  pokemons.forEach((pokemon) => {
    container.innerHTML += `<li 
      class="list-group-item d-flex justify-content-between align-items-center"
    >
      <span>${pokemon.name}</span>
      <button 
        type="button" 
        data-url="${pokemon.url}"
        class="btn-outline-info btn see-more"
      >
        More
      </button>
    </li>` 
  });
  callback(true)
}

function showPokemon(url)
{
  const xhr = new XMLHttpRequest()
  let data;
  //open a get request with the remote server URL
  xhr.open("GET", url)
  //send the Http request
  xhr.send()

  //EVENT HANDLERS

  //triggered when the response is completed
  xhr.onload = function() {
    if (xhr.status === 200) {
      //parse JSON
      let pokemon = JSON.parse(xhr.responseText);

      modalFor(pokemon);

    } else if (xhr.status === 404) {
      console.log("No records found");
    }
  }
}

function modalFor(pokemon)
{
  let modal = document.getElementById('pokemon');

  modal.querySelector('img').setAttribute('src', pokemon.sprites.other['official-artwork'].front_default);
  modal.querySelector('h5').innerText = pokemon.name;
  modal.querySelector('.height strong').innerText = pokemon.height;
  modal.querySelector('.weight strong').innerText = pokemon.weight;
  modal.classList.remove('d-none');
  modal.classList.add('d-flex');
  modal.querySelector('#close').addEventListener('click', (event) => {
    // let modal = document.getElementById('pokemon');
    modal.classList.add('d-none');
    modal.classList.remove('d-flex');
  });
}

document.addEventListener("DOMContentLoaded", function() {
  let isPokemonsLoading = true;
  loadPokemons(100, (res) => {
    writePokemons(res, () => {
      document.querySelector('.see-more').addEventListener('click', (event) => {
        let url = event.target.getAttribute('data-url');
        showPokemon(url);
      });
    });
    isPokemonsLoading = false;
  })
});


