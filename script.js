const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

const statsText = document.querySelectorAll('td:nth-child(2)')
const pokeUrl = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon'



const fetchData = async () =>{
    try{
        const userInput = searchInput.value.toLowerCase()
        const res = await fetch(`${pokeUrl}/${userInput}`);
        const data = await res.json()
        showPokemon(data)
        // searchInput.value = ""
    } catch (err){
        alert("Pokémon not found")
    }
}

const getType = (types) => {
    const typesContainer = document.getElementById('types');

    typesContainer.innerHTML = types.map((item)=>{
        const {type} = item;
        const {name} = type

        return `
        <span class='${name} type-span'>${name}</span>
        `
    }).join("");
};

const getStats = (stats) => {
    stats.map((item)=>{
        const {base_stat, stat} = item
        const {name} = stat

        statsText.forEach((element)=>{
            if(element.id === name){
                element.textContent = base_stat
            }
        })
    })
}

const showPokemon = (data)=>{
    const {
        name,
        height,
        id,
        sprites,
        stats,
        types,
        weight
    } = data;

    
    //show name
    const pokeName = document.getElementById('pokemon-name');
    pokeName.textContent = name.toUpperCase()
    
    //show id
    
    const pokeId = document.getElementById('pokemon-id');
    pokeId.textContent = '#' + id
    
    //show size
    const sizeWeight = document.getElementById('weight');
    const sizeHeight = document.getElementById('height');
    
    sizeWeight.textContent = weight;
    sizeHeight.textContent = height
    
    //show sprite
    const {front_default} = sprites
    const spriteContainer = document.getElementById('sprite-container');
    spriteContainer.innerHTML = `
    <img id="sprite" class='sprite-img' src='${front_default}' alt='${name}'>`

    //show type
    getType(types)

    //show stats
    getStats(stats)
    
}

searchButton.addEventListener('click', (e) => {
    e.preventDefault()

    fetchData()
})