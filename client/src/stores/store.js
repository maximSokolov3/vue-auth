import {ref} from 'vue';
import { defineStore } from 'pinia';

import {useAlertStore} from "@/stores/alertStore.js";

export const useStore = defineStore('store', () => {
  const alertStore = useAlertStore();

  let showMessage = ref(false);
  const isModalOpen = ref(false);
  let isLoading = ref(false);

  function setLoading(value) {
    isLoading.value = value
  }

  return {
    showMessage,
    isModalOpen,
    isLoading,
    setLoading
  }
});



