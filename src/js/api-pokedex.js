const displayGrid = document.querySelector(".display-grid");
const loadingM = document.getElementById("ver-mais");
const limit = 10 ;
let offSet = 0 ;

function loadingIntens(offSet, limit ){
    pokeApi.getPokemons(offSet, limit).then((pokemonList = []) => {
        const newHtml =  pokemonList.map((pokemon)=> `
            <div class="caixas ${pokemon.type}">
                <h1 class="nome-pok ">${pokemon.name}</h1>
                <div class="row-tipo ${pokemon.type}" >
                ${pokemon.types.map((type)=>`<h1 class="tipo ">${type}</h1>`).join("")}
                </div>
                <img class="img-pok" src="${pokemon.photo}" alt="${pokemon.name}">
            </div>`).join('')
        displayGrid.innerHTML += newHtml;
        if (offSet + limit >= 250){
            loadingM.style.display = "none";
        }
    })
}

loadingIntens(offSet, limit)

loadingM.addEventListener('click', ()=>{
    offSet += limit
    loadingIntens(offSet, limit)
})



//essa tambem seria uma opção mais podemos diminuti ainda no pokemonlist.map para nao chamando uma arron e sim passando a referecia ja direito do html 
// pokeApi.getPokemons().then ((pokemonList = []) =>{

//    const newList = pokemonList.map((pokemonList) => convertPokemonHtml(pokemonList))
//    console.log(pokemonList)
   
//    const newHtml = newList.join('')
//    displayGrid.innerHTML += newHtml
// })


// esse seria o metodo sem a redução, vamos deixa o reduzido para melhor ter as 3
// pokeApi.getPokemons().then ((pokemonList = []) =>{

//    const newList = pokemonList.map((pokemonList) => {
//       return convertPokemonHtml(pokemonList)
//    })
//    console.log(pokemonList)
   
//    const newHtml = newList.join('')
//    displayGrid.innerHTML += newHtml
// })

// essa linhas comentadas e para mostra o jeito de fazer com for 
// pokeApi.getPokemons().then(pokemonList => { 
//       for (let i = 0; i < pokemonList.length; i++) {
//          const pokemon = pokemonList[i];
//          console.log(convertPokemonHtml(pokemon));
//          displayGrid.innerHTML += convertPokemonHtml(pokemon)
//       }
   
//    })
  