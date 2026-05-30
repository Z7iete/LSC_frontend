<script setup>
import { provide, computed, onMounted } from 'vue';
import { useSessionStore } from '@/modules/auth/stores/sessionStore';
import MainNavbar from '@/modules/public/components/MainNavbar.vue';

const sessionStore = useSessionStore();
const nombreUsuarioGlobal = computed(() => sessionStore.nombreBienvenida);
const tipoPlanGlobal = computed(() => sessionStore.tipoPlan);

provide('nombreUsuarioGlobal', nombreUsuarioGlobal);
provide('tipoPlanGlobal', tipoPlanGlobal);

onMounted(async () => {
    await sessionStore.consultarSesion()
})
</script>

<template>
  <div class="app-shell">
    <MainNavbar />
    <main class="contenedor-pagina">
      <RouterView />
    </main>
    <footer class="app-footer">
      <span>Taller Mecánico Los Santos Customs &copy; {{ new Date().getFullYear() }}</span>
    </footer>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f1f5f9;
  color: #1a1a1a;
}

.contenedor-pagina {
  flex: 1;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 32px 24px 48px;
}

.app-footer {
  text-align: center;
  padding: 16px;
  font-size: 13px;
  color: #555;
  border-top: 1px solid #e2e8f0;
  background: white;
  font-weight: 500;
}
</style>