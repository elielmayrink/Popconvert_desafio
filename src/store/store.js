import { createStore } from "vuex";
import axios from "axios";

// Create a new store instance.
export const store = createStore({
  state() {
    return {
      form: {},
    };
  },
  mutations: {
    setForm(state, data) {
      // console.log(state, data);
      state.form = data;
    },
  },

  getters: {},
});
