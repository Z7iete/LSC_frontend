<script setup>
import { computed } from 'vue'
import { useSessionStore } from '@/modules/auth/stores/sessionStore'

const sessionStore = useSessionStore()
const nombreUsuario = computed(() => sessionStore.nombreBienvenida)
const tipoPlan = computed(() => sessionStore.tipoPlan)
const autenticado = computed(() => sessionStore.autenticado)
</script>


<template>
    <header class="navbar">

        <div class="brand">
            <span class="logo">🔧</span>
            <div class="brand-texto">
                <h1>Los Santos Customs</h1>
                <p>Taller Mecánico Profesional</p>
            </div>
        </div>

        <nav class="links">
            <RouterLink to="/">Inicio</RouterLink>
            <RouterLink to="/registros">Servicios</RouterLink>
            <RouterLink to="/perfil">Perfil</RouterLink>
            <RouterLink to="/info">Nosotros</RouterLink>
            <RouterLink to="/login">Sesión</RouterLink>
            <RouterLink v-if="autenticado" to="/admin">Admin</RouterLink>
        </nav>

        <div class="user-box">
            <div class="user-estado">
                <span class="user-punto" :class="autenticado ? 'activo' : 'inactivo'"></span>
                <span class="user-nombre">{{ nombreUsuario }}</span>
            </div>
            <small class="user-plan" :class="{ premium: tipoPlan === 'Premium' }">
                {{ tipoPlan === 'Premium' ? '⭐ Premium' : '🪪 ' + tipoPlan }}
            </small>
        </div>

    </header>
</template>


<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 14px 24px;
    background: white;
    border-bottom: 2px solid #e2e8f0;
    gap: 14px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.brand {
    display: flex;
    align-items: center;
    gap: 10px;
}

.logo {
    font-size: 30px;
}

.brand-texto h1 {
    margin: 0;
    font-size: 22px;
    font-weight: 700;
    color: #1a1a1a;
    line-height: 1;
}

.brand-texto p {
    margin: 3px 0 0;
    font-size: 12px;
    font-weight: 600;
    color: #555;
}

.links {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
}

.links a {
    text-decoration: none;
    color: #333;
    font-size: 14px;
    font-weight: 600;
    padding: 8px 14px;
    border-radius: 8px;
    border: 1px solid transparent;
    transition: all 0.2s ease;
}

.links a:hover {
    background: #f8fafc;
    border-color: #e2e8f0;
    color: #1a1a1a;
    opacity: 1;
}

.links a.router-link-active {
    background: #cf1003;
    color: white;
    border-color: #cf1003;
    font-weight: 700;
}

.user-box {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 8px 14px;
    border-radius: 10px;
}

.user-estado {
    display: flex;
    align-items: center;
    gap: 8px;
}

.user-punto {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
}

.user-punto.activo {
    background: #16a34a;
    box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.15);
}

.user-punto.inactivo {
    background: #94a3b8;
}

.user-nombre {
    font-size: 15px;
    font-weight: 700;
    color: #1a1a1a;
}

.user-plan {
    font-size: 12px;
    font-weight: 600;
    color: #555;
}

.user-plan.premium {
    color: #660000;
    font-weight: 700;
}

@media (max-width: 768px) {
    .navbar {
        flex-direction: column;
        align-items: flex-start;
    }

    .user-box {
        align-items: flex-start;
        width: 100%;
    }

    .links {
        width: 100%;
    }
}
</style>