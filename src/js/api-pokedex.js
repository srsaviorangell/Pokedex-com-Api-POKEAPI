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
            <div class="modal hiden ${pokemonClicked.type}">
                <div class="color">
                    <img class="color-img" src="${pokemonClicked.photo}" alt="${pokemonClicked.name}">
                    <div class="part1">
                        <h1 class="nome-modal">${pokemonClicked.name}</h1>
                        <div class="tipo-modal ${pokemonClicked.type}">
                            ${pokemonClicked.types.map((type) => `<h1 class="tipo">${type}</h1>`).join("")}
                        </div>
                    </div>
                    <button class="close-but">x</button>
                </div>
                <div class="informacao">
                    <div class="sub-info">
                        <div class="caixa-menu menu-geral" data-menu="menu-geral" onclick="toggleMenuGeral()">
                            <h1 class="sub-menu" id="m1">geral</h1>
                            <ol class="typos-info1">
                                <li>species:${pokemonClicked.species}</li>
                                <li>height:${pokemonClicked.height}</li>
                                <li>habilidades:${pokemonClicked.habilidades}</li>
                            </ol>
                        </div>
                        <div class="caixa-menu menu-start hiden" data-menu="menu-start" onclick="toggleMenuStart()">
                            <h1 class="sub-menu" id="m2">base start</h1>
                            <ul class="typos-info2">
                                ${pokemonClicked.start.map(stat => `<li>${stat.name}: ${stat.value}</li>`).join("")}
                            </ul>
                        </div>
                    </div>
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
    [modal1, close].forEach((el) => {
        el.addEventListener("click", {

        })
    });
}
function toggleTyposInfo(showId, hideId) {
    console.log(`toggleTyposInfo called with showId: ${showId}, hideId: ${hideId}`);

    const showElement = document.querySelector(`.${showId}`);
    const hideElement = document.querySelector(`.${hideId}`);

    if (showElement) {
        showElement.style.display = 'flex';
    }

    if (hideElement) {
        hideElement.style.display = 'none';
    }
}

function toggleMenuGeral() {
    toggleTyposInfo('typos-info1', 'typos-info2');
}

function toggleMenuStart() {
    toggleTyposInfo('typos-info2', 'typos-info1');
}
loadingIntens(offSet, limit);

loadingM.addEventListener('click', () => {
    offSet += limit;
    loadingIntens(offSet, limit);
});
