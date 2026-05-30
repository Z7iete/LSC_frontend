<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  destacado: Boolean,
  categoria: { type: String, default: '' },
  puedeEliminar: { type: Boolean, default: false }
})

const emit = defineEmits(['eliminar'])

const expandido = ref(false)

const textoBoton = computed(() => expandido.value ? 'Compactar' : 'Ver detalles')

const iconoCategoria = computed(() => {
  const iconos = {
    'Servicios': '🔧', 'Productos': '🛒', 'Citas': '📅', 'Clientes': '👤', 'Inventario': '📦', 'Soporte': '🛠️',
  }
  return iconos[props.categoria] || '⚙️'
})

function alternarVista() {
  expandido.value = !expandido.value
}

function eliminarTarjeta() {
  emit('eliminar')
}
</script>


<template>
  <article :class="['tarjeta-servicio', { destacado: props.destacado }]">


    <div class="encabezado">
      <div class="titulo-grupo">
        <span class="icono-cat">{{ iconoCategoria }}</span>
        <div class="titulo">
          <slot name="titulo">
            <h2>Sin título</h2>
          </slot>
          <span v-if="props.destacado" class="badge-destacado">⭐ Destacado</span>
          <span v-else class="badge-normal">Estándar</span>
        </div>
      </div>

      <div class="acciones">
        <button class="btn-alternar" @click="alternarVista">
          {{ textoBoton }}
        </button>
        <button v-if="props.puedeEliminar" class="btn-eliminar" @click="eliminarTarjeta" title="Desactivar registro">
          🗑
        </button>
      </div>
    </div>


    <div v-if="expandido" class="contenido">
      <slot>
        <p>No se proporcionó información.</p>
      </slot>
    </div>


    <div v-else class="compacto">
      <p>Haz clic en <strong>Ver detalles</strong> para consultar la información completa.</p>
    </div>

  </article>
</template>


<style scoped>
.tarjeta-servicio {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s ease;
}

.tarjeta-servicio:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.10);
}

.tarjeta-servicio.destacado {
  border-color: #cf1003;
  background: #fffbeb;
}

.encabezado {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}

.titulo-grupo {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex: 1;
}

.icono-cat {
  font-size: 28px;
  line-height: 1;
  margin-top: 2px;
  flex-shrink: 0;
}

.titulo {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.titulo h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
}

.badge-destacado,
.badge-normal {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  width: fit-content;
}

.badge-destacado {
  background: #fef3c7;
  color: #92400e;
  border: 1px solid #fcd34d;
}

.badge-normal {
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;
}


.acciones {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.btn-alternar,
.btn-eliminar {
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  transition: background 0.2s, transform 0.15s;
}

.btn-alternar {
  background: #cf1003;
  color: white;
}

.btn-alternar:hover {
  background: #660000;
  transform: translateY(-1px);
}

.btn-eliminar {
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.btn-eliminar:hover {
  background: #dc2626;
  color: white;
  transform: translateY(-1px);
}


.contenido {
  border-top: 1px solid #e2e8f0;
  padding-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  animation: desplegar 0.2s ease;
}

@keyframes desplegar {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.compacto {
  border-top: 1px solid #e2e8f0;
  padding-top: 12px;
}

.compacto p {
  color: #555;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
}

.compacto strong {
  color: #1a1a1a;
}
</style>