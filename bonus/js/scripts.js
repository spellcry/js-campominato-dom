// funzione che crea uno square
// restituisce un dom element
function getSquareElement(x, y) {
    const square = document.createElement('div');
    square.addEventListener('click', clickHandler);
    square.addEventListener('mousedown', mouseDownHandler);
    square.addEventListener('mouseup', mouseUpHandler);
    square.className = 'square';
    square.id = `${x + 1} ${y + 1}`;
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
    arrayBombe = [];
    while ( i < getNumBombe() ) {
        let xPos = getRandomIntInclusive(1, numCelleRiga);
        let yPos = getRandomIntInclusive(1, numCelleRiga);
        let strPos = `${xPos} ${yPos}`;
        if ( !arrayBombe.includes(strPos) ) {
            arrayBombe.push(strPos);
            i++;
        }
    }
}

// funzione che rivela tutte le bombe
function rivelaBombe() {
    let tabChild = tabelloneEl.firstChild;
    let i = 0;
    while ( i < arrayBombe.length ) {
        const num = tabChild.dataset.numero;
        if ( arrayBombe.includes(num) ) {
            tabChild.classList.add('bad');
            tabChild.style.cursor = 'auto';
            i++;
        }
        tabChild = tabChild.nextElementSibling;
    }
}

// funzione che decide se hai vinto, perso o continui a giocare
function vintoPersoContinua(cella) {
    if (arrayBombe.includes(cella.dataset.numero) ) {
        cella.classList.add('bad')
        removeListener();
        let resMsg = `Hai perso! Hai totalizzato ${punteggio} `;
        if( punteggio === 1 ) {
            resMsg += 'punto.';
        } else {
            resMsg += 'punti.';
        }
        resEl.append(resMsg);
        resEl.classList.add('lost');
        rivelaBombe();
        alert('Partita terminata! Hai perso.');
    } else {
        cella.classList.add('good')
        xy = cella.dataset.numero;
        let xySplitted = xy.split(' ');
        const x = parseInt(xySplitted[0]);
        const y = parseInt(xySplitted[1]);
        showCells(x - 1, y - 1, cella);
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

// funzione che restituisce una cella partendo da
// x e y
function getCellFromXY(x, y) {
    const cella = document.getElementById(`${x + 1} ${y + 1}`);
    return cella;
}

// funzione che mostra la/le cella/e a seconda del numero
// di bombe nelle vicinanze
function showCells(x, y, cella) {
    if(matrixCampo[y][x] !== 0) {
        cella.innerHTML = matrixCampo[y][x];
        return;
    } else {
        cella.innerHTML = matrixCampo[y][x];
        if(x - 1 >= 0) {
            // matrixCampo[y][x - 1] === 'B' ? countBombs++ : '';
            const cella = getCellFromXY(x - 1, y);
            showCells(x - 1, y, cella);
            if(y + 1 <= 9) {
                // matrixCampo[y + 1][x - 1] === 'B' ? countBombs++ : '';
                const cella = getCellFromXY(x - 1, y + 1);
                showCells(x - 1, y + 1, cella);
            }
            if(y - 1 >= 0) {
                // matrixCampo[y - 1][x - 1] === 'B' ? countBombs++ : '';
                const cella = getCellFromXY(x - 1, y - 1);
                showCells(x - 1, y - 1, cella);
            }
        }
        if(y - 1 >= 0) {
            // matrixCampo[y - 1][x] === 'B' ? countBombs++ : '';
            const cella = getCellFromXY(x, y - 1);
            showCells(x, y - 1, cella);
            if(x + 1 <= 9) {
                // matrixCampo[y - 1][x + 1] === 'B' ? countBombs++ : '';
                const cella = getCellFromXY(x + 1, y - 1);
                showCells(x + 1, y - 1, cella);
            }
        }
        if(x + 1 <= 9) {
            // matrixCampo[y][x + 1] === 'B' ? countBombs++ : '';
            const cella = getCellFromXY(x + 1, y);
            showCells(x + 1, y, cella);
            if(y + 1 <= 9) {
                // matrixCampo[y + 1][x + 1] === 'B' ? countBombs++ : '';
                const cella = getCellFromXY(x + 1, y + 1);
                showCells(x + 1, y + 1, cella);
            }   
        }
        if(y + 1 <= 9) {
            // matrixCampo[y + 1][x] === 'B' ? countBombs++ : '';
            const cella = getCellFromXY(x, y + 1);
            showCells(x, y + 1, cella);
        }
    }
}

//funzione che gestisce il mouseDown
function mouseDownHandler(event) {
    if(event.which === 1 && !rightMouseDown) {
        leftMouseDown = true;
    }
    if(event.which === 3 && leftMouseDown) {
        rightMouseDown = true;
        console.log(event.target)
    }
}

//funzione che gestisce il mouseDown
function mouseUpHandler(event) {
    if(event.which === 1) {
        leftMouseDown = false;
    }
    if(event.which === 3) {
        rightMouseDown = false;
        if(!leftMouseDown) {
            const square = this;
            if(square.classList.contains('flagged')) {
                square.innerHTML = '';
                square.classList.remove('flagged');
                square.addEventListener('click', clickHandler);
            } else {
                square.innerHTML = '<i class="fa-solid fa-flag"></i>';
                square.classList.add('flagged');
                square.removeEventListener('click', clickHandler);
            }
        }
    }
}

// funzione che gestisce il click
function clickHandler() {
    const square = this;
    square.classList.toggle('clicked'); 
    vintoPersoContinua(square); 
    square.style.cursor = 'auto';
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
            return 18;
        default:
            return 24;
    }
}

// funzione che calcola il numero di bombe totali
// ritorna un numero intero
function getNumBombe(){
    const difficulty = document.querySelector('.main-header__difficulty').value;
    switch ( difficulty ) {
        case '1':
            return 15;
        case '2':
            return 50;
        default:
            return 110;
    }
}

// funzione che mostra il campo
function mostraCampo() {
    // genero array bombe
    generaBombe();
    generaCampoConBombe();
    showBombsNerby();    
}

// funzione che genera il campo contenente le bombe
function generaCampoConBombe() {
    for ( let y = 0; y < numCelleRiga; y++ ) {
        matrixCampo[y] = new Array(numCelleRiga);
        for(let x = 0; x < numCelleRiga; x++) {
            if(arrayBombe.includes(`${x + 1} ${y + 1}`)) {
                matrixCampo[y][x] = 'B';
            } else {
                matrixCampo[y][x] = '';
            }
        }
    }
}

// funzione che aggiunge un quadrato al tabellone
function addSquareElementToCampo(x, y) {
    const squareEl = getSquareElement(x, y);
    const xy = `${x + 1} ${y + 1}`;
    squareEl.dataset.numero = xy;
    tabelloneEl.append(squareEl);
}

// funzione che aggiunge il numbero delle bombe confinanti alle celle
function showBombsNerby() {
    for ( let y = 0; y < numCelleRiga; y++ ) {
        for(let x = 0; x < numCelleRiga; x++) {
            if(!arrayBombe.includes(`${x + 1} ${y + 1}`)) {
                const bombsNerby = countBombsNerby(x, y);
                matrixCampo[y][x] = bombsNerby;
            }
            addSquareElementToCampo(x, y);
        }
    }
}

// funzione che calcola il numero delle bombe confinanti la cella
// e lo restituisce
function countBombsNerby(x, y) {
    let countBombs = 0;
    if(x - 1 >= 0) {
        matrixCampo[y][x - 1] === 'B' ? countBombs++ : '';
        if(y + 1 <= 9) {
            matrixCampo[y + 1][x - 1] === 'B' ? countBombs++ : '';
        }
        if(y - 1 >= 0) {
            matrixCampo[y - 1][x - 1] === 'B' ? countBombs++ : '';
        }
    }
    if(y - 1 >= 0) {
        matrixCampo[y - 1][x] === 'B' ? countBombs++ : '';
        if(x + 1 <= 9) {
            matrixCampo[y - 1][x + 1] === 'B' ? countBombs++ : '';
        }
    }
    if(x + 1 <= 9) {
        matrixCampo[y][x + 1] === 'B' ? countBombs++ : '';
        if(y + 1 <= 9) {
            matrixCampo[y + 1][x + 1] === 'B' ? countBombs++ : '';
        }   
    }
    if(y + 1 <= 9) {
        matrixCampo[y + 1][x] === 'B' ? countBombs++ : '';
    }
    return countBombs;
}

// funzione che inizia la partita
function iniziaGioco() {
    // preparo le variabili e resetto la tabella
    resetTabella();
    numCelleRiga = getNumCellePerRiga();
    matrixCampo = new Array(numCelleRiga);
    // setto lo stile in base al numero di celle per una riga
    tabelloneEl.style.gridTemplateColumns = `repeat(${numCelleRiga}, 1fr)`;
    mostraCampo();
}

const tabelloneEl = document.querySelector('.tabellone');
const resEl = document.querySelector('.main-header__result');
let numCelleRiga;
let arrayBombe = [];
let matrixCampo = null;
let punteggio = 0;
let leftMouseDown = false;
let rightMouseDown = false;

const playEl = document.querySelector('.main-header__btn');
playEl.addEventListener('click', iniziaGioco);