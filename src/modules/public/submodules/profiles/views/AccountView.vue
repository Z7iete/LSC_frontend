<script setup>
import { inject, onMounted } from 'vue'
import { useSessionStore } from '@/modules/auth/stores/sessionStore'

const sessionStore = useSessionStore()
const nombreUsuarioGlobal = inject('nombreUsuarioGlobal')
const tipoPlanGlobal = inject('tipoPlanGlobal')

</script>


<template>
    <section class="perfil">

        <div class="perfil-header">
            <div class="perfil-titulo">
                <span class="perfil-icono">👤</span>
                <div>
                    <h2>Perfil del Operador</h2>
                    <p>Información de sesión y acceso al sistema Los Santos Customs</p>
                </div>
            </div>
            <div class="badge-estado" :class="sessionStore.autenticado ? 'activo' : 'inactivo'">
                {{ sessionStore.autenticado ? '🟢 En línea' : '🔴 Sin sesión' }}
            </div>
        </div>

        <div class="perfil-layout">

            <div class="columna-avatar">
                <div class="avatar-box">
                    <div class="avatar-circulo">
                        <span>{{ nombreUsuarioGlobal?.charAt(0)?.toUpperCase() || '?' }}</span>
                    </div>
                    <h3 class="avatar-nombre">{{ nombreUsuarioGlobal }}</h3>
                    <p class="avatar-correo">{{ sessionStore.correoUsuario || 'Sin correo registrado' }}</p>
                    <div class="avatar-plan" :class="{ premium: sessionStore.esPremium }">
                        {{ sessionStore.esPremium ? '⭐ Plan Premium' : '🪪 Plan Básico' }}
                    </div>
                </div>

                <div class="avatar-acciones">
                    <button class="btn-plan" @click="sessionStore.cambiarPlan">
                        🔄 Cambiar plan
                    </button>
                    <button v-if="sessionStore.autenticado" class="btn-logout" :disabled="sessionStore.cargando"
                        @click="sessionStore.cerrarSesion">
                        🚪 Cerrar sesión
                    </button>
                    <RouterLink v-else to="/login" class="btn-login">
                        🔑 Iniciar sesión
                    </RouterLink>
                </div>
            </div>

            <div class="columna-datos">

                <div class="datos-box">
                    <h3>Datos de sesión</h3>
                    <div class="datos-grid">
                        <div class="dato-fila">
                            <small>Operador (global)</small>
                            <span>{{ nombreUsuarioGlobal }}</span>
                        </div>
                        <div class="dato-fila">
                            <small>Plan (global)</small>
                            <span :class="tipoPlanGlobal === 'Premium' ? 'texto-acento' : ''">
                                {{ tipoPlanGlobal }}
                            </span>
                        </div>
                        <div class="dato-fila">
                            <small>Correo</small>
                            <span>{{ sessionStore.correoUsuario || '—' }}</span>
                        </div>
                        <div class="dato-fila">
                            <small>Autenticado</small>
                            <span :class="sessionStore.autenticado ? 'texto-ok' : 'texto-error'">
                                {{ sessionStore.autenticado ? 'Sí' : 'No' }}
                            </span>
                        </div>
                        <div class="dato-fila">
                            <small>Plan activo</small>
                            <span>{{ sessionStore.tipoPlan }}</span>
                        </div>
                        <div class="dato-fila">
                            <small>Acceso Premium</small>
                            <span :class="sessionStore.esPremium ? 'texto-ok' : 'texto-error'">
                                {{ sessionStore.esPremium ? 'Sí' : 'No' }}
                            </span>
                        </div>
                    </div>
                    <p v-if="sessionStore.cargando" class="aviso-carga">Verificando sesión...</p>
                    <p v-if="sessionStore.error" class="aviso">⚠️ {{ sessionStore.error }}</p>
                </div>

                <div class="permisos-box">
                    <h3>🔐 Permisos del sistema</h3>
                    <div class="permisos-lista">
                        <div class="permiso activo">
                            <span class="permiso-icono">✅</span>
                            <div>
                                <strong>Ver servicios</strong>
                                <small>Consulta del catálogo público del taller</small>
                            </div>
                        </div>
                        <div class="permiso" :class="{ activo: sessionStore.autenticado }">
                            <span class="permiso-icono">{{ sessionStore.autenticado ? '✅' : '🔒' }}</span>
                            <div>
                                <strong>Gestionar registros</strong>
                                <small>Agregar y desactivar servicios del taller</small>
                            </div>
                        </div>
                        <div class="permiso" :class="{ activo: sessionStore.autenticado }">
                            <span class="permiso-icono">{{ sessionStore.autenticado ? '✅' : '🔒' }}</span>
                            <div>
                                <strong>Panel administrativo</strong>
                                <small>Acceso al módulo de administración</small>
                            </div>
                        </div>
                        <div class="permiso" :class="{ activo: sessionStore.esPremium }">
                            <span class="permiso-icono">{{ sessionStore.esPremium ? '⭐' : '🔒' }}</span>
                            <div>
                                <strong>Funciones Premium</strong>
                                <small>Acceso a reportes avanzados y prioridad de atención</small>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="accesos-box">
                    <h3>Accesos rápidos</h3>
                    <div class="accesos-grid">
                        <RouterLink to="/registros" class="acceso-btn">Servicios</RouterLink>
                        <RouterLink to="/info" class="acceso-btn">Nosotros</RouterLink>
                        <RouterLink to="/login" class="acceso-btn">Sesión</RouterLink>
                        <RouterLink to="/admin" class="acceso-btn">Admin</RouterLink>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>


<style scoped>
.perfil {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.perfil-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
}

.perfil-titulo {
    display: flex;
    align-items: center;
    gap: 12px;
}

.perfil-icono {
    font-size: 36px;
}

.perfil-titulo h2 {
    margin: 0;
    font-size: 1.6rem;
    font-weight: 700;
    color: #1a1a1a;
}

.perfil-titulo p {
    margin: 4px 0 0;
    color: #555;
    font-size: 14px;
    font-weight: 500;
}

.badge-estado {
    padding: 7px 14px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 700;
}

.badge-estado.activo {
    background: #dcfce7;
    color: #15803d;
    border: 1px solid #bbf7d0;
}

.badge-estado.inactivo {
    background: #fee2e2;
    color: #b91c1c;
    border: 1px solid #fecaca;
}

.perfil-layout {
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 20px;
    align-items: start;
}

.columna-avatar {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.avatar-box {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 22px;
    text-align: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.avatar-circulo {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: #cf1003;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 12px;
    font-size: 28px;
    font-weight: 700;
    box-shadow: 0 0 0 4px #fef3c7;
}

.avatar-nombre {
    margin: 0 0 6px;
    font-size: 17px;
    font-weight: 700;
    color: #1a1a1a;
}

.avatar-correo {
    color: #555;
    font-size: 13px;
    font-weight: 500;
    margin: 0 0 12px;
}

.avatar-plan {
    display: inline-block;
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 700;
    color: #475569;
}

.avatar-plan.premium {
    background: #fef3c7;
    border-color: #fcd34d;
    color: #b45309;
}

.avatar-acciones {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.btn-plan,
.btn-logout,
.btn-login {
    padding: 11px;
    border-radius: 8px;
    border: none;
    font-weight: 700;
    font-size: 14px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    display: block;
}

.btn-plan {
    background: #f1f5f9;
    color: #1a1a1a;
    border: 1px solid #e2e8f0;
}

.btn-plan:hover {
    background: #e2e8f0;
    transform: translateY(-1px);
}

.btn-logout {
    background: #dc2626;
    color: white;
}

.btn-logout:hover {
    background: #b91c1c;
    transform: translateY(-1px);
}

.btn-login {
    background: #cf1003;
    color: white;
}

.btn-login:hover {
    background: #660000;
    transform: translateY(-1px);
    opacity: 1;
}

.columna-datos {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.datos-box,
.permisos-box,
.accesos-box {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.datos-box h3,
.permisos-box h3,
.accesos-box h3 {
    margin: 0 0 14px;
    font-size: 16px;
    font-weight: 700;
    color: #1a1a1a;
}

.datos-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.dato-fila {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 10px 14px;
}

.dato-fila small {
    font-size: 13px;
    font-weight: 600;
    color: #555;
}

.dato-fila span {
    font-size: 14px;
    font-weight: 700;
    color: #1a1a1a;
}

.texto-ok {
    color: #16a34a !important;
}

.texto-error {
    color: #dc2626 !important;
}

.texto-acento {
    color: #660000 !important;
}

.aviso-carga {
    color: #555;
    font-size: 13px;
    font-weight: 500;
    margin: 10px 0 0;
}

.aviso {
    background: #fee2e2;
    color: #991b1b;
    padding: 10px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    margin: 10px 0 0;
}


.permisos-lista {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.permiso {
    display: flex;
    gap: 12px;
    align-items: center;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 12px 14px;
    opacity: 0.5;
    transition: opacity 0.2s;
}

.permiso.activo {
    opacity: 1;
}

.permiso-icono {
    font-size: 20px;
    flex-shrink: 0;
}

.permiso strong {
    display: block;
    font-size: 14px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 2px;
}

.permiso small {
    font-size: 12px;
    font-weight: 500;
    color: #555;
}

.accesos-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}

.acceso-btn {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 12px;
    text-align: center;
    text-decoration: none;
    color: #1a1a1a;
    font-weight: 700;
    font-size: 14px;
    transition: background 0.2s, border-color 0.2s, transform 0.15s;
    display: block;
}

.acceso-btn:hover {
    background: #fef3c7;
    border-color: #cf1003;
    color: #b45309;
    transform: translateY(-1px);
    opacity: 1;
}

@media (max-width: 800px) {
    .perfil-layout {
        grid-template-columns: 1fr;
    }

    .accesos-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>