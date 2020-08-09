let ships = [
  {
    name: 'Destroyer',
    length: 2,
  },
  {
    name: 'Submarine',
    length: 3,
  },
  {
    name: 'Cruiser',
    length: 3,
  },
  {
    name: 'Battleship',
    length: 4,
  },
  {
    name: 'Carrier',
    length: 5,
  },
];

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function findSpot(ship, board) {
  let validSpot;
  let validRight;
  let validDown;
  let rngX;
  let rngY;

  do {
    validSpot = false;
    validRight = true;
    validDown = true;
    rngX = getRandomNumber(0, 10);
    rngY = getRandomNumber(0, 10);
    console.log(`Checking coordinates ${rngX} ${rngY}`);
    // Check if there is not a ship already there
    if (!board[rngX][rngY].hasShip) {
      console.log('This seems like a good spot...');
      // Check if there is space to the right {
      if (rngX + ship.length < 10) {
        console.log('Checking for other ships to the right...');
        for (let i = 0; i <= ship.length; i++) {
          console.log(`Does this location have a ship? ${rngX + i} ${rngY}`);
          console.log(`${board[rngX + i][rngY].hasShip}`);
          if (board[rngX + i][rngY].hasShip) {
            validRight = false;
            console.log("There's a ship to the right...");
            break;
          }
        }
      } else {
        validRight = false;
        console.log('No space to the right...');
      }

      // Check if there is space down {
      if (rngY + ship.length < 10) {
        console.log('Checking for other ships down...');
        for (let i = 0; i <= ship.length; i++) {
          console.log(`Does this location have a ship? ${rngX} ${rngY + i}`);
          console.log(`${board[rngX][rngY + i].hasShip}`);
          if (board[rngX][rngY + i].hasShip) {
            validDown = false;
            console.log("There's a ship down...");
            break;
          }
        }
      } else {
        validDown = false;
        console.log('No space down...');
      }
    } else {
      validRight = false;
      validDown = false;
    }

    if (validRight || validDown) {
      validSpot = true;
    } else {
      console.log('Rerolling...');
    }
  } while (!validSpot);

  console.log(`Found a spot for ${ship.name}`);
  return { x: rngX, y: rngY, validRight, validDown };
}

function placeShip(ship, board) {
  let spot = findSpot(ship, board);
  let direction;

  // If both directions are eligible then flip a coin to choose direction
  if (spot.validRight && spot.validDown) {
    let rng = getRandomNumber(0, 2);
    if (rng === 0) {
      direction = 'right';
      console.log(
        `Placing ${ship.name} to the right starting at coordinates ${spot.x} ${spot.y}`
      );
    } else {
      direction = 'down';
      console.log(
        `Placing ${ship.name} down starting at coordinates ${spot.x} ${spot.y}`
      );
    }
  } else if (spot.validRight) {
    direction = 'right';
    console.log(
      `Placing ${ship.name} to the right starting at coordinates ${spot.x} ${spot.y}`
    );
  } else {
    direction = 'down';
    console.log(
      `Placing ${ship.name} down starting at coordinates ${spot.x} ${spot.y}`
    );
  }

  for (let i = 0; i < ship.length; i++) {
    if (direction === 'right') {
      board[spot.x + i][spot.y] = {
        hasShip: true,
        shipName: ship.name,
        hit: false,
      };
    } else {
      board[spot.x][spot.y + i] = {
        hasShip: true,
        shipName: ship.name,
        hit: false,
      };
    }
  }
}

module.exports = { ships, placeShip };
