//criamos uma função chamanda pokeApi

const pokeApi = {};

    // function resumipok(pokeDetail) {
    //     const pokemon = new pokemon()
    //     pokemon.name = pokemon.name
    //      const types =pokemon.types.map((typeSlot)=> typeSlot.type.name)
    //     const [type] = types
    //     pokemon.photo = pokemon.sprites.other.dream_world.front_default

    //     return pokemon
    // }
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response)=>response.json())
//     .then((pokemon)=>{
//     })
//     .then(resumipok)
}
   

pokeApi.getPokemons = ( inicioCont = 0 , finalCont = 9 ) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${inicioCont}&limit=${finalCont}`
       
    return fetch(url)
        .then( response => response.json())
        .then(jsonBody => jsonBody.results)
        .then((pokemons)=> pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests)=> Promise.all(detailRequests))
        .then((pokemonsDetail)=> pokemonsDetail)
}
