const barra = document.querySelector('#containernav2');
let controllo = "false";

function togliricerca()
{
  barra.classList.add('hidden');
}

function ricerca()
{
  if(controllo === "true")
  {
    barra.classList.add('hidden');
    controllo = "false";
  }
  else
  {
    barra.classList.remove('hidden');
    let simbolo = document.querySelector('div#barradiricerca img#chiudi1');
    let simbolo2 = document.querySelector('div#barradiricerca img#chiudi2');
    simbolo.addEventListener('click', togliricerca);
    simbolo2.addEventListener('click', togliricerca);
    controllo = "true"; 
  }

}

let lente = document.querySelector('div .opzione3 a'); 
lente.addEventListener('click', ricerca );


//---------------------------------------------------------------

let listaf = ['Img/Img15.png', 'Img/Img16.png', 'Img/Img17.png'];

function mostrainformazioni()
{
  let container = document.querySelector('#divconto div#flex-conto');
  container.classList.remove('hidden');

    
  for(let i=0; i<listaf.length; i++)
  {
    let fotosrc = listaf[i];
    const img = document.createElement('img');
    img.src = fotosrc;
    img.classList.add('img');
    const testo = document.createElement('h3');
    testo.textContent = "BBVA";

    
    let flexc = document.getElementById('c'+(i+1));
    flexc.appendChild(img);
    flexc.appendChild(testo);
  }
  conto.removeEventListener('mouseover', mostrainformazioni);

}

function nascondi(){
  const container = document.querySelector('#divconto div#flex-conto');
  
  for(let i=0; i<listaf.length; i++)
  {
    let flexc = document.getElementById('c'+(i+1));

    while (flexc.firstChild) {
      flexc.removeChild(flexc.firstChild);
    }
  }

  container.classList.add('hidden');
  conto.addEventListener('mouseover', mostrainformazioni);
}


let conto = document.querySelector('h3#scritta');
conto.addEventListener('mouseover', mostrainformazioni);


let container2 = document.querySelector('section div#container8');
container2.addEventListener('click', nascondi);

let container3 = document.querySelector('section div#container10');
container3.addEventListener('click', nascondi);


//---------------------------------------------------------------
let image;

let limgnuove = ['Img/Img12.png', 'Img/Img13.png', 'Img/Img14.png'];
let limgvecchie = ['Img/Img8.png', 'Img/Img9.png', 'Img/Img10.png'];

function ritornafoto(event)
{
    const image = event.currentTarget;
    let indice = parseInt(image.dataset.servizio);
    image.src = limgvecchie[indice-1];
}

function cambiafoto(event)
{
  const image = event.currentTarget;
  let indice = parseInt(image.dataset.servizio);
  image.src = limgnuove[indice-1];
  image.classList.add('img');
  image.addEventListener('mouseout', ritornafoto);
}


image = document.getElementById('imgs1');
image.addEventListener('mouseover', cambiafoto);

image = document.getElementById('imgs2');
image.addEventListener('mouseover', cambiafoto);


image = document.getElementById('imgs3');
image.addEventListener('mouseover', cambiafoto);

//-------------------------------------------------------
function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}

function getJson(json)
  {
    console.log(json.data);

    const select1 = document.querySelector('#valuta1');
    const select2 = document.querySelector('#valuta2');
  
    for (let key in json.data)  
    {  
      let optionElement = document.createElement("option");
      let optionElement2 = document.createElement("option");

      optionElement.value = json.data[key];
      optionElement.text = key;

      optionElement2.value = json.data[key];
      optionElement2.text = key;

      select1.appendChild(optionElement);
      select2.appendChild(optionElement2);
      
      console.log(key + ': ' + json.data[key])};
  }

function getInfo(json)
{
  console.log("vai:"+json.data)
  for (let key in json.data)  
  {
      console.log("ECCOLI:"+json.data[key])
  }

}



const url = 'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_2BHwIrWPLBTTXNMVSHldfqswiQHlRwEIGJu30Dx2';
const urlvaluta = 'https://api.freecurrencyapi.com/v1/currencies?apikey=fca_live_2BHwIrWPLBTTXNMVSHldfqswiQHlRwEIGJu30Dx2&currencies=IDR';

            
fetch(url,
  {
    method: 'GET',
  }).then(onResponse).then(getJson);

fetch(urlvaluta,
    {
      method: 'GET',
    }).then(onResponse).then(getInfo);


function cerca(event)
{
  event.preventDefault();
  const testo = document.querySelector('#quantita');
  const q = parseInt(testo.value);
  if(isNaN(q))
    console.log('Errore');

  let v1 = document.querySelector('#valuta1').value;
  let t1 = document.querySelector('#valuta1').options[document.querySelector('#valuta1').selectedIndex].text;
  let t2 = document.querySelector('#valuta2').options[document.querySelector('#valuta2').selectedIndex].text;
  let v2 = document.querySelector('#valuta2').value;

  let conversione = q*v2/v1;

  let divrisultato= document.querySelector('#risultato');
  let risultato= document.createElement("h2");
  risultato.textContent = conversione;
  divrisultato.appendChild(risultato);

}

const form = document.querySelector('form');
form.addEventListener('submit',cerca);

//---------------------------------------------------

function onTokenJson(json)
{
  // Imposta il token global
  token = json.access_token;
}

function onTokenResponse(response)
{
  return response.json();
}

const clientid_spotify = '6fdf4ff931eb4c4fb5a938f03e7ca31d';
const clientsecret_spotify = 'c7f51baf619d406d8fe6c9d13126f877';
// Dichiara variabile token
let token;
// All'apertura della pagina, richiediamo il token
fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(clientid_spotify + ':' + clientsecret_spotify)
   }
  }
).then(onTokenResponse).then(onTokenJson);

const album_input = document.querySelector('#album');
  // Esegui la richiesta
  fetch("https://api.spotify.com/v1/search?type=album&q=economia",
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponseS).then(onJsonS);

function onResponseS(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }
  
function onJsonS(json) {
    console.log('JSON ricevuto');
    const library = document.querySelector('#album-view');
    library.innerHTML = '';
    const results = json.albums.items;
    let num_results = results.length;
    if(num_results > 10)
      num_results = 8;
    for(let i=0; i<num_results; i++)
    {
      const album_data = results[i]
      const title = album_data.name;
      const selected_image = album_data.images[0].url;

      const album = document.createElement('div');
      album.classList.add('album');

      const img = document.createElement('img');
      img.src = selected_image;

      const caption = document.createElement('span');
      caption.textContent = title;

      album.appendChild(img);
      album.appendChild(caption);
      library.appendChild(album);
    }
  }
