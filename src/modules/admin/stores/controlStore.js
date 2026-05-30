import { defineStore } from "pinia";
import { ref } from "vue";

export const useControlStore = defineStore("control", () => {
  const notificaciones = ref(0);
  const citasPendientes = ref(0);
  const ordenesActivas = ref(0);

  function incrementarNotificaciones() {
    notificaciones.value++;
  }

  function resetNotificaciones() {
    notificaciones.value = 0;
  }

  return {
    notificaciones,
    citasPendientes,
    ordenesActivas,
    incrementarNotificaciones,
    resetNotificaciones,
  };
});
