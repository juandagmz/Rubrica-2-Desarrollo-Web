const API_URL = "https://pokeapi.co/api/v2/pokemon/";
const cardContainer = document.getElementById("cards-container");
const filterSelect = document.getElementById("pokemon-filter");

const POKEMON_LIST = [
  "mudkip", "marshtomp", "swampert",
  "treecko", "grovyle", "sceptile", 
  "torchic", "combusken", "blaziken", 
  "gastly", "haunter", "gengar", 
  "dratini", "dragonair", "dragonite"
];

async function fetchPokemon(name) {
  const res = await fetch(API_URL + name);
  const data = await res.json();
  return {
    name: data.name,
    image: data.sprites.front_default,
    ability: data.abilities[0].ability.name
  };
}

async function loadPokemons() {
  cardContainer.innerHTML = "Cargando...";
  const pokemons = await Promise.all(POKEMON_LIST.map(name => fetchPokemon(name)));

  cardContainer.innerHTML = "";
  pokemons.forEach(poke => {
    cardContainer.innerHTML += createCard(poke);

    const option = document.createElement("option");
    option.value = poke.name;
    option.textContent = poke.name;
    filterSelect.appendChild(option);
  });
}

function createCard(pokemon) {
  return `
    <div class="card" data-name="${pokemon.name}">
      <img src="${pokemon.image}" alt="${pokemon.name}" />
      <h3>${pokemon.name}</h3>
      <p>Ability: ${pokemon.ability}</p>
    </div>
  `;
}

filterSelect.addEventListener("change", () => {
  const selected = filterSelect.value;
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.style.display = (selected === "all" || card.dataset.name === selected) ? "block" : "none";
  });
});

loadPokemons();
