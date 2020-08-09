<template>
  <div>
    <div class="grid-container">
      <div v-for="(squares, x) in board" :key="x">
        <div v-for="(square, y) in board" :key="y">
          <div
            class="square"
            :class="[board[x][y].hasShip && player ? 'ship' : '']"
            @click="fire($event, x, y)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ships, placeShip } from "../ship";

export default {
  name: "GameBoard",
  props: {
    player: Boolean,
  },
  data() {
    return {
      board: [[]],
      boardSquares: "",
    };
  },
  methods: {
    setUpBoard() {
      this.board = Array(10)
        .fill()
        .map(() => Array(10).fill());
      // If you pass an object into fill() they all reference the same object. This caused a huge headache trying to figure that out. Lesson learned. There's probably a more elegant way than a for loop, but it works
      for (let x = 0; x < this.board.length; x++) {
        for (let y = 0; y < this.board.length; y++) {
          this.board[x][y] = {
            hasShip: false,
            shipName: "empty",
            hit: false,
          };
        }
      }
      ships.map((ship) => placeShip(ship, this.board));
    },
    fire(event, x, y) {
      if (!this.$props.player) {
        // I tried removing the event listener after calling fire but that doesn't seem to work. So this is my hack solution
        if (this.board[x][y].hit) {
          console.log("no");
        } else {
          this.$emit("fire", this.board, x, y);
        }
      }
    },
    restart() {
      this.boardSquares.forEach((square) => {
        square.classList.remove("miss");
        square.classList.remove("hit");
      });
      this.setUpBoard();
    },
  },
  created() {
    this.setUpBoard();
  },
  mounted() {
    this.boardSquares = document.querySelectorAll(".square");
  },
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(10, 3.2rem);
  justify-content: center;
  margin-top: 20px;
}

.square {
  border: 1px solid rgb(115, 150, 230);
  height: 32px;
  width: 32px;
}

.ship {
  background-color: rgb(0, 0, 255, 0.25);
  border: 2px solid rgb(0, 0, 255);
}

.hit {
  background-color: rgb(255, 0, 0);
}

.miss {
  background-color: rgb(0, 0, 255);
}
</style>
