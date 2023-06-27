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
// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ moadal open/close functions↓↓↓↓↓↓↓↓↓↓
function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
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
      class="rounded-md bg-black bg-opacity-20 w-[200px] px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
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
