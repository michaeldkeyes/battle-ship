function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function fire(board, x, y) {
  if (!board[x][y].hit) {
    // If the square has a ship but has not been clicked yet
    if (board[x][y].hasShip) {
      board[x][y].hit = true;
      event.target.classList.add('hit');
      console.log(`The computer's ${board[x][y].shipName} was hit!`);
    }
    // If the square does not have a ship and has not been clicked yet
    else {
      board[x][y].hit = true;
      event.target.classList.add('miss');
    }
  }
}

function computerMove(board, boardSquare) {
  let validMove = false;

  do {
    const x = getRandomNumber(0, 10);
    const y = getRandomNumber(0, 10);

    if (!board[x][y].hit) {
      if (board[x][y].hasShip) {
        board[x][y].hit = true;
        boardSquare[parseInt(x.toString() + y.toString())].classList.add('hit');
        console.log(`Your ${board[x][y].shipName} was hit!`);
        validMove = true;
      } else {
        board[x][y].hit = true;
        boardSquare[parseInt(x.toString() + y.toString())].classList.add(
          'miss'
        );
        validMove = true;
      }
    }
  } while (!validMove);
}

function checkForWinner(board) {
  // We flatten the board array to make it easier to iterate through, then we filter each square that has a ship and has not been hit
  const winCheck = board
    .flat()
    .filter((square) => square.hasShip && !square.hit);

  // If the array is greater than zero then that means there is still a ship that has not been sunk yet
  if (winCheck.length > 0) {
    return false;
  }

  return true;
}

module.exports = { fire, computerMove, checkForWinner };
