let players = ['x', 'o'];
let playerName = ['Игрок X', 'Игрок 0'];
let activePlayer = 0;
let boardSize = 4;
let newBoard = [];
let winSequence = 3;

function startGame () {
  // "вызывается без параметров при открытии или перезапуске игры. В ней нужно создать поле игры и выбрать активного игрока"

  newBoard.length = 1; // обнуляем длину массива, чтобы доска рисовалась правильно при выборе меньших полей на кнопках ресета

  //заполняем переменные игры
  boardSize = prompt('Новая игра крестики-нолики. Введите размер доски:', boardSize);
  if (!boardSize) {
    boardSize = 4;
  }
  playerName[0] = prompt('Введите имя первого игрока:', playerName[0]);
  if (!playerName[0]) {
    playerName[0] = 'Игрок X';
  }
  playerName[1] = prompt('Введите имя второго игрока:', playerName[1]);
  if (!playerName[1]) {
    playerName[1] = 'Игрок 0';
  }
  winSequence = prompt('Выигрышная серия:', winSequence);
  if (!winSequence) {
    winSequence = 3;
  }
  winSequence = parseInt(winSequence, 10); // боремся к конкатенацией и стрингованием
  
  // набиваем массив доски
  for (let i = 0; i < boardSize; i++){
    newBoard[i] = [];
    for (let j = 0; j < boardSize; j++){
      newBoard[i][j] = '';
    }
  }
  
  // рендерим доску
  renderBoard(newBoard);

  // вносим случайность в выбор первого игрока
  if (Math.floor(Math.random()*10) > 5) { 
    activePlayer = 1;
  }
  alert(`Первым ходит ${playerName[activePlayer]}`);
}

function click (clickRow, clickCol) {
  //вызывается при клике игрока по полю. Вызов происходит с двумя значениями — номер строки и колонки, по которой произошел клик. В этой функции нужно обновить игровое поле и проверить, выиграл ли игрок, либо можно передавать ход следующему

  // записываем в доску символ активного игрока
  if (newBoard[clickRow][clickCol] === '') {
    newBoard[clickRow][clickCol] = players[activePlayer];
    renderBoard(newBoard);
  }
  
  // выигрываем
  if (checkWin(activePlayer)) {
    showWinner(playerName[activePlayer]);
    return;
  }
  else { // или передаём ход 
    if (activePlayer == '0') {
      activePlayer = '1';
    }
    else {
      activePlayer = '0';
    }
  }
}

function checkWin(whoIsChecking) {
  let checkArray = []; //объявляем временный массив, который будем заполнять и проверять
  
  //проверяем горизонтали
  checkArray.length = 0; //нулим проверочный массив
  for (let i = 0; i < boardSize; i++) {
    checkArray = newBoard[i]; //заполняем проверочный массив из горизонталей
    if (checkArraySearch(checkArray, whoIsChecking)) { //проверяем полученный массив
      return true; 
    }
  }

  //проверяем вертикали
  checkArray.length = 0; //нулим проверочный массив
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      checkArray[j] = newBoard[j][i]; // заполняем проверочный массив данными из вертикалей
//      console.log(`j=${j} i= ${i} board ${newBoard[j][i]}`); //не понимаю, откуда в ячейке end-0 появляется символ из ячейки 0-0
    }
    if (checkArraySearch(checkArray, whoIsChecking)) { //проверяем полученный массив
      return true;
    }
    console.log(newBoard);
  }

  //проверяем диагонали
  checkArray.length = 0; //нулим проверочный массив

  for (let i = 0; i < boardSize; i++) {
    //checkArray = newBoard[i][i];
  }

  for (let i = 0, j = boardSize - 1, checkArray = []; i < boardSize; i++, j--) {
    //checkArray = newBoard[i][j];
  }

  //возвращаем отрицательный результат
  return false;
}

function checkArraySearch(checkArray, whoIsChecking) {
  // объявляем символы активного игрока и оппонента
  let checkSymbolActive = players[0];
  let checkSymbolOpponent = players[1];
  if (whoIsChecking == '1') {
    checkSymbolActive = players[1];
    checkSymbolOpponent = players[0];
  }

  let checkSequenceStart = parseInt(checkArray.indexOf(checkSymbolActive), 10); //объявляем начальный индекс проверяемой последовательности

    if (checkSequenceStart != -1) { //проверяем наличие искомого символа
      while (checkSequenceStart != -1) { //пока искомый символ есть, повторяем перебор
        let checkSequenceEnd = checkSequenceStart + winSequence; // получаем конечный индекс проверяемой серии
        let checkSequence = checkArray.slice(checkSequenceStart, checkSequenceEnd); //вычленяем серию
      
        if (checkSequence.length === winSequence && checkSequence.includes(checkSymbolActive) && !checkSequence.includes('') && !checkSequence.includes(checkSymbolOpponent)) { //проверяем серию на критерии выигрыша
          return true;
        }
        checkSequenceStart = parseInt(checkArray.indexOf(checkSymbolActive, checkSequenceStart + 1), 10); // продолжаем поиск  в последовательности
      }
    }
  return false;
}