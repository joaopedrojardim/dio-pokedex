const listPokemons = document.querySelector('.pokemons')
const loadMoreButton = document.querySelector('#LoadMoreButton')
const contModal = document.querySelector(".containerModal")
const modal = document.querySelector("#modal")
const maxRecord = 151
const limit = 5
let offset = 0


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(pokemon => 
            ` <li class="pokemon ${pokemon.type}" onclick="mostrarPokemon(${pokemon.number})" >
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src=${pokemon.image} >
                </div>
            </li>`).join('')
        listPokemons.innerHTML += newHtml
    })
}


loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () =>{
    offset += limit

    const qdtRecord = offset + limit

    if(qdtRecord >= maxRecord){
        const newLimit = maxRecord - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadPokemonItens(offset, limit)
    }
    
})

function mostrarPokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(r => r.json()).then(body => {

        contModal.classList.toggle("active")
        modal.removeAttribute('class')
        const types = body.types.map(typeSlot => typeSlot.type.name)
        const [type] = types
        modal.innerHTML = `
                <div class="pokemonImage"><img src="${body.sprites.other.dream_world.front_default}"></div>
                <h1>${body.name}</h1>
                <span>${body.id}</span>
                <button>X</button>
                <ul class="tipoPoke"></ul>
                
                <p>HP: ${body.stats[0].base_stat}</p>
        `
        modal.classList.add(type)
        const modalUl = document.querySelector('#modal ul')
        const divLi1 = document.createElement("li")
        const divLi2 = document.createElement("li")

        if(types.length === 1){
            divLi1.innerText = types[0]
            divLi1.classList.add(types[0])
            modalUl.appendChild(divLi1)
        }else{
            divLi1.innerText = types[0]
            divLi1.classList.add(types[0])
            divLi2.innerText = types[1]
            divLi2.classList.add(types[1])
            modalUl.appendChild(divLi1)
            modalUl.appendChild(divLi2)
        } 
        const modalClose = document.querySelector('#modal button')

        modalClose.addEventListener('click', () => {
            contModal.classList.remove("active")
        })
        
    })
}

