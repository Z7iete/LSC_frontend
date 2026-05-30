import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const URL_BACKEND = 'https://lsc-backend.onrender.com'

export const useSessionStore = defineStore('session', () => {

    const nombreUsuario = ref(localStorage.getItem('nombreUsuario')  || 'Invitado')
    const correoUsuario = ref(localStorage.getItem('correoUsuario')  || '')
    const autenticado = ref(localStorage.getItem('autenticado')    === 'true')
    const tipoPlan = ref(localStorage.getItem('tipoPlan')       || 'Básico')
    const cargando = ref(false)
    const error = ref('')

    const nombreBienvenida = computed(() => nombreUsuario.value)
    const esPremium = computed(() => tipoPlan.value === 'Premium')

    async function iniciarSesion(nombre, correo = '') {
        nombreUsuario.value = nombre || 'Operador'
        correoUsuario.value = correo
        autenticado.value = true
        localStorage.setItem('nombreUsuario', nombreUsuario.value)
        localStorage.setItem('correoUsuario', correoUsuario.value)
        localStorage.setItem('autenticado',   'true')
        sessionStorage.setItem('sesionActiva', 'true')
    }

    async function consultarSesion() {
        if (autenticado.value) return
        cargando.value = true
        error.value = ''
        try {
            const respuesta = await fetch(`${URL_BACKEND}/sesion`, {
                credentials: 'include'
            })
            if (!respuesta.ok) return
            const datos = await respuesta.json()
            if (datos.autenticado) {
                nombreUsuario.value = datos.nombreUsuario
                correoUsuario.value = datos.correo || ''
                autenticado.value = true
                localStorage.setItem('nombreUsuario', datos.nombreUsuario)
                localStorage.setItem('correoUsuario', datos.correo || '')
                localStorage.setItem('autenticado',   'true')
                sessionStorage.setItem('sesionActiva', 'true')
            }
        } catch (err) {
            error.value = 'No se pudo verificar con el servidor'
        } finally {
            cargando.value = false
        }
    }

    async function cerrarSesion() {
        cargando.value = true
        error.value = ''
        try {
            await fetch(`${URL_BACKEND}/logout`, {
                method:      'POST',
                credentials: 'include'
            })
        } catch (err) {
        } finally {
            _limpiarEstado()
            cargando.value = false
        }
    }

    function cambiarPlan() {
        tipoPlan.value = tipoPlan.value === 'Premium' ? 'Básico' : 'Premium'
        localStorage.setItem('tipoPlan', tipoPlan.value)
    }

    function _limpiarEstado() {
        nombreUsuario.value = 'Invitado'
        correoUsuario.value = ''
        autenticado.value = false
        localStorage.removeItem('nombreUsuario')
        localStorage.removeItem('correoUsuario')
        localStorage.removeItem('autenticado')
        sessionStorage.removeItem('sesionActiva')
    }

    return {
        nombreUsuario, correoUsuario, autenticado, tipoPlan,
        cargando, error, nombreBienvenida, esPremium,
        iniciarSesion, consultarSesion, cerrarSesion, cambiarPlan
    }
})