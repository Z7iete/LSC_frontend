<script setup>
import { reactive, computed, ref } from 'vue'

const form = reactive({
    nombre:  '',
    correo:  '',
    mensaje: ''
})

const enviando     = ref(false)
const mensajeExito = ref('')
const mensajeError = ref('')

const correoValido     = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo))
const formularioValido = computed(() =>
    form.nombre.trim() !== '' &&
    correoValido.value &&
    form.mensaje.trim().length >= 10
)

async function enviarContacto() {
    if (!formularioValido.value) return

    enviando.value     = true
    mensajeExito.value = ''
    mensajeError.value = ''

    try {
        const respuesta = await fetch('https://lsc-backend.onrender.com', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre:  form.nombre,
                correo:  form.correo,
                mensaje: form.mensaje
            })
        })

        const datos = await respuesta.json()

        if (!respuesta.ok) {
            const detalle = datos.errores ? datos.errores.join(', ') : datos.mensaje
            throw new Error(detalle)
        }

        mensajeExito.value = datos.mensaje
        form.nombre  = ''
        form.correo  = ''
        form.mensaje = ''

    } catch (err) {
        mensajeError.value = err.message
    } finally {
        enviando.value = false
    }
}
</script>

<template>
  <section class="info">

    <div class="info-header">
      <span class="info-icono">🔧</span>
      <div>
        <h2>Acerca de Los Santos Custom</h2>
        <p>Taller mecánico profesional con más de 12 años de experiencia</p>
      </div>
    </div>

    <div class="info-card">
      <h3>Nuestra historia</h3>
      <p>
        Los Santos Customs nació el 17 de septiembre de 2013 como un taller en el corazón de la ciudad.
        Con el paso de los años, nos hemos consolidado como uno de los talleres más confiables
        de la región, atendiendo desde afinaciones básicas hasta reparaciones complejas de motor
        y transmisión. Los habitantes de Los Santos se enorgullecen mucho de sus coches. Se pasan la mayor
        parte del día en ellos. Cuando estés listo para tunear tu nave, visita LS Customs, porque nada tiene más
        clase que una bonita luz de neón. Tienes a tu disposición rines personalizados, pintura, kits para
        carrocerías y mucho más para hacer tu coche realmente tuyo.
      </p>
    </div>

    <div class="seccion">
      <h3>Lo que hacemos</h3>
      <div class="grid-servicios">
        <div class="servicio-card">
          <span>🚗</span>
          <h4>Diagnóstico computarizado</h4>
          <p>Detección precisa de fallas mediante escáner profesional.</p>
        </div>
        <div class="servicio-card">
          <span>⭕</span>
          <h4>Llantas y frenos</h4>
          <p>Cambio, balanceo y alineación. Revisión completa del sistema de frenos.</p>
        </div>
        <div class="servicio-card">
          <span>🔩</span>
          <h4>Motor y transmisión</h4>
          <p>Reparación, overhaul y mantenimiento preventivo de motor y caja.</p>
        </div>
        <div class="servicio-card">
          <span>⚡</span>
          <h4>Sistema eléctrico</h4>
          <p>Diagnóstico y reparación de fallas eléctricas y electrónicas.</p>
        </div>
        <div class="servicio-card">
          <span>🧰</span>
          <h4>Mantenimiento general</h4>
          <p>Cambio de aceite, filtros, bujías y revisión de fluidos.</p>
        </div>
        <div class="servicio-card">
          <span>📅</span>
          <h4>Citas en línea</h4>
          <p>Agenda tu visita fácilmente desde nuestra plataforma.</p>
        </div>
      </div>
    </div>

    <div class="seccion">
      <h3>¿Por qué elegirnos?</h3>
      <div class="grid-razones">
        <div class="razon">
          <span class="razon-icono">🏆</span>
          <div>
            <strong>12+ años de experiencia</strong>
            <p>Técnicos certificados con amplia trayectoria en el ramo automotriz.</p>
          </div>
        </div>
        <div class="razon">
          <span class="razon-icono">💰</span>
          <div>
            <strong>Precios transparentes</strong>
            <p>Presupuesto sin costo y sin sorpresas al momento de pagar.</p>
          </div>
        </div>
        <div class="razon">
          <span class="razon-icono">⏱️</span>
          <div>
            <strong>Tiempos de entrega cumplidos</strong>
            <p>Respetamos los tiempos acordados. Tu tiempo es valioso.</p>
          </div>
        </div>
        <div class="razon">
          <span class="razon-icono">🔒</span>
          <div>
            <strong>Garantía en trabajos</strong>
            <p>Todos nuestros servicios cuentan con garantía por escrito.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="seccion">
      <h3>Sistema de gestión</h3>
      <div class="grid-modulos">
        <div class="modulo-box">
          <h4>Módulo Servicios</h4>
          <p>Registro y consulta de todos los servicios, productos y citas del taller.</p>
        </div>
        <div class="modulo-box">
          <h4>Módulo Sesión</h4>
          <p>Control de acceso al sistema con autenticación segura por usuario.</p>
        </div>
        <div class="modulo-box">
          <h4>Módulo Admin</h4>
          <p>Panel administrativo con estadísticas y gestión interna del taller.</p>
        </div>
      </div>
    </div>

    <div class="seccion">
      <h3>📬 Contáctanos</h3>
      <div class="contacto-box">
        <form @submit.prevent="enviarContacto">

          <div class="campo">
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" v-model="form.nombre" placeholder="Tu nombre completo" />
            <small v-if="form.nombre.trim() === ''" class="campo-hint">Campo obligatorio</small>
          </div>

          <div class="campo">
            <label for="correo">Correo electrónico</label>
            <input type="email" id="correo" v-model="form.correo" placeholder="tucorreo@ejemplo.com" />
            <small v-if="form.correo && !correoValido" class="campo-hint">Correo no válido</small>
          </div>

          <div class="campo">
            <label for="mensaje">Mensaje</label>
            <textarea id="mensaje" v-model="form.mensaje" rows="4"
              placeholder="Escribe tu mensaje, pregunta o solicitud de servicio..."></textarea>
            <small v-if="form.mensaje.trim() === ''" class="campo-hint">Campo obligatorio</small>
          </div>

          <div class="form-footer">
            <button type="submit" class="btn-enviar" :disabled="!formularioValido || enviando">
              {{ enviando ? '⏳ Enviando...' : formularioValido ? '📨 Enviar mensaje' : '🔒 Completa el formulario' }}
            </button>
            <p v-if="mensajeExito" class="correcto">✅ {{ mensajeExito }}</p>
            <p v-if="mensajeError" class="aviso">⚠️ {{ mensajeError }}</p>
          </div>

        </form>
      </div>
    </div>

    <div class="cta">
      <h3>¿Listo para agendar?</h3>
      <p>Regístrate o inicia sesión para acceder a todos los servicios del taller.</p>
      <div class="cta-botones">
        <RouterLink to="/registros" class="cta-btn primario">Ver servicios</RouterLink>
        <RouterLink to="/login" class="cta-btn secundario">Iniciar sesión</RouterLink>
      </div>
    </div>

  </section>
</template>

<style scoped>
.info {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.info-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.info-icono {
  font-size: 42px;
  line-height: 1;
}

.info-header h2 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
}

.info-header p {
  margin: 4px 0 0;
  color: #555;
  font-size: 14px;
  font-weight: 500;
}

.info-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 22px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.info-card h3 {
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
}

.info-card p {
  margin: 0;
  color: #444;
  font-size: 15px;
  line-height: 1.8;
}

.seccion {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.seccion h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  padding-bottom: 10px;
  border-bottom: 2px solid #e2e8f0;
}

.grid-servicios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 14px;
}

.servicio-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s, transform 0.2s;
}

.servicio-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.10);
  transform: translateY(-2px);
}

.servicio-card span {
  font-size: 28px;
  display: block;
  margin-bottom: 10px;
  line-height: 1;
}

.servicio-card h4 {
  margin: 0 0 8px;
  font-size: 15px;
  font-weight: 700;
  color: #1a1a1a;
}

.servicio-card p {
  margin: 0;
  color: #555;
  font-size: 13px;
  line-height: 1.6;
}

.grid-razones {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
}

.razon {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 18px;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.razon-icono {
  font-size: 26px;
  line-height: 1;
  flex-shrink: 0;
}

.razon strong {
  display: block;
  font-size: 15px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 5px;
}

.razon p {
  margin: 0;
  color: #555;
  font-size: 13px;
  line-height: 1.6;
}

.grid-modulos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
}

.modulo-box {
  background: white;
  border: 1px solid #e2e8f0;
  border-left: 4px solid #cf1003;
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.modulo-box h4 {
  margin: 0 0 8px;
  font-size: 15px;
  font-weight: 700;
  color: #1a1a1a;
}

.modulo-box p {
  margin: 0;
  color: #555;
  font-size: 13px;
  line-height: 1.6;
}

.contacto-box {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 14px;
}

.campo label {
  font-size: 13px;
  font-weight: 700;
  color: #1a1a1a;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.campo input,
.campo textarea {
  padding: 10px 12px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  color: #1a1a1a;
  background: #f8fafc;
  font-family: 'Poppins', sans-serif;
  transition: border-color 0.2s;
  width: 100%;
  box-sizing: border-box;
}

.campo input::placeholder,
.campo textarea::placeholder {
  color: #aaa;
  font-weight: 400;
}

.campo input:focus,
.campo textarea:focus {
  outline: none;
  border-color: #cf1003;
  background: white;
}

.campo textarea {
  resize: vertical;
  min-height: 100px;
}

.campo-hint {
  font-size: 12px;
  font-weight: 600;
  color: #dc2626;
}

.form-footer {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.btn-enviar {
  padding: 11px 24px;
  background: #cf1003;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
}

.btn-enviar:hover    { background: #660000; transform: translateY(-1px); }
.btn-enviar:disabled { background: #cbd5e1; color: #64748b; cursor: not-allowed; transform: none; }

.correcto { color: #16a34a; font-weight: 700; font-size: 14px; margin: 0; }
.aviso    { color: #dc2626; font-weight: 700; font-size: 14px; margin: 0; }

.cta {
  background: #fffbeb;
  border: 1px solid #fcd34d;
  border-radius: 12px;
  padding: 28px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.cta h3 {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
}

.cta p {
  margin: 0 0 18px;
  color: #555;
  font-size: 14px;
  font-weight: 500;
}

.cta-botones {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.cta-btn {
  text-decoration: none;
  padding: 11px 22px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  transition: background 0.2s, transform 0.15s;
  display: inline-block;
}

.cta-btn.primario {
  background: #cf1003;
  color: white;
}

.cta-btn.primario:hover {
  background: #660000;
  transform: translateY(-1px);
  opacity: 1;
}

.cta-btn.secundario {
  background: #f1f5f9;
  color: #1a1a1a;
  border: 1px solid #e2e8f0;
}

.cta-btn.secundario:hover {
  background: #e2e8f0;
  transform: translateY(-1px);
  opacity: 1;
}
</style>