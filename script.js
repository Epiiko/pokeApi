function crearCarta(datos) {
  //creamos la carta del pokemon
  let divPoke = document.createElement("div");
  divPoke.classList.add("pokemon");
  divPoke.addEventListener("click",()=>{
    localStorage.setItem("pokemon", datos.name);
    window.location.href="ficha.html";
    
  })
  //creamos la imagen que es el primer elemento
  let img = document.createElement("img");
  img.setAttribute("src", datos.sprites.front_default);
  img.setAttribute("alt", datos.name);
  img.classList.add("img_poke");

  //añadimos la imagen a la carta
  divPoke.appendChild(img);

  //Creamos el div de la info del pokemon
  let divInfo = document.createElement("div");
  divInfo.classList.add("info_poke");

  //Creamos el p para el nombre e introducimos la info
  let p = document.createElement("p");
  p.classList.add("name_poke");
  p.textContent = primeraMayus(datos.name);

  //añadimos el nombre a la info
  divInfo.appendChild(p);

  //creamos la etiqueta de las habilidades
  let label1 = document.createElement("label");
  label1.classList.add("habilidad", "mb-4");
  label1.textContent = "Habilidades";

  //añaadimos la etiqueta
  divInfo.appendChild(label1);

  //creamos el div y los p necesarios para las habilidadaes
  let divhabilidad = document.createElement("div");
  divhabilidad.classList.add("ability_poke");

  //recorremos las habilidades y creamos p
  datos.abilities.forEach((abilitydata) => {
    let p2 = document.createElement("p");
    p2.classList.add("miniText");
    p2.textContent = primeraMayus(abilitydata.ability.name);
    divhabilidad.appendChild(p2);
  });
  divInfo.appendChild(divhabilidad);

  //creamos la etiqueta de los tipos
  let label2 = document.createElement("label");
  label2.classList.add("tipo", "mt-3", "mb-4");
  label2.textContent = "Tipo";

  //añaadimos la etiqueta
  divInfo.appendChild(label2);
  //creamos el div y los p necesarios para las habilidadaes
  let divtipo = document.createElement("div");
  divtipo.classList.add("ability_poke");

  //recorremos las habilidades y creamos p
  datos.types.forEach((typedata) => {
    let p = document.createElement("p");
    p.classList.add("miniText");
    p.textContent = primeraMayus(typedata.type.name);
    divtipo.appendChild(p);
  });

  //Añadimos los tipos de pokemon
  divInfo.appendChild(divtipo);

  //Añadimos la info a la carta
  divPoke.appendChild(divInfo);

  //cuando hemos rellenado la info lo añadimos a pokemons
  document.querySelector("#pokemons").appendChild(divPoke);
}
function cargarTodos() {
  document.querySelector("input[value='Volver']").disabled = true;
  document.querySelector("#pokemons").innerHTML = "";
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((res) => res.json())
    .then((resp) => {
      resp.results.forEach((pokemon) => {
        fetch(pokemon.url)
          .then((res) => res.json())
          .then((datos) => {
            crearCarta(datos);
          });
      });
    });
}

function primeraMayus(palabra) {
  return palabra.charAt(0).toUpperCase() + palabra.slice(1);
}
document
  .querySelector("input[type='button']")
  .addEventListener("click", function buscarPokemon() {
    let encontrado = false;
    document.querySelector("input[value='Volver']").disabled = false;
    let nombre = document
      .querySelector("input[type='text']")
      .value.toLowerCase();
    document.querySelector("#pokemons").innerHTML = "";
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((resp) => resp.json())
      .then((dato) => {
        dato.results.forEach((pokemon) => {
          if (pokemon.name.includes(nombre)) {
            encontrado = true;
            fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon.name)
              .then((res) => res.json())
              .then((datos) => {
                crearCarta(datos);
              });
          }
        });
        if (!encontrado) {
          alert("El pokemon no existe");
          cargarTodos();
        }
      });
  });

document.querySelector("#volver").addEventListener("click", () => {
  cargarTodos();
});
cargarTodos();
