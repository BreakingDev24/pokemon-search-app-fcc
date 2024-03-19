//variables

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const statsElement = document.getElementsByTagName('td')

const pokeUrl = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon'



const fetchData = async () =>{
    try{
        const userInput = searchInput.value.toLowerCase()
        const res = await fetch(`${pokeUrl}/${userInput}`);
        const data = await res.json()
        console.log(data)
        showPokemon(data)
        
    } catch (err){

    }
}
fetchData()

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
    console.log(name)
    
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
    <img class='sprite-img' src='${front_default}' alt='${name}'>`

    //show type
    const typesContainer = document.getElementById('types');

    typesContainer.innerHTML = types.map((item)=>{
        const {type} = item;
        const {name} = type
        console.log(name)

        return `
        <span class='${name} type-span'>${name}</span>
        `
    }).join("")
}

searchButton.addEventListener('click', (e) => {
    e.preventDefault()

    fetchData()
})

