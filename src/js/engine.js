class Pokemon1{
    name;
    types =[];
    type;
    photo;
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

