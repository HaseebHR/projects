/********************************************************************
* TicTacToe
*
* By Haseeb ur rehman
********************************************************************/

var TicTacToe = function(){

    var readlineSync = require('readline-sync');

  // object for players

  var players ={
    1 : {
        name : "Player 1",
        symbol : "X"
    },
    2 : {
        name : "Player 2",
        symbol : "O"
      }
  }

  // represents the tictactoe board
  // 0 = blank
  // 1 = player1
  // 2 = player2
  var board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

  /**
  * Initializes the game.
  */
  this.init = function(){
    console.log("***********TIC TAC TOE***************");

    do {

      players[1].name = readlineSync.question('Press enter to default to "Player 1" or What is your name : ') || players[1].name;
      players[1].symbol = readlineSync.question('Press enter to default to X or select your symbol(x or 0) : ') || players[1].symbol;

      players[2].name = readlineSync.question('Press enter to default to "Player 2" or What is your name : : ') || players[2].name;
      players[2].symbol = readlineSync.question('Press enter to default to O : ') || players[2].symbol;

      if(players[1].name === players[2].name){
        console.log("Please Select Different Player Names!")
      }else if(players[1].symbol === players[2].symbol){
        console.log("Please Select Different Symbols!")
      }

    }while(players[1].name === players[2].name ||
           players[1].symbol === players[2].symbol);
  }

  /**
  * Here Games Start
  */
  this.play = function() {

    // start with player 1
    var currentPlayer = 1;

    gameStart();

    do {
      do {
        var indices = readlineSync.question(players[currentPlayer].name + ", choose your indices(i.e 0,2) or I'll choose for you:") || getNextEmpty();
        indices = indices.split(",");

        if((indices[0] > 2 || indices[0] < 0) ||
          (indices[1] > 2 || indices[1] < 0)){
          console.log("That doesn't exist! Please choose indices between 0 and 2.")
        }

        board[+indices[0]][+indices[1]] = currentPlayer;

      } while((indices[0] > 2 || indices[0] < 0) ||
              (indices[1] > 2 || indices[1] < 0));

      // switch players
      currentPlayer = currentPlayer == 1 ? 2 : 1;

      gameStart();
    } while (!checkWinner() && !isFilled());

    // End of game
    if(checkWinner()){
      console.log(players[checkWinner()].name + " Wins!")
    } else if(isFilled()){
      console.log("Looks like the board is filled!")
    }
    var replay = readlineSync.question("Play again?(y/n) : ") || "n";

    if(replay == "y"){
      clearBoard();
      this.play();
    }
  }

  /**
  * Checks if there is a winner. 8 possible ways you could win.
  */
  function checkWinner(){

    // check rows and columns
    for(var i = 0; i < 3; i++){
      // check rows
      if(board[i][0] == board[i][1] &&
      board[i][1] == board[i][2] &&
      board[i][0] != 0){
        console.log("Looks like Player")
        return board[i][0];
      }

      // check columns
      if(board[0][i] == board[1][i] &&
      board[1][i] == board[2][i] &&
      board[0][i] != 0){
        return board[0][i];
      }
    }

    // check diagonal left to right
    if(board[0][0] == board[1][1] &&
    board[1][1] == board[2][2] &&
    board[0][0] != 0){
      return board[0][0];
    }

    // check diagonal right to left
    if(board[0][2] == board[1][1] &&
    board[1][1] == board[2][0] &&
    board[0][2] != 0){
      return board[0][2];
    }

    return 0;
  }

  /**
  * Checks if the board is filled.
  */
  function isFilled(){
    // iterate through the board
    for(var i = 0; i < 3; i++){
      for(var j = 0; j < 3; j++){
        //return true if any of the elements are empty
        if(board[i][j] === 0){
          return false;
        }
      }
    }

    // otherwise, return true
    return true;
  }

  /**
  * Returns indices(string) of the next empty square.
  */
  function getNextEmpty(){
    // iterate through the board
    for(var i = 0; i < 3; i++){
      for(var j = 0; j < 3; j++){
        //return true if any of the elements are empty
        if(board[i][j] === 0){
          return i+','+j;
        }
      }
    }
  }

  /**
  * Draws the board.
  */
  function gameStart(){
    console.log("___________________________________________");
    console.log(players[1].name + " = " + players[1].symbol);
    console.log(players[2].name + " = " + players[2].symbol);

    console.log("___________________")

    for(var i = 0; i < 3; i++){
      console.log("|     |     |     |");
      var row = "";
      var symbol = " ";
      for(var j = 0; j < 3; j++){
        symbol = board[i][j] == 0 ? " " : players[board[i][j]].symbol;
        row += "|  " + symbol + "  ";
      }
      row += "|";
      console.log(row);
      console.log("|_____|_____|_____|");
    }
  }

  /**
  * Clears the board.
  */
  function clearBoard(){
    // set all elements to 0
    for(var i = 0; i < 3; i++){
      for(var j = 0; j < 3; j++){
        board[i][j] = 0;
      }
    }
  }
}

var ticTacToe = new TicTacToe();

ticTacToe.init();
ticTacToe.play();
