<script setup>
import { ref, onMounted, computed } from "vue";
import favicon from "../../assets/favicon.png";
import axios from "axios";
import { useStore } from "vuex";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import Game from "../Game/index.vue";
import videoModalComponent from "../VideoModalComponent/index.vue";
import GameModalComponent from "../GameModalComponent/index.vue";
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ local State↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
let isOpen = ref(true);
const store = useStore();
let gameOrVideo = computed(() => store.state.form.game_or_video);
let inputs = computed(() => store.state.form.inputs);
let selects = computed(() => store.state.form.selects);
let otherGender = computed(() => store.state.form.otherGender);
let authorization = computed(() => store.state.form.authorization);
let title = computed(() => store.state.form.title);
let description = computed(() => store.state.form.description);
let videoUrl = computed(() => store.state.form.video_url);
let buttonFormDisabled = ref(true);
let validEmail = false;
let validName = false;
let validPhoneNumber = false;
let recived = ref(false);

const gender = ref("gender");
// ↓↓↓↓↓↓↓↓↓↓↓↓ change global state function↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
const changeGender = (gender) => {
  const newForm = computed(() => store.state.form);
  for (let i = 0; i < newForm.value.otherGender.length; i++) {
    if (newForm.value.otherGender[i].id === gender.id) {
      newForm.value.otherGender[i].selected =
        !newForm.value.otherGender[i].selected;
    } else {
      newForm.value.otherGender[i].selected = false;
    }
  }
  store.commit("setForm", newForm);
};
const changeInputs = (input) => {
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (input.type === "email" && regexEmail.test(input.value)) {
    console.log("valid email");
    validEmail = true;
  } else if (input.type === "text" && input.value.length > 2) {
    console.log("valid name");
    validName = true;
  } else if (input.type === "tel" && input.value.length > 10) {
    console.log("valid phone number");
    validPhoneNumber = true;
  } else {
    console.log("invalid");
  }

  if (validEmail && validName && validPhoneNumber) {
    buttonFormDisabled.value = false;
  } else {
    buttonFormDisabled.value = true;
  }
  console.log(buttonFormDisabled.value, validEmail, validName);
};

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ moadal open/close functions↓↓↓↓↓↓↓↓↓↓
function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}

function recivedBonus() {
  isOpen.value = false;
  recived.value = true;
}
</script>

<template>
  <div
    v-if="!isOpen"
    class="fixed bottom-0 right-0 py-4 px-10 flex lg:flex-row flex-col items-center gap-4 lg:gap-[200px] justify-between w-full bg-[#9852f9]"
  >
    <div class="w-full max-w-[1440px] flex justify-start">
      <h3 class="font-bold text-2xl text-white">
        Click the button and guarantee your coupon now
      </h3>
    </div>
    <button
      type="button"
      @click="openModal"
      :disabled="recived"
      class="rounded-md bg-black bg-opacity-20 disabled:bg-slate-400 disabled:cursor-not-allowed w-[200px] px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      Get Coupon
    </button>
  </div>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              :class="
                'w-full transform overflow-hidden rounded-2xl bg-white p-6 pb-10 text-left align-middle shadow-xl transition-all ' +
                (gameOrVideo === 'game' ? 'max-w-[1440px]' : 'max-w-[680px]')
              "
            >
              <button
                class="absolute top-4 right-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                @click="closeModal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#837e9f"
                  viewBox="0 0 256 256"
                >
                  <path
                    d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"
                  ></path>
                </svg>
              </button>
              <div v-if="gameOrVideo === 'game'" class="mt-2">
                <GameModalComponent
                  :closeModal="closeModal"
                  :isOpen="isOpen"
                  :inputs="inputs"
                  :selects="selects"
                  :otherGender="otherGender"
                  :favicon="favicon"
                  :gender="gender"
                  :changeGender="changeGender"
                  :authorization="authorization"
                  :title="title"
                  :description="description"
                  :buttonFormDisabled="buttonFormDisabled"
                  :changeInputs="changeInputs"
                  :recivedBonus="recivedBonus"
                />
              </div>
              <div v-else class="mt-2">
                <videoModalComponent
                  :isOpen="isOpen"
                  :inputs="inputs"
                  :selects="selects"
                  :otherGender="otherGender"
                  :closeModal="closeModal"
                  :favicon="favicon"
                  :gender="gender"
                  :changeGender="changeGender"
                  :authorization="authorization"
                  :title="title"
                  :description="description"
                  :videoUrl="videoUrl"
                  :buttonFormDisabled="buttonFormDisabled"
                  :changeInputs="changeInputs"
                  :recivedBonus="recivedBonus"
                />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped>
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
</style>
