var imported=document.createElement('script')
imported.src='js/modal.js'
document.head.appendChild(imported)
var $listItem=document.querySelector('.project-grid__item')
var pokemonRepository=(function(){'use strict'
var MAX_POKEMONS=150
var SITE_PROTOCOL='https://'
var SITE_ADDRESS='pokeapi.co/'
var SITE_API_PATH='api/v2/'
var SITE_ENDPOINT_POKEMON='pokemon/'
var SITE_PARAMETER_LIMIT='?limit='
var repository=[]
var apiUrl=SITE_PROTOCOL+SITE_ADDRESS+SITE_API_PATH+SITE_ENDPOINT_POKEMON+SITE_PARAMETER_LIMIT+MAX_POKEMONS
function loadDetails(pokemon){var url=pokemon.detailsUrl
return $.get(url,function(){console.log('getting details from '+url)}).done(function(details){pokemon.imageUrl=details.sprites.front_default
pokemon.height=details.height
pokemon.types=details.types
return pokemon}).fail(function(e){console.error(e)})}
function loadList(){return fetch(apiUrl).then(function(response){return response.json()}).then(function(json){json.results.forEach(function(item){console.log(item)
var pokemon={name:item.name,detailsUrl:item.url,height:-1,types:Object.keys({})}
add(pokemon)})}).catch(function(e){console.error(e)})}
function add(pokemon){if(typeof pokemon.height===typeof 0&&typeof pokemon.name===typeof ''){repository.push(pokemon)}
else throw console.log(": You didn't catch this pokemon!")}
return{add:add,getAll:function(){return repository},filter:function(name){return repository.filter(value=>value.name===name)},loadList:loadList,loadDetails:loadDetails}})()
function showDetails(pokemon){pokemonRepository.loadDetails(pokemon).then(function(){console.log('name: '+pokemon.name+', height: '+pokemon.height+', type: '+pokemon.types[0].type.name+'')
var secondaryText=''
if(pokemon.height>15){secondaryText=pokemon.height+' inches tall! wow what a big boi!'}else{secondaryText=pokemon.height+' inches... such a wittle pokeman.'}
modal(!1,!0,pokemon.name,'type: '+pokemon.types[0].type.name,secondaryText,pokemon.imageUrl,pokemon.detailsUrl)})}
function addListItem(pokemon){if(typeof pokemon.height===typeof 0&&typeof pokemon.name===typeof ''){var $pokemonTemplatedItem=$listItem.cloneNode(!1)
var $pokemonTemplatedButton=document.querySelector('.button--pokemon').cloneNode(!1)
var $projectGrid=document.querySelector('.project-grid')
$pokemonTemplatedButton.innerText=pokemon.name
$pokemonTemplatedItem.insertBefore($pokemonTemplatedButton,$pokemonTemplatedItem.firstElementChild)
$pokemonTemplatedButton.addEventListener('click',function(){showDetails(pokemon)})
$projectGrid.insertBefore($pokemonTemplatedItem,$projectGrid.firstElementChild)}}
console.log(pokemonRepository.getAll())
pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(pokemon){addListItem(pokemon)})})
