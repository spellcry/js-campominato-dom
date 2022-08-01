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
function generaBombe() {
    let i = 0;
    let celleTot = numCelleRiga ** 2;
    arrayBombe = [];
    while ( i < 16 ) {
        num = getRandomIntInclusive(1, celleTot);
        if ( !arrayBombe.includes(num) ) {
            arrayBombe.push(num);
            i++;
        }
    }
}

// funzione che decide se hai vinto, perso o continui a giocare
function vintoPersoContinua(cella) {
    if (arrayBombe.includes(parseInt(cella.dataset.numero)) ) {
        cella.classList.add('bad')
        let resMsg = `Hai perso! Hai totalizzato ${punteggio} `;
        if( punteggio === 1 ) {
            resMsg += 'punto.';
        } else {
            resMsg += 'punti.';
        }
        resEl.innerHTML = resMsg;
        resEl.classList.add('lost');
        alert('Partita terminata! Hai perso.');
    } else {
        cella.classList.add('good')
        punteggio++;
        if ( punteggio === numCelleRiga ** 2 - arrayBombe.length ) {
            removeListener();
            resEl.innerHTML = `Hai vinto! Hai totalizzato ${punteggio} punti!`;
            resEl.classList.add('win');
            alert('Partita terminata! Hai vinto!');
        } else {
            cella.removeEventListener('click', clickHandler);
        }
    }
}

// funzione che gestisce il click
function clickHandler() {
    const square = this;
    square.classList.toggle('clicked'); 
    vintoPersoContinua(square); 
    square.style.cursor = 'auto';
    console.log(square.dataset.numero);
}

// funzione che elimina gli event listener
function removeListener () {
    let tabChild = tabelloneEl.firstChild;
    while ( tabChild != null ) {
        tabChild.removeEventListener('click', clickHandler);
        tabChild = tabChild.nextElementSibling;
    }
}

// funzione che cancella la tabella precedente
function resetTabella() {
    punteggio = 0;
    removeListener();
    tabelloneEl.innerHTML = '';
    resEl.innerHTML = '';
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
function generaLista() {
    const numCelleTot = numCelleRiga ** 2;
    for ( let i = 0; i < numCelleTot; i++ ) {
        const squareEl = getSquareElement();
        squareEl.dataset.numero = i + 1;
        tabelloneEl.append(squareEl);
    }
}

// funzione che inizia la partita
function iniziaGioco() {
    // preparo le variabili e resetto la tabella
    resetTabella();
    numCelleRiga = getNumCellePerRiga();
    // setto lo stile in base al numero di celle per una riga
    tabelloneEl.style.gridTemplateColumns = `repeat(${numCelleRiga}, 1fr)`;
    // genero lista
    generaLista();
    // genero array bombe
    generaBombe();
}

const tabelloneEl = document.querySelector('.tabellone');
const resEl = document.querySelector('.main-header__result');
let numCelleRiga;
let arrayBombe = [];
let punteggio = 0;

const playEl = document.querySelector('.main-header__btn');
playEl.addEventListener('click', iniziaGioco);