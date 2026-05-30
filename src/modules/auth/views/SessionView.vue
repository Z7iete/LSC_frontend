<script setup>
import { inject, onMounted } from 'vue'
import { useSessionStore } from '@/modules/auth/stores/sessionStore'
import SessionForm from '@/modules/auth/components/SessionForm.vue'

const sessionStore = useSessionStore()
const tipoPlanGlobal = inject('tipoPlanGlobal')

</script>


<template>
    <section class="sesion">

        <div class="sesion-header">
            <div class="sesion-titulo">
                <span class="icono">🔐</span>
                <div>
                    <h2>Acceso al Taller</h2>
                    <p>Inicia sesión para gestionar servicios, citas y órdenes de trabajo</p>
                </div>
            </div>
            <div class="badge-plan">
                🪪 Plan: <strong>{{ tipoPlanGlobal }}</strong>
            </div>
        </div>

        <div class="sesion-layout">


            <div class="columna-form">
                <SessionForm v-if="!sessionStore.autenticado" />

                <div v-else class="ya-autenticado">
                    <span class="check-icono">✅</span>
                    <h3>Sesión activa</h3>
                    <p>Ya estás dentro del sistema, <strong>{{ sessionStore.nombreUsuario }}</strong></p>
                </div>
            </div>


            <div class="columna-estado">
                <div class="estado-box">
                    <h3>Estado de sesión</h3>

                    <div class="estado-grid">
                        <div class="estado-dato">
                            <small>Operador</small>
                            <span>{{ sessionStore.nombreUsuario }}</span>
                        </div>
                        <div class="estado-dato">
                            <small>Correo</small>
                            <span>{{ sessionStore.correoUsuario || '—' }}</span>
                        </div>
                        <div class="estado-dato">
                            <small>Autenticado</small>
                            <span :class="sessionStore.autenticado ? 'texto-ok' : 'texto-error'">
                                {{ sessionStore.autenticado ? 'Sí' : 'No' }}
                            </span>
                        </div>
                        <div class="estado-dato">
                            <small>Plan activo</small>
                            <span :class="sessionStore.esPremium ? 'texto-acento' : ''">
                                {{ sessionStore.tipoPlan }}
                            </span>
                        </div>
                        <div class="estado-dato">
                            <small>Premium</small>
                            <span :class="sessionStore.esPremium ? 'texto-ok' : 'texto-error'">
                                {{ sessionStore.esPremium ? 'Sí' : 'No' }}
                            </span>
                        </div>
                    </div>

                    <p v-if="sessionStore.error" class="aviso">⚠️ {{ sessionStore.error }}</p>
                    <p v-if="sessionStore.cargando" class="texto-muted">Verificando sesión...</p>

                    <div class="acciones">
                        <button class="btn-plan" @click="sessionStore.cambiarPlan">
                            🔄 Cambiar plan
                        </button>
                        <button v-if="sessionStore.autenticado" class="btn-logout" :disabled="sessionStore.cargando"
                            @click="sessionStore.cerrarSesion">
                            Cerrar sesión
                        </button>
                        <button v-else class="btn-verificar" :disabled="sessionStore.cargando"
                            @click="sessionStore.consultarSesion">
                            🔍 Verificar sesión
                        </button>
                    </div>
                </div>


                <div class="info-taller">
                    <h3>Los Santos Customs Taller</h3>
                    <ul>
                        <li>Diagnóstico y reparación</li>
                        <li>Cambio de llantas y frenos</li>
                        <li>Servicio de motor y transmisión</li>
                        <li>Agenda de citas en línea</li>
                    </ul>
                    <RouterLink to="/" class="link-inicio">← Volver al inicio</RouterLink>
                </div>
            </div>

        </div>
    </section>
</template>


<style scoped>
.sesion {
    display: flex;
    flex-direction: column;
    gap: 22px;
}

.sesion-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
}

.sesion-titulo {
    display: flex;
    align-items: center;
    gap: 12px;
}

.icono {
    font-size: 36px;
}

.sesion-titulo h2 {
    font-size: 26px;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 4px;
}

.sesion-titulo p {
    color: #555;
    font-size: 14px;
    margin: 0;
}

.badge-plan {
    background: #fef3c7;
    border: 1px solid #fcd34d;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #92400e;
}

.badge-plan strong {
    color: #b45309;
}


.sesion-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    align-items: start;
}

.columna-form {
    display: flex;
    justify-content: center;
}


.ya-autenticado {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 32px 20px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    width: 100%;
}

.check-icono {
    font-size: 44px;
    display: block;
    margin-bottom: 12px;
}

.ya-autenticado h3 {
    font-size: 20px;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 8px;
}

.ya-autenticado p {
    color: #555;
    font-size: 15px;
    margin: 0;
}

.ya-autenticado strong {
    color: #1a1a1a;
}


.columna-estado {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.estado-box,
.info-taller {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.estado-box h3,
.info-taller h3 {
    font-size: 17px;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 16px;
}


.estado-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.estado-dato {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 10px 14px;
    border-radius: 8px;
}

.estado-dato small {
    font-size: 13px;
    font-weight: 600;
    color: #555;
}

.estado-dato span {
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

.texto-muted {
    color: #555;
    font-size: 14px;
    margin: 8px 0 0;
}


.aviso {
    background: #fee2e2;
    color: #991b1b;
    padding: 10px 14px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    margin: 10px 0 0;
}


.acciones {
    display: flex;
    gap: 10px;
    margin-top: 16px;
    flex-wrap: wrap;
}

.btn-plan,
.btn-logout,
.btn-verificar {
    flex: 1;
    border: none;
    border-radius: 8px;
    padding: 11px;
    cursor: pointer;
    font-weight: 700;
    font-size: 14px;
    transition: background 0.2s, transform 0.15s;
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

.btn-verificar {
    background: #cf1003;
    color: white;
}

.btn-verificar:hover {
    background: #660000;
    transform: translateY(-1px);
}


.info-taller ul {
    list-style: none;
    padding: 0;
    margin: 0 0 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.info-taller li {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 9px 12px;
    border-radius: 8px;
}

.link-inicio {
    color: #660000;
    font-weight: 700;
    font-size: 14px;
    text-decoration: none;
}

.link-inicio:hover {
    text-decoration: underline;
    opacity: 1;
}

@media (max-width: 768px) {
    .sesion-layout {
        grid-template-columns: 1fr;
    }
}
</style>