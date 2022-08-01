// funzione che crea uno square
// restituisce un dom element
function getSquareElement() {
    const square = document.createElement('div');
    square.addEventListener('click', clickHandler);
    square.className = 'square';
    return square; 
}

// funzione che gestisce il click
function clickHandler() {
    const square = this;
    square.classList.toggle('clicked');
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
    let numCelle = 7;
    if ( difficulty === '1' ) {
        numCelle = 10;
    }
    if ( difficulty === '2' ) {
        numCelle = 9;
    }
    return numCelle;
}

// funzione che inizia la partita
function iniziaGioco() {
    // preparo le variabili
    const tabelloneEl = document.querySelector('.tabellone');
    resetTabella(tabelloneEl);
    let numCelleRiga = getNumCellePerRiga();
    const numCelleTot = numCelleRiga ** 2;
    // setto lo stile in base al numero di celle per una riga
    tabelloneEl.style.gridTemplateColumns = `repeat(${numCelleRiga}, 1fr)`;
    // genero lista
    for ( let i = 0; i < numCelleTot; i++ ) {
        const squareEl = getSquareElement();
        squareEl.dataset.numero = i + 1;
        tabelloneEl.append(squareEl);
    }
}

const playEl = document.querySelector('.main-header__btn');
playEl.addEventListener('click', iniziaGioco);