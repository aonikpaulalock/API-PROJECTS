// const toggleSpiner = ToDispalyNone =>{
//   document.getElementById('Spiners-grow').style.display = ToDispalyNone ; 
// }
function loadData(){
  const searchField = document.getElementById('Search-Field');
  const searchFieldValue =  searchField.value ;
  document.getElementById('Spiners-grow').style.display='block'
  searchField.value = '' ;
  
  if (searchFieldValue == '') {
    document.getElementById('error').style.display = 'block'
    document.getElementById('Show-Search').style.display = 'none';
  }
  else{
    fetch(`https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchFieldValue}`)
    .then(res => res.json())
    .then(data =>showPlayerInDisplay(data.player))
   
  }

}
const showPlayerInDisplay = players => {
     console.log(players);
  const parentDiv = document.getElementById('Show-Search');
  parentDiv.textContent = ''
  if (players === null || players.length == 0) {
    document.getElementById('error').style.display = 'block'
  }
  else{
    players?.forEach(player => {
      if ( player.strThumb === null) {
        player.strThumb = ''
      }
      else{
        const createDiv = document.createElement('div');
        createDiv.classList.add('col')
        createDiv.innerHTML = `
        <div class="card border-0 p-3 shadow rounded">
        <div class="imgage-Bg rounded">
          <img src="${player.strThumb}" class="card-img-top img-fluid " alt="...">
        </div>
        <div class="card-body">
          <h4 class="card-title"><span>Name : </span>  ${player.strPlayer}</h4>
          <h5 class="card-title"><span>Position :</span>    ${player.strPosition}</h5>
          <h6 class="card-text mb-3"><span>Nationality:</span>   ${player.strNationality}</h6>
          <button class="btn btn-success fw-bold text-white"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="detailsData('${player.idPlayer}')">Show Details</button>
          <button class="btn btn-danger fw-bold text-white">Delete Details</button>
        </div>
      </div> 
        `
      parentDiv.appendChild(createDiv)
      document.getElementById('Spiners-grow').style.display='none'
      document.getElementById('error').style.display = 'none' 
      }
   
    })
  }
  }

const detailsData = (playerId) => {
  const url = (`https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerId}`)
  fetch(url)
  .then(res => res.json())
  .then(data =>showModal(data.players[0]))
}

const showModal = (info) => {
 const createModal = document.getElementById('exampleModal');
 createModal.textContent = '' ;
 const createModalDiv = document.createElement('div')
 createModalDiv.className = 'modal-content modal-lg mx-auto ';
 createModalDiv.innerHTML = `
<div class="modal-header">
   <h2 class="modal-title">${info.strPlayer}</h2>
   <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
 </div>
 <div class="modal-body">
   <div class="d-flex">
    <img src="${info.strThumb}" class="w-50">
   <div class="ms-3"> 
   <h4>Born : ${info.dateBorn}</h4>
   <h4>Location : ${info.strBirthLocation}</h4>
    <p>Details : ${info.strDescriptionEN.slice(0,400)}</p>
   </div>
   </div>
 </div>
 `
 createModal.appendChild(createModalDiv)
}
