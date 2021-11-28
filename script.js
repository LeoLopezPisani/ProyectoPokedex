const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');

const colors = {
    electric: '#d6ee12',
    normal: '#956425',
    fire: '#dd4433',
    ice: '#b9fefa',
    rock: '#969696',
    flying: '#4eb185',
    grass: '#24b452',
    psychic: '#f3eb95',
    ghost: '#340f5a',
    bug: '#073c1d',
    poison: '#5a03b1',
    ground: '#b6661f',
    dragon: '#7e243a',
    steel: '#7281ad',
    fighting: '#eb8613',
    fairy: '#ffaaee',
    default: '#000000'
}

// const searchPokemon = event => {
//     event.preventDefault();
//     const { value } = event.target.pokemon;
//     fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
//     // fetch('https://pokeapi.co/api/v2/pokemon/'+value.toLowerCase())
//         .then(data => data.json())
//         .then(response => renderPokemonData(response))
//         .catch(err => renderNotFound())
// }

const searchPokemon = event => {
    event.preventDefault();
    const {value} = event.target.pokemon;
    fetchPokemon(value);
}

const fetchPokemon = async (poke) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke.toLowerCase()}`);
        const data = await res.json();
        renderPokemonData(data);
    }
    catch (error) {
        renderNotFound();
    }
}

const renderPokemonData = data => {
    const sprite = data.sprites.front_default;
    const {stats, types} = data;

    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}

const setCardColor = types => {
    const colorOne = colors[types[0].type.name];
    const colorTwo = types[1] ? colors[types[1].type.name] : colors.default;
    pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = '5px 5px';
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = colors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement('div');
        const statElementName = document.createElement('div');
        const statElementAmount = document.createElement('div');
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

const renderNotFound = () => {
    pokeName.textContent = 'Pokedex';
    pokeImg.setAttribute('src', "whos_that_pokemon.png");
    pokeImg.style.background = '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}