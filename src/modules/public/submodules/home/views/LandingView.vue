<script setup>
import { inject } from 'vue'
const nombreUsuarioGlobal = inject('nombreUsuarioGlobal')
const tipoPlanGlobal = inject('tipoPlanGlobal')
</script>

<template>
    <section class="landing">

        <div class="hero">
            <div class="hero-texto">
                <p class="hero-etiqueta">Taller Mecánico Profesional</p>
                <h2>Bienvenido a <span class="acento">Los Santos Custom</span></h2>
                <p class="hero-sub">
                    Diagnóstico, mantenimiento y reparación automotriz con más de 12 años
                    de experiencia. Tu nave en las mejores manos.
                </p>
                <div class="hero-usuario">
                    <span>Operador:</span>
                    <strong>{{ nombreUsuarioGlobal }}</strong>
                    <span class="separador">|</span>
                    <span>Plan:</span>
                    <strong :class="tipoPlanGlobal === 'Premium' ? 'texto-acento' : ''">
                        {{ tipoPlanGlobal }}
                    </strong>
                </div>
                <div class="hero-botones">
                    <RouterLink to="/registros" class="btn-primario">Ver servicios</RouterLink>
                    <RouterLink to="/info" class="btn-secundario">Conoce el taller</RouterLink>
                </div>
            </div>

            <div class="hero-card">
                <h3>Servicios disponibles</h3>
                <ul class="servicios-lista">
                    <li>🚗 Diagnóstico computarizado</li>
                    <li>O Llantas, frenos y alineación</li>
                    <li>🔩 Motor y transmisión</li>
                    <li>⚡ Sistema eléctrico</li>
                    <li>🧰 Mantenimiento preventivo</li>
                    <li>📅 Citas en línea</li>
                </ul>
                <RouterLink to="/login" class="btn-acceso">🔑 Acceder al sistema</RouterLink>
            </div>
        </div>

        <div class="stats">
            <div class="stat">
                <strong>12+</strong>
                <span>Años de experiencia</span>
            </div>
            <div class="stat">
                <strong>1000000+</strong>
                <span>Clientes atendidos</span>
            </div>
            <div class="stat">
                <strong>99%</strong>
                <span>Satisfacción</span>
            </div>
            <div class="stat">
                <strong>24h</strong>
                <span>Tiempo de respuesta</span>
            </div>
        </div>

        <div class="categorias">
            <h3>Explora por categoría</h3>
            <div class="cat-grid">
                <RouterLink to="/registros" class="cat-card">
                    <span>🔧</span>
                    <p>Servicios</p>
                </RouterLink>
                <RouterLink to="/registros" class="cat-card">
                    <span>🛒</span>
                    <p>Productos</p>
                </RouterLink>
                <RouterLink to="/registros" class="cat-card">
                    <span>📅</span>
                    <p>Citas</p>
                </RouterLink>
                <RouterLink to="/registros" class="cat-card">
                    <span>👤</span>
                    <p>Clientes</p>
                </RouterLink>
                <RouterLink to="/registros" class="cat-card">
                    <span>📦</span>
                    <p>Inventario</p>
                </RouterLink>
                <RouterLink to="/registros" class="cat-card">
                    <span>🛠️</span>
                    <p>Soporte</p>
                </RouterLink>
            </div>
        </div>

        <div class="cta-inferior">
            <div class="cta-texto">
                <h3>¿Primera vez en Los Santos Customs?</h3>
                <p>Inicia sesión para gestionar tus servicios, consultar tu historial y agendar citas.</p>
            </div>
            <div class="cta-acciones">
                <RouterLink to="/login" class="btn-primario">Comenzar ahora</RouterLink>
                <RouterLink to="/info" class="btn-secundario">Saber más →</RouterLink>
            </div>
        </div>

    </section>
</template>


<style scoped>
.landing {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.hero {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 20px;
    align-items: start;
}

.hero-etiqueta {
    font-size: 13px;
    font-weight: 700;
    color: #660000;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0 0 10px;
}

.hero-texto h2 {
    margin: 0 0 12px;
    font-size: 2rem;
    font-weight: 700;
    color: #1a1a1a;
    line-height: 1.2;
}

.acento {
    color: #cf1003;
}

.hero-sub {
    color: #444;
    font-size: 15px;
    font-weight: 500;
    line-height: 1.7;
    margin: 0 0 18px;
}

.hero-usuario {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 10px 16px;
    border-radius: 8px;
    margin-bottom: 18px;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
}

.hero-usuario strong {
    color: #1a1a1a;
    font-weight: 700;
}

.separador {
    color: #cbd5e1;
}

.texto-acento {
    color: #660000 !important;
}

.hero-botones {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.btn-primario,
.btn-secundario,
.btn-acceso {
    text-decoration: none;
    padding: 11px 18px;
    border-radius: 8px;
    font-weight: 700;
    font-size: 14px;
    transition: background 0.2s, transform 0.15s;
    display: inline-block;
}

.btn-primario {
    background: #cf1003;
    color: white;
}

.btn-primario:hover {
    background: #660000;
    transform: translateY(-1px);
    opacity: 1;
}

.btn-secundario {
    background: #f1f5f9;
    color: #1a1a1a;
    border: 1px solid #e2e8f0;
}

.btn-secundario:hover {
    background: #e2e8f0;
    transform: translateY(-1px);
    opacity: 1;
}

.btn-acceso {
    background: #cf1003;
    color: white;
    text-align: center;
    display: block;
}

.btn-acceso:hover {
    background: #660000;
    transform: translateY(-1px);
    opacity: 1;
}

.hero-card {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
}

.hero-card h3 {
    margin: 0 0 14px;
    font-size: 16px;
    font-weight: 700;
    color: #1a1a1a;
}

.servicios-lista {
    list-style: none;
    padding: 0;
    margin: 0 0 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.servicios-lista li {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 8px 12px;
    border-radius: 7px;
}

.stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
}

.stat {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 18px;
    text-align: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.stat strong {
    display: block;
    font-size: 1.8rem;
    font-weight: 700;
    color: #cf1003;
    line-height: 1;
    margin-bottom: 6px;
}

.stat span {
    font-size: 13px;
    font-weight: 600;
    color: #555;
}

.categorias h3 {
    margin: 0 0 14px;
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
}

.cat-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
}

.cat-card {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 18px;
    text-align: center;
    text-decoration: none;
    transition: box-shadow 0.2s, transform 0.2s;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.cat-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.10);
    transform: translateY(-2px);
    border-color: #cf1003;
    opacity: 1;
}

.cat-card span {
    font-size: 28px;
    display: block;
    margin-bottom: 8px;
    line-height: 1;
}

.cat-card p {
    margin: 0;
    font-weight: 700;
    font-size: 14px;
    color: #1a1a1a;
}

.cta-inferior {
    background: #fffbeb;
    border: 1px solid #fcd34d;
    border-radius: 12px;
    padding: 26px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.cta-texto h3 {
    margin: 0 0 6px;
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
}

.cta-texto p {
    margin: 0;
    color: #555;
    font-size: 14px;
    font-weight: 500;
}

.cta-acciones {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    flex-shrink: 0;
}

@media (max-width: 900px) {
    .hero {
        grid-template-columns: 1fr;
    }

    .stats {
        grid-template-columns: repeat(2, 1fr);
    }

    .cat-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .cta-inferior {
        flex-direction: column;
        text-align: center;
    }

    .cta-acciones {
        justify-content: center;
    }
}

@media (max-width: 500px) {
    .stats {
        grid-template-columns: repeat(2, 1fr);
    }

    .cat-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .hero-botones,
    .cta-acciones {
        flex-direction: column;
    }
}
</style>