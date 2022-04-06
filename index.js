const tileObject = document.getElementsByClassName('tile');
const boardObject = document.getElementsByClassName('board')[0];

const tileColor = {
    0:{
        'background': 'rgb(235, 235, 235)',
        'font-size' : 'xx-large',
    },
    2: {
        'background': 'rgb(2, 131, 2)',
        'font-size' : 'xx-large'
    },
    4: {
        'background': 'rgb(208, 243, 50)',
        'font-size' : 'xx-large'
    },
    8: {
        'background': 'rgb(200, 202, 58)',
        'font-size' : 'xx-large'
    },
    16: {
        'background': 'rgb(226, 200, 48)',
        'font-size' : 'xx-large'
    },
    32: {
        'background': 'rgb(255, 187, 0)',
        'font-size' : 'xx-large'
    },
    64: {
        'background': 'rgb(255, 160, 19)',
        'font-size' : 'xx-large'
    },
    128: {
        'background': 'rgb(250, 126, 77)',
        'font-size' : 'xx-large'
    },
    256: {
        'background': 'rgba(255, 52, 37, 0.829)',
        'font-size' : 'xx-large'
    },
    512: {
        'background': 'rgb(255, 160, 153)',
        'font-size' : 'xx-large'
    },
    1024: {
        'background': 'rgb(255, 94, 174)',
        'font-size' : 'x-large'
    },
    2048: {
        'background': 'rgb(222, 151, 255)',
        'font-size' : 'large'
    }
}

var board = [
    [0, 0, 0, 0 ,0],
    [0, 0, 0, 0 ,0],
    [0, 0, 2, 0 ,0],
    [0, 0, 0, 0 ,0],
    [0, 0, 0, 0 ,0]
]

var remTiles = []

const drawTiles = () =>{
    for(let j = 0; j< 5; j++){
        for(let i =0; i< 5; i++){
            index = rowIndex(j, i);
            tileObject[index].innerText = board[j][i] == 0 ? '' : board[j][i];
            let boardVal = board[j][i] > 2048 ? 2048: board[j][i];
            for(let [key, val] of Object.entries(tileColor[boardVal])){
                tileObject[index].style[key] = val;
            }    
        }
    }
}

const rowIndex = (x, y) =>{
    return x*5 + y;
}

const createTile = () => {
    if(remTiles.length > 0){
        let newVal = Math.random() < 0.05 ? 4 : 2;
        let newIndex = Math.floor(Math.random() * remTiles.length);
        board[remTiles[newIndex][0]][remTiles[newIndex][1]] = newVal;
        removeRemTile(newIndex);
    }
    else{
        alert("game over !!!")
    }
}

const removeRemTile = (x) =>{
    remTiles.splice(x, 1);
}

const calcRem = () => {
    remTiles = [];
    for(let i = 0; i< 5; i++){
        for(let j = 0; j< 5; j++){
            if(board[i][j] == 0)
                remTiles.push([i,j])
        }
    }
}

const beginGame = () =>{
    calcRem();
    procedure();
}

const procedure = () => {
    drawTiles();
}

const actionFunction = (e) =>{
    switch(e.key){
        case 'ArrowUp': moveUp();
        break;
        case 'ArrowDown' : moveDown();
        break;
        case 'ArrowLeft' : moveLeft();
        break;
        case 'ArrowRight' : moveRight();
        break;
        default: return;
    }
    calcRem();
    createTile();
    calcRem();
    drawTiles();
}

document.addEventListener('keyup', actionFunction)



const moveUp = () =>{
    for(let j =0; j<5; j++){
        let pos = -1;
        let lastMerged = false;
        for(let i = 0; i<5; i++){
            if( board[i][j] != 0){
                if(pos == -1){ // gap between upper and node ;
                    pos = 0;
                    if(i != 0){
                        board[pos][j]  = board[i][j];
                        board[i][j] = 0;
                    }
                    continue;
                }
                if(board[i][j] == board[pos][j] && !lastMerged){
                    board[pos][j] *= 2;
                    board[i][j] = 0;
                    lastMerged = true;
                }
                else{
                    pos++;
                    if(pos != i){
                        board[pos][j] = board[i][j];
                        board[i][j] = 0;
                    }
                    lastMerged = false;
                }
            }   
        }
    }
}

const moveDown = () =>{
    for(let j = 4; j>=0; j--){
        pos = -1;
        let lastMerged = false;
        for(let i = 4; i >= 0; i--){
            if( board[i][j] != 0){
                if(pos == -1){ // gap between lower and node ;
                    pos = 4;
                    if(i != 4){
                        board[pos][j]  = board[i][j];
                        board[i][j] = 0;
                    }
                    continue;
                }
                if(board[i][j] == board[pos][j] && !lastMerged){
                    board[pos][j] *= 2;
                    board[i][j] = 0;
                    lastMerged = true;
                }
                else{
                    pos--;
                    if(pos != i ){
                        board[pos][j] = board[i][j];
                        board[i][j] = 0;
                    }
                    
                    lastMerged = false;
                }
            } 
        }
    }
}

const moveLeft = () =>{
    for(let i =0; i<5; i++){
        pos = -1;
        let lastMerged = false;
        for(let j = 0; j<5; j++){
            if( board[i][j] != 0){
                if(pos == -1){ // gap between left and node ;
                    pos = 0;
                    if(j != 0){
                        board[i][pos]  = board[i][j];
                        board[i][j] = 0;
                    }
                    continue;
                }
                if(board[i][j] == board[i][pos] && !lastMerged){
                    board[i][pos] *= 2;
                    lastMerged = true;
                    board[i][j] = 0;
                }
                else{
                    pos++;
                    if(pos != j){
                        board[i][pos] = board[i][j];
                        board[i][j] = 0;
                    }
                    
                    lastMerged = false;
                }
            }   
        }
    }
}

const moveRight = () =>{
    for(let i =4; i>=0; i--){
        pos = -1;
        let lastMerged = false;
        for(let j = 4; j>=0; j--){
            if( board[i][j] != 0){
                if(pos == -1){ // gap between left and node ;
                    pos = 4;
                    if(j != 4){
                        board[i][pos]  = board[i][j];
                        board[i][j] = 0;
                    }
                    continue;
                }
                if(board[i][j] == board[i][pos] && !lastMerged){
                    board[i][pos] *= 2;
                    lastMerged = true;
                    board[i][j] = 0;
                }
                else{
                    pos--;
                    if(pos != j){
                        board[i][pos] = board[i][j];
                        board[i][j] = 0;
                    }     
                    lastMerged = false;
                }
            }   
        }
    }
}

/////////
boardObject.addEventListener('touchstart', handleTouchStart);        
boardObject.addEventListener('touchmove', handleTouchMove);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                     
};

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            moveLeft()
        } else {
            moveRight()
        }                       
    } else {
        if ( yDiff > 0 ) {
           moveUp();
        } else { 
            moveDown();
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;      
    
    calcRem();
    createTile();
    calcRem();
    drawTiles();
};