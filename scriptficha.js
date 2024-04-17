let pokemonName = localStorage.getItem("pokemon");
fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName)
  .then((res) => res.json())
  .then((datos) => {
    console.log(datos);
    document.querySelector(".info img").src = datos.sprites.front_default;
    document.querySelector(".nombre p").textContent = primeraMayus(datos.name);
    console.log(datos.abilities[0].ability.name);
    for (let i = 0; i < datos.abilities.length; i++) {
      let p = document.createElement("p");
      p.textContent = primeraMayus(datos.abilities[i].ability.name);
      document.querySelector(".habilidades").appendChild(p);
    }
    for (let i = 0; i < datos.types.length; i++) {
      let p = document.createElement("p");
      p.textContent = primeraMayus(datos.types[i].type.name);
      document.querySelector(".tipos").appendChild(p);
    }
    for (let i = 0; i < datos.stats.length; i++) {
        console.log(datos.stats[i]);
        let p = document.createElement("p");
        p.textContent=primeraMayus(datos.stats[i].stat.name)+ ": " + datos.stats[i].base_stat;
        document.querySelector(".stats").appendChild(p);
    }
  });
function primeraMayus(palabra) {
  return palabra.charAt(0).toUpperCase() + palabra.slice(1);
}
document.querySelector("#ancla").addEventListener("click", () => {
  location.href = "index.html";
});
