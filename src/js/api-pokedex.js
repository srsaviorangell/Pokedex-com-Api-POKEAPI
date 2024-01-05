const displayGrid = document.querySelector(".display-grid");
const loadingM = document.getElementById("ver-mais");
const limit = 10;
let offSet = 0;
let pokemonList = [];

function loadingIntens(offSet, limit) {
    pokeApi.getPokemons(offSet, limit).then((newPokemonList = []) => {
        pokemonList = pokemonList.concat(newPokemonList);

        const newHtml = newPokemonList
            .map(
                (pokemon, index) => `
                    <div class="caixas ${pokemon.type}" data-index="${index}">
                        <h1 class="nome-pok">${pokemon.name}</h1>
                        <div class="row-tipo ${pokemon.type}">
                            ${pokemon.types.map((type) => `<h1 class="tipo">${type}</h1>`).join("")}
                        </div>
                        <img class="pokemon-mod" src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                `
            )
            .join("");
        displayGrid.innerHTML += newHtml;

        const caixas = document.querySelectorAll('.caixas');

        caixas.forEach((caixa, index) => {
            caixa.addEventListener("click", () => {
                generatePokemonHTML(index);
            });
        });
    });
}

function generatePokemonHTML(index) {
    const pokemonClicked = pokemonList[index];
    const pokemonHTML = `
        <div class="faden hiden">
            <div class="modal hiden">        
                <div class="color">
                    <img class="color-img" src="${pokemonClicked.photo}" alt="${pokemonClicked.name}"> 
                    <div> 
                        <h1 class="nome-modal">${pokemonClicked.name}</h1>
                        <button class="close-but">x</button>
                    </div>
                </div>
                <div class="informacao">
                    <p>Types: ${pokemonClicked.types.join(", ")}</p>
                </div>
            </div>
        </div>
    `;

    const detailsContainer = document.querySelector(".informacoes");
    detailsContainer.innerHTML = pokemonHTML;

    const modal1 = document.querySelector('.modal');
    const fade = document.querySelector('.faden');
    const close = document.querySelector('.close-but');

    modal1.classList.toggle("hiden");
    fade.classList.toggle("hiden");

    close.addEventListener("click", () => {
        modal1.classList.toggle("hiden");
        fade.classList.toggle("hiden");
    });
}

loadingIntens(offSet, limit);

loadingM.addEventListener('click', () => {
    offSet += limit;
    loadingIntens(offSet, limit);
});
