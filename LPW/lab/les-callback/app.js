function loadPokemon(howMany, callback) {
  const xhr = new XMLHttpRequest();
  let data = {};
  xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/babar?limit=" + howMany);
  xhr.send();

  xhr.onload = function () {
    if (xhr.status === 200) {
      data = JSON.parse(xhr.responseText);
      callback({ success: true, data });
    } else if (xhr.status === 404) {
      console.log("No records found");
      callback({ success: false, message: "No records found" });
    }
  };
  
}


console.log('avant')
loadPokemon(400, (res) => {
  console.log({ res })
  if (!res.success) {
    console.error('CA VA PAS')
    return 
  }

  console.log("après");
})