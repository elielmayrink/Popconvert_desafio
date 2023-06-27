<script>
import { ref } from "vue";
import ModalComponent from "./components/ModalComponent/index.vue";
import axios from "axios";
export default {
  setup() {
    // expose to template and other options API hooks
    return {};
  },

  data() {
    pokemonArray: [];
  },

  methods: {},

  mounted() {
    axios.get("myInputs.json").then((res) => {
      this.$store.commit("setForm", res.data);
    });
  },
  created() {},
  components: {
    ModalComponent,
  },
};
</script>

<template>
  <main class="w-full max-w-[1440px]">
    <HeaderComponent />
    <ModalComponent />
  </main>
</template>
