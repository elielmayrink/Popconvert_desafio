<script setup>
import { ref, onMounted, computed, defineProps } from "vue";
import Game from "../Game/index.vue";

const {
  isOpen,
  inputs,
  selcts,
  otherGender,
  closeModal,
  favicon,
  gender,
  changeGender,
  authorization,
  title,
  description,
  changeInputs,
  buttonFormDisabled,
  recivedBonus,
} = defineProps({
  isOpen: Boolean,
  inputs: Array,
  selects: Array,
  otherGender: Array,
  closeModal: Function,
  favicon: String,
  gender: String,
  changeGender: Function,
  authorization: Boolean,
  title: String,
  description: String,
  changeInputs: Function,
  buttonFormDisabled: Boolean,
  recivedBonus: Function,
});
</script>
<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm mb-4">
    <img class="mx-auto h-10 w-auto" :src="favicon" alt="Your Company" />
    <h2
      class="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
    >
      {{ title }}
    </h2>

    <p class="mt-2 text-center text-lg text-gray-600 max-w">
      {{ description }}
    </p>
  </div>
  <div class="flex items-center flex-col gap-5 lg:flex-row justify-around">
    <!-- GameComponent or videoComponent -->
    <div class="w-full lg:min-w-[600px]">
      <Game />
    </div>
    <div class="w-full max-w-[600px]">
      <form class="space-y-6 w-full max-w-[600px]">
        <div v-for="input in inputs">
          <label
            :for="input.type"
            class="block text-sm font-medium leading-6 text-gray-900"
            :key="input.type"
          >
            {{ input.label }}
          </label>
          <input
            :id="input.type"
            :type="input.type"
            :name="input.type"
            v-model="input.value"
            @change="changeInputs(input)"
            :value="input.value"
            :key="input.type"
            :placeholder="input.placeholder"
            class="block w-full max-w-[800px] px-2 rounded-md border py-1.5 text-gray-900 shadow-sm border-[#9852F9] placeholder:text-gray-400 focus:border-[#5D19B2] sm:text-sm sm:leading-6"
          />
        </div>
        <div v-for="select in selects">
          <div class="flex items-center justify-between">
            <label class="block text-sm font-medium leading-6 text-gray-900">{{
              select.label
            }}</label>
          </div>
          <div class="mt-1">
            <select
              :value="gender"
              v-model="gender"
              class="block w-full max-w-[200px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 p-4 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option
                v-for="option in select.options"
                :value="option"
                :key="option"
              >
                {{ option }}
              </option>
              <option value="gender">gender</option>
            </select>
          </div>
        </div>
        <div v-if="gender === 'Other'" class="flex gap-2 flex-wrap">
          <div class="border p-1 rounded-md" v-for="gender in otherGender">
            <label
              :key="gender.gender"
              class="flex items-center gap-1 cursor-pointer"
              :for="gender.gender"
              ><input
                :name="gender.gender"
                :id="gender.gender"
                @change="changeGender(gender)"
                :checked="gender.selected"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-indigo-[#9852F9] focus:ring-indigo-[#9852F9]"
              />
              {{ gender.gender }}
            </label>
          </div>
        </div>
        <div v-if="authorization" class="w-full max-w-md mb-4">
          <label
            class="flex items-center gap-2 border p-1 rounded-md"
            for="authorization"
          >
            <input
              type="checkbox"
              name="authorization"
              id=""
              :value="authorization"
            />
            I enhance the use of data for the necessary purposes
          </label>
        </div>
      </form>
      <button
        :disabled="buttonFormDisabled"
        @click="recivedBonus"
        class="flex w-full mt-4 justify-center rounded-md bg-[#9852F9] disabled:bg-slate-400 disabled:cursor-not-allowed px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#5D19B2] transition-all ease-linear duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Send
      </button>
    </div>
  </div>
</template>
