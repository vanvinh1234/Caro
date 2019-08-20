const VALUE_EMPTY = 0;
const VALUE_X = 1;
const VALUE_O = 2;
const VALUE_WIN = 5;
const DEFAULT_COLS = 10;
const DEFAULT_ROWS = 10;
const DEFAULT_CELL_SIZE = 30;
let arrBoard = [];
let turn = 1;

function createBoard() {
    let board = document.getElementById("GameBoard");
    board.innerHTML = "";
    for (let i=0;i<DEFAULT_ROWS;i++){
        for (let j=0;j<DEFAULT_COLS;j++) {
            board.innerHTML += cell(i,j);
        }
    }
    addBoard();
}

function addBoard() {
    for (let i=0;i<DEFAULT_ROWS;i++){
        arrBoard[i] = [];
        for (let j=0;j<DEFAULT_COLS;j++) {
            arrBoard[i][j] = document.getElementById("cell-"+i+"-"+j);
        }
    }
}

function cell(x,y) {
    let html = "";
    let top = x * DEFAULT_CELL_SIZE;
    let left = y * DEFAULT_CELL_SIZE;

    html+= '<div id="cell-'+x+"-"+y+'"' +
        ' class="cells"'+
        ' onclick="clickCell('+x+","+y+')"'+
        ' style="position:absolute; width: '+ DEFAULT_CELL_SIZE+'px;'+
        ' height: '+DEFAULT_CELL_SIZE+'px;'+
        ' top:'+top+'px;'+
        ' left:'+left+'px;"'+
        '>'+'</div>';
    return html;
}
createBoard();
function clickCell(x,y) {
    let cell = document.getElementById("cell-"+x+"-"+y);
    if(cell.textContent == VALUE_EMPTY) {
        if (turn == VALUE_X) {
            cell.textContent = "x";
            cell.style.color = "white";
            cell.style.backgroundColor = "red";
            turn = VALUE_O;
        } else {
            cell.textContent = "o";
            cell.style.color = "white";
            cell.style.backgroundColor = "blue";
            turn = VALUE_X;
        }
    }
    checkWin(x,y);
}

function getCellValue(x,y) {
    let cell = document.getElementById("cell-"+x+"-"+y);
    return cell.textContent;
}

function checkWin(x,y) {
    let countX = getCount(x,y,"ngang");
    let countY = getCount(x,y,"doc");
    let countXY = getCount(x,y,"cheo1");
    let countYX = getCount(x,y,"cheo2");
    gameOver(countX);
    gameOver(countY);
    gameOver(countXY);
    gameOver(countYX);
}

function getCount(x,y,dir) {
    let count = 1;
    let i = 1;
    let j = 1;
    switch (dir) {

        case "ngang":
            while ((y+i)<DEFAULT_COLS && getCellValue(x,y+i) == getCellValue(x,y)){
                count++;
                i++;
            }
            while ((y-j)>= 0 && getCellValue(x,y-j) == getCellValue(x,y)) {
                count++;
                j++;
            }
            break;
        case "doc":
            while ((x+i)<DEFAULT_ROWS && getCellValue(x+i,y) == getCellValue(x,y)){
                count++;
                i++;
            }
            while ((x-j)>= 0 && getCellValue(x-j,y) == getCellValue(x,y)) {
                count++;
                j++;
            }
            break;
        case "cheo1":
            while ((x+i)<DEFAULT_ROWS && (y+i)<DEFAULT_COLS && getCellValue(x+i,y+1) == getCellValue(x,y)){
                count++;
                i++;
            }
            while ((x-j)>= 0 && (x-j)>= 0 && getCellValue(x-j,y-j) == getCellValue(x,y)) {
                count++;
                j++;
            }
            break;
        case "cheo2":
            while ((x-i)<DEFAULT_ROWS && (y+i)<DEFAULT_COLS && getCellValue(x-i,y+i) == getCellValue(x,y)){
                count++;
                i++;
            }
            while ((x+j)>= 0 && (y-j)>= 0 && getCellValue(x+j,y-j) == getCellValue(x,y)) {
                count++;
                j++;
            }
            break;
    }
    return count;

}

function gameOver(count) {
    if(count >= VALUE_WIN){
        alert("You won!")
    }
}

