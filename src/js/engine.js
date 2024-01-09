class Pokemon1{
    name;
    types =[];
    type;
    photo;
    species;
    height;
    habilidades=[];
    start=[];
}
const pokeApi = {};

function resumiPoke(pokeDetail) {
    const newPokemon = new Pokemon1(); // Use um nome diferente para evitar conflito de nomes
    newPokemon.name = pokeDetail.name;
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;
    newPokemon.types = types;
    newPokemon.type = type;
    newPokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    newPokemon.species = pokeDetail.species.name;
    newPokemon.height = pokeDetail.height;
    newPokemon.habilidades = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);
    const statsList = pokeDetail.stats.map((statSlot) => ({
        name: statSlot.stat.name,
        value: statSlot.base_stat
      }));
    newPokemon.start = statsList;
    console.log(newPokemon)
    return newPokemon;
   
}


pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(resumiPoke)
};

pokeApi.getPokemons = (offSet = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offSet}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetail) => pokemonsDetail);
};

