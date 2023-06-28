<script>
import { ref } from "vue";
import axios from "axios";
// import svgIcon from "../../assets/arrow-fat-line-down.svg";
export default {
  data() {
    return {
      carousel: null,
      carousel02: null,
      carousel03: null,
      container: null,
      myspan: null,
      pokemonArray: [],

      reels: Array.from({ length: 10 }, (_, i) => i),
    };
  },
  methods: {
    spin() {
      const spinDuration = Math.floor(Math.random() * (3000 - 2000 + 1)) + 2000; // Duração do giro em milissegundos

      const spinInterval = setInterval(() => {
        this.$refs.carousel.scrollTop -= this.$refs.carousel.scrollHeight / 40;
      }, 200);

      const spinInterval02 = setInterval(() => {
        this.$refs.carousel02.scrollTop -=
          this.$refs.carousel02.scrollHeight / 40;
      }, 230);

      const spinInterval03 = setInterval(() => {
        this.$refs.carousel03.scrollTop -=
          this.$refs.carousel03.scrollHeight / 40;
      }, 260);

      setTimeout(() => {
        clearInterval(spinInterval);
      }, spinDuration);
      setTimeout(() => {
        clearInterval(spinInterval02);
      }, spinDuration);
      setTimeout(() => {
        clearInterval(spinInterval03);
      }, spinDuration);
      setTimeout(() => {}, spinDuration);
    },
    async getPokemonArray() {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=40"
        );
        const results = response.data.results;
        const pokemonArray = await Promise.all(
          results.map(async (pokemon) => {
            const pokemonResponse = await axios.get(pokemon.url);
            const pokemonImageUrl = pokemonResponse.data.sprites.front_default;
            return {
              name: pokemon.name,
              image_url: pokemonImageUrl,
            };
          })
        );
        this.pokemonArray = pokemonArray;
      } catch (error) {
        console.log("Falha ao obter a lista de Pokémon.", error);
      }
    },
  },
  mounted() {
    this.getPokemonArray();
  },
};
</script>
<template>
  <div class="mb-5 mt-24">
    <div class="w-full flex z-20 relative items-center flex-col justify-center">
      <div
        class="game w-full max-w-[680px] z-20 relative flex flex-col justify-center items-center"
      >
        <div
          class="w-full max-w-[250px] lg:max-w-[400px] z-0 absolute -top-12 m-auto h-[150px] rounded-full bg-[#7823FB] border-[10px] border-[#9957FB]"
        ></div>
        <div
          ref="container"
          class="container w-full max-w-[500px] rounded-t-3xl z-20 relative h-[300px] border-[20px] border-[#7A40E4] flex justify-around items-center ring-8 ring-[#9957FB] bg-[#343434]"
        >
          <div
            class="flex flex-col justify-around h-full absolute -left-[15px]"
          >
            <div
              v-for="item in reels"
              class="w-[10px] h-[10px] rounded-full bg-[#9957FB]"
            ></div>
          </div>
          <div class="flex justify-around w-full absolute -top-[15px]">
            <div
              v-for="item in reels"
              class="w-[10px] h-[10px] rounded-full bg-[#9957FB]"
            ></div>
          </div>
          <div
            class="flex flex-col justify-around h-full absolute -right-[15px]"
          >
            <div
              v-for="item in reels"
              class="w-[10px] h-[10px] rounded-full bg-[#9957FB]"
            ></div>
          </div>
          <div class="flex justify-around w-full absolute -bottom-[15px]">
            <div
              v-for="item in reels"
              class="w-[10px] h-[10px] rounded-full bg-[#9957FB]"
            ></div>
          </div>

          <div
            v-if="pokemonArray.length > 0"
            class="container w-full max-w-[500px] z-20 relative h-[90%] flex justify-around items-center bg-[#343434]"
          >
            <div
              ref="carousel"
              class="w-[80px] lg:w-[120px] z-10 max-h-[120px] lg:max-h-[180px] flex flex-col-reverse overflow-hidden"
            >
              <div
                v-for="pokemon in pokemonArray.sort(() => Math.random())"
                :id="`reel-${pokemon.name}`"
                class="flex justify-center items-center w-[80px] lg:w-[120px] min-h-[120px] lg:min-h-[180px] bg-[#C6A2FC] border-[10px] border-[#7A40E9] smooth-scroll"
              >
                <img
                  class="w-full h-full object-cover scale-105"
                  :src="pokemon.image_url"
                  alt=""
                />
              </div>
            </div>
            <div
              class="w-[80px] lg:w-[120px] z-10 lg:max-h-[180px] max-h-[120px] flex flex-col-reverse overflow-hidden"
              ref="carousel02"
            >
              <div
                v-for="pokemon in pokemonArray.sort(() => Math.random() - 0.5)"
                class="flex justify-center items-center w-[80px] lg:w-[120px] min-h-[120px] lg:min-h-[180px] bg-[#C6A2FC] border-[10px] border-[#7A40E9] smooth-scroll"
              >
                <img
                  class="w-full h-full object-cover scale-105"
                  :src="pokemon.image_url"
                  alt=""
                />
              </div>
            </div>
            <div
              class="w-[80px] lg:w-[120px] z-10 lg:max-h-[180px] max-h-[120px] flex flex-col-reverse overflow-hidden"
              ref="carousel03"
            >
              <div
                v-for="pokemon in pokemonArray.sort(() => Math.random() - 0.5)"
                class="flex justify-center items-center w-[80px] lg:w-[120px] min-h-[120px] lg:min-h-[180px] bg-[#C6A2FC] border-[10px] border-[#7A40E9] smooth-scroll"
              >
                <img
                  class="w-full h-full object-cover scale-105"
                  :src="pokemon.image_url"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="w-7 h-7" v-else>
            <span
              class="animate-ping inline-flex h-full w-full rounded-full bg-[#9957FB] opacity-75"
            ></span>
          </div>
        </div>
        <div class="flex w-full max-w-[504px] relative h-[100px]">
          <div
            class="w-full max-w-[292px] h-[100px] bg-[#9957FB] ring-8 ring-[#9957FB] flex-none overflow-hidden right"
          ></div>
          <div
            class="w-full max-w-[292px] h-[100px] bg-[#9957FB] ring-8 ring-[#9957FB] flex-none overflow-hidden left"
          ></div>

          <button
            @click="spin"
            class="w-28 h-14 outline-none rounded-md transition-all text-lg hover:font-semibold ease-linear duration-200 bg-[#8256E4] text-white flex items-center justify-center z-20 absolute right-4 bottom-0 border-4 border-[#7823d3] button-spin"
          >
            Spin
          </button>
        </div>
        <div
          class="w-full max-w-[530px] h-10 bg-[#7823FB] lg:mt-[16px] flex items-center justify-around ring-8 ring-[#9957FB] footer-game"
        >
          <div
            v-for="item in reels"
            class="w-[15px] h-[15px] rounded-full bg-[#9957FB]"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.left {
  transform: skew(-8deg);
  position: absolute;
  left: -5px;
}
.right {
  transform: skew(8deg);
  position: absolute;
  right: -5px;
}
.button-spin {
  transform: rotatex(55deg);
}
@media screen and (max-width: 1180px) {
  .container {
    width: 100%;
    max-width: 480px;
  }
  .left {
    left: 5px;
  }
  .right {
    right: 5px;
  }
  .footer-game {
    max-width: 510px;
    margin-top: 15px;
  }
}
@media screen and (max-width: 600px) {
  .game {
    max-width: 380px;
  }
  .container {
    width: 100%;
    max-width: 380px;
    height: 200px;
  }
  .left {
    left: -6px;
    width: 200px;
    height: 90px;
  }
  .right {
    right: -6px;
    width: 200px;
    height: 90px;
  }
  .footer-game {
    width: 406px;
    margin-top: 5px;
  }
  .button-spin {
    width: 90px;
    height: 50px;
    font-size: 16px;
  }
}
</style>
<!-- pokemon api?

-->
