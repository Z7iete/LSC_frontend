<script setup>
import { reactive, computed, onMounted, ref } from 'vue'
import { useRecordsStore } from '@/modules/public/stores/recordsStore'
import { useSessionStore } from '@/modules/auth/stores/sessionStore'
import ItemCard from '@/modules/public/components/ItemCard.vue'

const recordsStore = useRecordsStore()
const sessionStore = useSessionStore()

const form = reactive({
  nombre: '',
  categoria: '',
  descripcion: '',
  precio: 1,
  destacado: false
})

const guardando = ref(false)
const errorCarga = ref('')
const mensajeEnvio = ref('')
const eliminando = ref(false)
const registroEliminando = ref('')

const formularioValido = computed(() => {
  return (
    form.nombre.trim() !== '' &&
    form.categoria.trim() !== '' &&
    form.descripcion.trim() !== '' &&
    Number(form.precio) > 0
  )
})

async function agregarRegistro() {
  if (!formularioValido.value) return
  guardando.value = true
  errorCarga.value = ''
  mensajeEnvio.value = ''
  const nuevoRegistro = {
    nombre: form.nombre,
    categoria: form.categoria,
    descripcion: form.descripcion,
    precio: Number(form.precio),
    activo: 1,
    destacado: form.destacado ? 1 : 0
  }
  try {
    await recordsStore.agregarRegistro(nuevoRegistro)
    if (recordsStore.error) { errorCarga.value = recordsStore.error; return }
    mensajeEnvio.value = recordsStore.mensaje
    form.nombre = ''; form.categoria = ''; form.descripcion = ''
    form.precio = 1; form.destacado = false
    sessionStorage.setItem('ultimaVista', 'registros')
  } finally {
    guardando.value = false
  }
}

onMounted(() => { recordsStore.cargarRegistros() })

async function confirmarDesactivacion(item) {
  const confirmar = window.confirm(`¿Seguro que deseas desactivar el servicio "${item.nombre}"?`)
  if (!confirmar) return
  eliminando.value = true
  registroEliminando.value = item.nombre
  try {
    await recordsStore.desactivarRegistro(item.id)
  } finally {
    eliminando.value = false
    registroEliminando.value = ''
  }
}
</script>

<template>
  <section class="registros">

    <div class="registros-header">
      <span class="registros-icono">📋</span>
      <div>
        <h2>Servicios del Taller</h2>
        <p>Gestión de servicios, productos, citas e inventario de Los Santos Customs</p>
      </div>
    </div>

    <p v-if="recordsStore.cargando" class="aviso-carga">Cargando registros...</p>
    <p v-if="recordsStore.error && !errorCarga" class="aviso">⚠️ {{ recordsStore.error }}</p>


    <div class="resumen">
      <div class="stat-card">
        <span class="stat-icono">🗂️</span>
        <div class="stat-info">
          <small>Total activos</small>
          <strong>{{ recordsStore.totalElementos }}</strong>
        </div>
      </div>
      <div class="stat-card">
        <span class="stat-icono">⭐</span>
        <div class="stat-info">
          <small>Destacados</small>
          <strong>{{ recordsStore.totalDestacados }}</strong>
        </div>
      </div>
      <div class="stat-card">
        <span class="stat-icono">💰</span>
        <div class="stat-info">
          <small>Precio promedio</small>
          <strong>${{ recordsStore.promedioValor }}</strong>
        </div>
      </div>
      <div class="stat-card">
        <span class="stat-icono">🔧</span>
        <div class="stat-info">
          <small>Categorías</small>
          <strong>{{ recordsStore.categorias.length }}</strong>
        </div>
      </div>
    </div>


    <div v-if="sessionStore.autenticado" class="formulario-box">
      <h3>Agregar servicio</h3>
      <p class="form-sub">Registra un nuevo servicio, producto o cita en el sistema</p>

      <form class="formulario" @submit.prevent="agregarRegistro">

        <div class="form-fila">
          <div class="campo">
            <label for="nombre">Nombre del servicio</label>
            <input type="text" id="nombre" v-model="form.nombre" placeholder="Ej: Cambio de aceite, Alineación..."
              @keyup.enter="agregarRegistro" />
            <small v-if="form.nombre.trim() === ''" class="campo-hint">Campo obligatorio</small>
          </div>
          <div class="campo">
            <label for="categoria">Categoría</label>
            <select id="categoria" v-model="form.categoria">
              <option value="">Selecciona una categoría</option>
              <option v-for="item in recordsStore.categorias" :key="item" :value="item">{{ item }}</option>
            </select>
            <small v-if="form.categoria === ''" class="campo-hint">Campo obligatorio</small>
          </div>
          <div class="campo">
            <label for="precio">Precio ($)</label>
            <input type="number" id="precio" v-model="form.precio" min="1" />
            <small v-if="Number(form.precio) <= 0" class="campo-hint">Debe ser mayor a 0</small>
          </div>
        </div>

        <div class="campo">
          <label for="descripcion">Descripción</label>
          <textarea id="descripcion" v-model="form.descripcion" placeholder="Describe el servicio o producto..."
            rows="3"></textarea>
          <small v-if="form.descripcion.trim() === ''" class="campo-hint">Campo obligatorio</small>
        </div>

        <label class="check-label">
          <input type="checkbox" v-model="form.destacado" />
          <span>⭐ Marcar como servicio destacado</span>
        </label>

        <p v-show="form.destacado" class="previo-destacado">
          Este registro se agregará como destacado en el catálogo
        </p>

        <div class="form-footer">
          <button type="submit" class="btn-submit" :disabled="!formularioValido || guardando">
            {{ guardando ? 'Guardando...' : formularioValido ? '✅ Agregar servicio' : '🔒 Completa el formulario' }}
          </button>
          <p v-if="errorCarga" class="aviso">⚠️ {{ errorCarga }}</p>
          <p v-if="mensajeEnvio" class="correcto">✅ {{ mensajeEnvio }}</p>
        </div>

      </form>
    </div>

    <div v-else class="aviso-login">
      <span>🔒</span>
      <p>Inicia sesión para agregar o gestionar servicios</p>
      <RouterLink to="/login" class="btn-login">🔑 Iniciar sesión</RouterLink>
    </div>

    <div v-if="recordsStore.registrosActivos.length > 0">
      <h3 class="lista-titulo">
        Registros activos
        <span class="lista-count">{{ recordsStore.totalElementos }}</span>
      </h3>
      <div class="lista">
        <ItemCard v-for="item in recordsStore.registrosActivos" :key="item.id" :destacado="item.destacado == 1"
          :categoria="item.categoria" :puede-eliminar="sessionStore.autenticado"
          @eliminar="confirmarDesactivacion(item)">
          <template #titulo>
            <h2>{{ item.nombre }}</h2>
          </template>
          <div class="item-detalle">
            <div class="item-fila">
              <small>Categoría</small>
              <span>{{ item.categoria }}</span>
            </div>
            <div class="item-fila">
              <small>Descripción</small>
              <span>{{ item.descripcion }}</span>
            </div>
            <div class="item-fila">
              <small>Precio</small>
              <span class="item-precio">${{ item.precio }}</span>
            </div>
            <div class="item-fila">
              <small>Valor</small>
              <span :class="{
                'valor-alto': Number(item.precio) >= 1000,
                'valor-medio': Number(item.precio) >= 300 && Number(item.precio) < 1000,
                'valor-bajo': Number(item.precio) < 300
              }">
                {{ Number(item.precio) >= 1000 ? '🔴 Valor alto' :
                  Number(item.precio) >= 300 ? '🟡 Valor medio' : '🟢 Valor accesible' }}
              </span>
            </div>
          </div>
        </ItemCard>
      </div>
    </div>


    <div v-else class="sin-contenido">
      <span>🔧</span>
      <p>No hay servicios activos registrados</p>
      <small>Agrega el primer servicio usando el formulario de arriba</small>
    </div>

    <div v-if="guardando" class="overlay">
      <div class="modal">
        <div class="loader"></div>
        <h3>Guardando servicio</h3>
        <p>Procesando en el servidor...</p>
      </div>
    </div>

    <div v-if="eliminando" class="overlay">
      <div class="modal">
        <div class="loader loader-rojo"></div>
        <h3>Desactivando registro</h3>
        <small>{{ registroEliminando }}</small>
      </div>
    </div>

  </section>
</template>


<style scoped>
.registros {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.registros-header {
  display: flex;
  align-items: center;
  gap: 14px;
}

.registros-icono {
  font-size: 38px;
  line-height: 1;
}

.registros-header h2 {
  margin: 0;
  font-size: 26px;
  font-weight: 700;
  color: #1a1a1a;
}

.registros-header p {
  margin: 4px 0 0;
  color: #555;
  font-size: 14px;
  font-weight: 500;
}

.aviso {
  color: #dc2626;
  font-weight: 700;
  font-size: 14px;
  margin: 0;
}

.correcto {
  color: #16a34a;
  font-weight: 700;
  font-size: 14px;
  margin: 0;
}

.aviso-carga {
  color: #555;
  font-weight: 500;
  font-size: 14px;
  margin: 0;
}

.resumen {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
}

.stat-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.stat-icono {
  font-size: 26px;
  line-height: 1;
}

.stat-info small {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #555;
  margin-bottom: 3px;
}

.stat-info strong {
  font-size: 22px;
  font-weight: 700;
  color: #cf1003;
  line-height: 1;
}

.formulario-box {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 22px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.formulario-box h3 {
  margin: 0 0 4px;
  font-size: 17px;
  font-weight: 700;
  color: #1a1a1a;
}

.form-sub {
  margin: 0 0 18px;
  color: #555;
  font-size: 14px;
  font-weight: 500;
}

.formulario {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-fila {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 12px;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.campo label {
  font-size: 13px;
  font-weight: 700;
  color: #1a1a1a;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.campo input,
.campo select,
.campo textarea {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1.5px solid #cbd5e1;
  background: #f8fafc;
  color: #1a1a1a;
  font-size: 14px;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.campo input::placeholder,
.campo textarea::placeholder {
  color: #aaa;
}

.campo input:focus,
.campo select:focus,
.campo textarea:focus {
  outline: none;
  border-color: #cf1003;
  background: white;
}

.campo textarea {
  resize: vertical;
  min-height: 80px;
}

.campo-hint {
  font-size: 12px;
  font-weight: 600;
  color: #dc2626;
}

.check-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  width: fit-content;
}

.check-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #cf1003;
  cursor: pointer;
}

.check-label span {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.previo-destacado {
  font-size: 13px;
  font-weight: 600;
  color: #660000;
  margin: 0;
}

.form-footer {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.btn-submit {
  padding: 11px 22px;
  border: none;
  border-radius: 8px;
  background: #cf1003;
  color: white;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
  white-space: nowrap;
}

.btn-submit:hover {
  background: #660000;
  transform: translateY(-1px);
}

.btn-submit:disabled {
  background: #cbd5e1;
  color: #64748b;
  cursor: not-allowed;
  transform: none;
}

.aviso-login {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.aviso-login span {
  font-size: 40px;
}

.aviso-login p {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.btn-login {
  background: #cf1003;
  color: white;
  padding: 10px 22px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  transition: background 0.2s;
}

.btn-login:hover {
  background: #660000;
  opacity: 1;
}

.lista-titulo {
  font-size: 17px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.lista-count {
  background: #fef3c7;
  border: 1px solid #fcd34d;
  color: #b45309;
  font-size: 12px;
  font-weight: 700;
  padding: 2px 10px;
  border-radius: 20px;
}

.lista {
  display: grid;
  gap: 12px;
}

.item-detalle {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.item-fila {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 7px;
  padding: 9px 12px;
}

.item-fila small {
  font-size: 12px;
  font-weight: 600;
  color: #555;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.item-fila span {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  max-width: 60%;
  text-align: right;
}

.item-precio {
  color: #660000 !important;
  font-weight: 700 !important;
}

.valor-alto {
  color: #dc2626 !important;
  font-weight: 700 !important;
}

.valor-medio {
  color: #660000 !important;
  font-weight: 700 !important;
}

.valor-bajo {
  color: #16a34a !important;
  font-weight: 700 !important;
}

.sin-contenido {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.sin-contenido span {
  font-size: 44px;
  display: block;
  margin-bottom: 12px;
}

.sin-contenido p {
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 6px;
}

.sin-contenido small {
  font-size: 13px;
  font-weight: 500;
  color: #555;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border: 1px solid #e2e8f0;
  padding: 28px;
  border-radius: 14px;
  text-align: center;
  width: 300px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.modal h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
}

.modal p {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  color: #555;
}

.modal small {
  font-size: 12px;
  font-weight: 500;
  color: #555;
}

.loader {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top-color: #cf1003;
  border-radius: 50%;
  animation: girar 0.8s linear infinite;
}

.loader-rojo {
  border-top-color: #dc2626;
}

@keyframes girar {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 600px) {
  .resumen {
    grid-template-columns: 1fr 1fr;
  }

  .form-fila {
    grid-template-columns: 1fr;
  }
}
</style>