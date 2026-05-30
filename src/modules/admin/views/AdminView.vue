<script setup>
import { inject } from 'vue';
import { useSessionStore } from '@/modules/auth/stores/sessionStore';
import { useControlStore } from '@/modules/admin/stores/controlStore';
import { useRecordsStore } from '@/modules/public/stores/recordsStore';

const sessionStore = useSessionStore()
const controlStore = useControlStore()
const recordsStore = useRecordsStore()

const nombreUsuarioGlobal = inject('nombreUsuarioGlobal')
</script>

<template>
    <section class="admin">
        <div class="admin-header">
            <div class="admin-titulo">
                <span class="icono">⚙️</span>
                <div>
                    <h2>Panel Administrativo</h2>
                    <p>Gestión interna del taller — solo personal autorizado</p>
                </div>
            </div>
            <div class="badge-sesion" :class="sessionStore.autenticado ? 'activa' : 'inactiva'">
                {{ sessionStore.autenticado ? '🟢 Sesión activa' : '🔴 Sin sesión' }}
            </div>
        </div>


        <div class="grid-stats">
            <div class="stat-card">
                <span class="stat-icon">👤</span>
                <div class="stat-info">
                    <small>Operador</small>
                    <strong>{{ nombreUsuarioGlobal }}</strong>
                </div>
            </div>

            <div class="stat-card">
                <span class="stat-icon">🔔</span>
                <div class="stat-info">
                    <small>Notificaciones</small>
                    <strong>{{ controlStore.notificaciones }}</strong>
                </div>
                <button class="btn-mini" @click="controlStore.incrementarNotificaciones">+1</button>
                <button class="btn-mini danger" @click="controlStore.resetNotificaciones">Reset</button>
            </div>

            <div class="stat-card">
                <span class="stat-icon">🗂️</span>
                <div class="stat-info">
                    <small>Servicios registrados</small>
                    <strong>{{ recordsStore.totalElementos }}</strong>
                </div>
            </div>

            <div class="stat-card">
                <span class="stat-icon">⭐</span>
                <div class="stat-info">
                    <small>Servicios destacados</small>
                    <strong>{{ recordsStore.totalDestacados }}</strong>
                </div>
            </div>

            <div class="stat-card">
                <span class="stat-icon">💰</span>
                <div class="stat-info">
                    <small>Precio promedio</small>
                    <strong>${{ recordsStore.promedioValor }}</strong>
                </div>
            </div>

            <div class="stat-card">
                <span class="stat-icon">🚗</span>
                <div class="stat-info">
                    <small>Órdenes activas</small>
                    <strong>{{ controlStore.ordenesActivas }}</strong>
                </div>
            </div>
        </div>


        <div class="sesion-box">
            <h3>Información de sesión</h3>
            <div class="sesion-grid">
                <div class="sesion-dato">
                    <small>Usuario</small>
                    <span>{{ sessionStore.nombreUsuario }}</span>
                </div>
                <div class="sesion-dato">
                    <small>Autenticado</small>
                    <span :class="sessionStore.autenticado ? 'texto-ok' : 'texto-error'">
                        {{ sessionStore.autenticado ? 'Sí' : 'No' }}
                    </span>
                </div>
                <div class="sesion-dato">
                    <small>Plan</small>
                    <span>{{ sessionStore.tipoPlan }}</span>
                </div>
                <div class="sesion-dato">
                    <small>Acceso Premium</small>
                    <span :class="sessionStore.esPremium ? 'texto-ok' : 'texto-error'">
                        {{ sessionStore.esPremium ? 'Sí' : 'No' }}
                    </span>
                </div>
            </div>
        </div>


        <div class="accesos">
            <h3>Accesos rápidos</h3>
            <div class="accesos-grid">
                <RouterLink to="/registros" class="acceso-btn">Ver Servicios</RouterLink>
                <RouterLink to="/login" class="acceso-btn">Gestionar Sesión</RouterLink>
                <RouterLink to="/perfil" class="acceso-btn">Ver Perfil</RouterLink>
                <RouterLink to="/" class="acceso-btn">Inicio</RouterLink>
            </div>
        </div>
    </section>
</template>


<style scoped>
.admin {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
}

.icono {
    font-size: 36px;
}

.admin-titulo {
    display: flex;
    align-items: center;
    gap: 12px;
}

.admin-titulo h2 {
    font-size: 26px;
    margin: 0 0 4px;
    color: #1a1a1a;
}

.admin-titulo p {
    color: #555;
    font-size: 14px;
    margin: 0;
}

.badge-sesion {
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 700;
}

.badge-sesion.activa {
    background-color: #dcfce7;
    color: #166534;
    border: 1px solid #bbf7d0;
}

.badge-sesion.inactiva {
    background-color: #fee2e2;
    color: #991b1b;
    border: 1px solid #fecaca;
}

.grid-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 14px;
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

.stat-icon {
    font-size: 28px;
}

.stat-info {
    flex: 1;
}

.stat-info small {
    display: block;
    color: #555;
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 2px;
}

.stat-info strong {
    font-size: 22px;
    color: #1a1a1a;
}

.btn-mini {
    padding: 6px 12px;
    border: none;
    border-radius: 6px;
    background: #cf1003;
    color: white;
    cursor: pointer;
    font-size: 12px;
    font-weight: 700;
}

.btn-mini:hover {
    background: #660000;
}

.btn-mini.danger {
    background: #dc2626;
}

.btn-mini.danger:hover {
    background: #b91c1c;
}

.sesion-box,
.accesos {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.sesion-box h3,
.accesos h3 {
    margin: 0 0 16px;
    font-size: 17px;
    color: #1a1a1a;
}

.sesion-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
}

.sesion-dato {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 12px 14px;
}

.sesion-dato small {
    display: block;
    font-size: 12px;
    color: #555;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    margin-bottom: 4px;
}

.sesion-dato span {
    font-size: 15px;
    font-weight: 700;
    color: #1a1a1a;
}

.texto-ok {
    color: #16a34a !important;
}

.texto-error {
    color: #dc2626 !important;
}


.accesos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
}

.acceso-btn {
    background: #cf1003;
    color: white;
    text-align: center;
    padding: 13px;
    border-radius: 10px;
    text-decoration: none;
    font-weight: 700;
    font-size: 15px;
    transition: background 0.2s, transform 0.15s;
    display: block;
}

.acceso-btn:hover {
    background: #660000;
    transform: translateY(-2px);
    opacity: 1;
}
</style>