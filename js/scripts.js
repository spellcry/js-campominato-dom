// funzione che crea uno square
// restituisce un dom element
function getSquareElement() {
    const square = document.createElement('div');
    square.addEventListener('click', clickHandler);
    square.className = 'square';
    return square; 
}

// funzione che restituisce un numero intero random estremi inclusi
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// funzione che genera un array di bombe random non doppie
function generaBombe(celleTot) {
    let i = 0;
    while ( i < 16 ) {
        num = getRandomIntInclusive(1, celleTot);
        if ( !arrayBombe.includes(num) ) {
            arrayBombe.push(num);
        }
        i++;
    }
}

// funzione che gestisce il click
function clickHandler() {
    const square = this;
    square.classList.toggle('clicked');
    if (arrayBombe.includes(parseInt(square.dataset.numero)) ) {
        square.classList.add('bad')
    } else {
        square.classList.add('good')
        square.removeEventListener('click', clickHandler);
    }
    square.style.cursor = 'auto';
    console.log(square.dataset.numero);
}

// funzione che cancella la tabella precedente
// ed elimina gli eventListener
function resetTabella(tabellone) {
    let tabChild = tabellone.firstChild;
    while ( tabChild != null ) {
        tabChild.removeEventListener('click', clickHandler);
        tabChild = tabChild.nextElementSibling;
    }
    tabellone.innerHTML = '';
}

// funzione che calcola il numero di celle per riga
// ritorna un numero intero
function getNumCellePerRiga(){
    const difficulty = document.querySelector('.main-header__difficulty').value;
    switch ( difficulty ) {
        case '1':
            return 10;
        case '2':
            return 9;
        default:
            return 7;
    }
}

// funzione che genera la lista
function generaLista( celleRiga ) {
    const numCelleTot = celleRiga ** 2;
    for ( let i = 0; i < numCelleTot; i++ ) {
        const squareEl = getSquareElement();
        squareEl.dataset.numero = i + 1;
        tabelloneEl.append(squareEl);
    }
}

// funzione che inizia la partita
function iniziaGioco() {
    // preparo le variabili e resetto la tabella
    resetTabella(tabelloneEl);
    let numCelleRiga = getNumCellePerRiga();
    // setto lo stile in base al numero di celle per una riga
    tabelloneEl.style.gridTemplateColumns = `repeat(${numCelleRiga}, 1fr)`;
    // genero lista
    generaLista(numCelleRiga);
    generaBombe(numCelleRiga**2);
}

const tabelloneEl = document.querySelector('.tabellone');
let arrayBombe = [];
const playEl = document.querySelector('.main-header__btn');
playEl.addEventListener('click', iniziaGioco);