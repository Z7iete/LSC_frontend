<script setup>
import { ref, reactive, computed } from 'vue'
import { useSessionStore } from '@/modules/auth/stores/sessionStore'

const sessionStore = useSessionStore()

const form = reactive({
    correo: '',
    password: ''
})

const mostrarPassword = ref(false)
const cargando = ref(false)
const errorServidor = ref('')
const exitoso = ref(false)

const correoValido = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo))
const passwordValida = computed(() => form.password.trim().length >= 4)
const formularioValido = computed(() => correoValido.value && passwordValida.value)

async function enviarFormulario() {
    if (!formularioValido.value) return

    cargando.value = true
    errorServidor.value = ''
    exitoso.value = false

    try {
        const respuesta = await fetch('https://lsc-backend.onrender.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                correo: form.correo,
                password: form.password
            })
        })

        const datos = await respuesta.json()

        if (!respuesta.ok) {
            const detalle = datos.errores ? datos.errores.join(', ') : datos.mensaje || 'Error al iniciar sesión'
            throw new Error(detalle)
        }

        sessionStore.iniciarSesion(datos.sesion.nombreUsuario)
        exitoso.value = true
        form.correo = ''
        form.password = ''

    } catch (err) {
        errorServidor.value = err.message
    } finally {
        cargando.value = false
    }
}
</script>


<template>
    <form class="login-form" @submit.prevent="enviarFormulario">

        <div class="form-header">
            <span class="form-icono">🔑</span>
            <h3>Acceso al Sistema</h3>
            <p>Ingresa tus datos para iniciar sesión</p>
        </div>


        <div class="campo" :class="{ invalido: form.correo && !correoValido, valido: correoValido }">
            <label for="correo">Correo electrónico</label>
            <div class="input-wrapper">
                <span class="input-icon">📧</span>
                <input type="email" id="correo" v-model="form.correo" placeholder="usuario@autofix.com"
                    autocomplete="email" />
            </div>
            <small v-if="form.correo && !correoValido" class="campo-error">
                Ingresa un correo válido
            </small>
        </div>


        <div class="campo" :class="{ invalido: form.password && !passwordValida, valido: passwordValida }">
            <label for="password">Contraseña</label>
            <div class="input-wrapper">
                <span class="input-icon">🔒</span>
                <input :type="mostrarPassword ? 'text' : 'password'" id="password" v-model="form.password"
                    placeholder="Mínimo 4 caracteres" autocomplete="current-password" @keyup.enter="enviarFormulario" />
                <button type="button" class="btn-toggle-pass" @click="mostrarPassword = !mostrarPassword">
                    {{ mostrarPassword ? '🙈' : '👁️' }}
                </button>
            </div>
            <small v-if="form.password && !passwordValida" class="campo-error">
                La contraseña debe tener al menos 4 caracteres
            </small>
        </div>


        <p v-if="errorServidor" class="aviso">⚠️ {{ errorServidor }}</p>
        <p v-if="exitoso" class="correcto">✅ Sesión iniciada correctamente</p>


        <button type="submit" class="btn-submit" :disabled="!formularioValido || cargando">
            <span v-if="cargando" class="loader-inline"></span>
            <span v-else>{{ formularioValido ? 'Ingresar al taller' : '🔒 Completa el formulario' }}</span>
        </button>

    </form>
</template>

<style scoped>
.login-form {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    padding: 28px;
    width: 100%;
    max-width: 360px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 18px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

/* Header */
.form-header {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
}

.form-icono {
    font-size: 34px;
}

.form-header h3 {
    margin: 0;
    font-size: 22px;
    font-weight: 700;
    color: #1a1a1a;
}

.form-header p {
    margin: 0;
    color: #555;
    font-size: 14px;
}


.campo {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.campo label {
    font-size: 14px;
    font-weight: 700;
    color: #1a1a1a;
}

.input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.input-icon {
    position: absolute;
    left: 11px;
    font-size: 15px;
    pointer-events: none;
}

.input-wrapper input {
    width: 100%;
    padding: 10px 40px;
    border: 1.5px solid #cbd5e1;
    border-radius: 8px;
    font-size: 14px;
    color: #1a1a1a;
    background: #f8fafc;
    transition: border-color 0.2s;
}

.input-wrapper input::placeholder {
    color: #aaa;
}

.input-wrapper input:focus {
    outline: none;
    border-color: #cf1003;
    background: white;
}

.campo.valido .input-wrapper input {
    border-color: #16a34a;
}

.campo.invalido .input-wrapper input {
    border-color: #dc2626;
}


.btn-toggle-pass {
    position: absolute;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 16px;
    cursor: pointer;
    padding: 4px;
    line-height: 1;
}

.btn-toggle-pass:hover {
    background: transparent;
    transform: none;
}


.campo-error {
    color: #dc2626;
    font-size: 12px;
    font-weight: 600;
}

/* Mensajes globales */
.aviso {
    background: #fee2e2;
    color: #991b1b;
    padding: 10px 14px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    margin: 0;
}

.correcto {
    background: #dcfce7;
    color: #166534;
    padding: 10px 14px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    margin: 0;
}


.btn-submit {
    background: #cf1003;
    color: white;
    border: none;
    padding: 13px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 700;
    font-size: 15px;
    transition: background 0.2s, transform 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
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

.loader-inline {
    width: 16px;
    height: 16px;
    border: 3px solid rgba(255, 255, 255, 0.4);
    border-top-color: white;
    border-radius: 50%;
    animation: girar 0.8s linear infinite;
}

@keyframes girar {
    to {
        transform: rotate(360deg);
    }
}
</style>