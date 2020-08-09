<template>
  <div id="app">
    <header>
      <h1>Battleship</h1>
    </header>
    <div class="d-flex center m-b-20">
      <button>Play</button>
      <button @click="restart">Restart</button>
    </div>
    <div class="d-flex">
      <h3>The play button does nothing! The restart button works! Just go!</h3>
    </div>
    <div class="d-flex space-evenly">
      <div>
        <h4 class="m-l-135">Player</h4>
        <GameBoard ref="playerBoard" :player="true" />
      </div>
      <div>
        <h4 class="m-l-125">Computer</h4>
        <GameBoard ref="computerBoard" :player="false" @fire="fire" />
      </div>
    </div>
  </div>
</template>

<script>
import GameBoard from "./components/GameBoard";
import { fire, computerMove, checkForWinner } from "./game";

export default {
  name: "App",
  components: { GameBoard },
  methods: {
    restart() {
      this.$refs.playerBoard.restart();
      this.$refs.computerBoard.restart();
    },
    fire(board, x, y) {
      fire(board, x, y);
      if (checkForWinner(board)) {
        alert("Player wins!");
        this.restart();
      }
      computerMove(
        this.$refs.playerBoard.board,
        this.$refs.playerBoard.boardSquares
      );
      if (checkForWinner(this.$refs.playerBoard.board)) {
        alert("Computer wins!");
        this.restart();
      }
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 1em;
  font-family: inherit;
}

html {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 62.5%;
}

#app {
  padding: 1rem;
}

h1 {
  font-size: 3.2rem;
  margin-bottom: 20px;
  margin-top: 20px;
  text-align: center;
}

h3 {
  font-size: 2rem;
  margin: 1rem auto;
}

h4 {
  font-size: 1.6rem;
}

button {
  background-color: rgb(230, 115, 150);
  border: none;
  border-radius: 15px;
  color: #fff;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 10px 25px;
  outline: none;
  text-decoration: none;
}

button:first-of-type {
  margin-right: 20px;
}

.m-b-20 {
  margin-bottom: 20px;
}

.d-flex {
  display: flex;
  flex-wrap: wrap;
}

.center {
  justify-content: center;
}

.space-evenly {
  justify-content: space-evenly;
}

.m-l-125 {
  margin-left: 125px;
}

.m-l-135 {
  margin-left: 135px;
}
</style>
