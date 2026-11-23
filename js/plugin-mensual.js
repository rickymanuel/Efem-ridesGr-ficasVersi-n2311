import { configPlanetas } from './config.js';

// Glifos de los signos (solo iconos, selector de texto \uFE0E), de Aries a Piscis
const signosZodiaco = ['♈\uFE0E','♉\uFE0E','♊\uFE0E','♋\uFE0E','♌\uFE0E','♍\uFE0E','♎\uFE0E','♏\uFE0E','♐\uFE0E','♑\uFE0E','♒\uFE0E','♓\uFE0E'];

let miGraficoMensual = null;
let pluginIniciado = false;

const simbolosPlanetas = {
    'Sun': '☉', 'Moon': '☽', 'Mercury': '☿', 'Venus': '♀', 'Mars': '♂', 
    'Jupiter': '♃', 'Saturn': '♄', 'Uranus': '♅', 'Neptune': '♆', 'Pluto': '♇'
};

// Función auxiliar para obtener el color según el elemento del signo
function getElementColor(signIndex) {
    // 0=Ari, 1=Tau, 2=Gem, 3=Can, 4=Leo, 5=Vir, 6=Lib, 7=Sco, 8=Sag, 9=Cap, 10=Aqu, 11=Pis
    if ([0, 4, 8].includes(signIndex)) return 'rgba(255, 99, 132, 0.15)'; // Fuego (Rojo tenue)
    if ([1, 5, 9].includes(signIndex)) return 'rgba(75, 192, 192, 0.15)'; // Tierra (Verde tenue)
    if ([3, 7, 11].includes(signIndex)) return 'rgba(54, 162, 235, 0.15)'; // Agua (Azul tenue)
    return 'rgba(255, 255, 255, 0.8)'; // Aire (Blanco)
}

// Plugin para pintar las franjas de fondo del gráfico mensual por elemento
const monthlyFondosPlugin = {
    id: 'monthlyFondos',
    beforeDatasetsDraw(chart) {
        const { ctx, chartArea: { top, bottom, left, right }, scales: { x } } = chart;
        ctx.save();
        
        // Pintamos las franjas verticales (porque el gráfico está girado, los signos están en X)
        for (let i = 0; i < 12; i++) {
            const xInicio = x.getPixelForValue(i * 30);
            const xFin = x.getPixelForValue((i + 1) * 30);
            ctx.fillStyle = getElementColor(i);
            ctx.fillRect(xInicio, top, xFin - xInicio, bottom - top);
        }
        ctx.restore();
    },
    // Dibuja cada glifo centrado en su franja (Aries a Piscis, sin repetir Aries al final)
    afterDraw(chart) {
        const { ctx, chartArea: { top }, scales: { x } } = chart;
        ctx.save();
        ctx.fillStyle = '#555555';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        for (let i = 0; i < 12; i++) {
            const centro = x.getPixelForValue(i * 30 + 15);
            ctx.fillText(signosZodiaco[i], centro, top - 6);
        }
        ctx.restore();
    }
};

export async function iniciarPlugin(container) {
    if (pluginIniciado) return;

    container.innerHTML = `
        <div class="plugin-header">
            <button id="btnBackToMain" class="plugin-back-btn">← Back</button>
            <h2 style="margin:0; color:#2c3e50; font-size:1.1rem;">Monthly Ephemeris</h2>
            <div style="width: 60px;"></div>
        </div>
        
        <div class="plugin-controls">
            <div>
                <label>Month:</label>
                <select id="pluginMes" class="plugin-select">
                    <option value="1">Jan</option><option value="2">Feb</option><option value="3">Mar</option>
                    <option value="4">Apr</option><option value="5">May</option><option value="6">Jun</option>
                    <option value="7">Jul</option><option value="8">Aug</option><option value="9">Sep</option>
                    <option value="10">Oct</option><option value="11">Nov</option><option value="12">Dec</option>
                </select>
            </div>
            <div>
                <label>Year:</label>
                <select id="pluginAnio" class="plugin-select"></select>
            </div>
            <div>
                <label>View:</label>
                <select id="pluginVista" class="plugin-select">
                    <option value="chart">📈 Chart</option>
                    <option value="table">📊 Table</option>
                </select>
            </div>
            <button id="pluginBtnGenerar" class="plugin-btn-generate">Generate</button>
        </div>

        <div id="pluginLoading" style="display:none; text-align:center; font-weight:bold; color:#e67e22; margin:10px 0;">Calculating...</div>

        <div class="plugin-chart-container" id="pluginChartContainer">
            <canvas id="graficoPluginMensual"></canvas>
        </div>

        <div class="plugin-table-container" id="pluginTableContainer">
            <table id="pluginTabla">
                <thead><tr id="pluginTablaHeader"></tr></thead>
                <tbody id="pluginTablaBody"></tbody>
            </table>
        </div>

        <div class="plugin-bottom-controls" id="pluginChartControls">
            <button class="btn-control" id="pluginZoomIn">➕</button>
            <button class="btn-control" id="pluginReset">🔄</button>
            <button class="btn-control" id="pluginZoomOut">➖</button>
        </div>
    `;

    const selectAnio = document.getElementById('pluginAnio');
    const anioActual = new Date().getFullYear();
    for (let i = 1900; i <= 2100; i++) {
        const option = document.createElement('option');
        option.value = i; option.textContent = i;
        if (i === anioActual) option.selected = true; 
        selectAnio.appendChild(option);
    }

    document.getElementById('pluginBtnGenerar').addEventListener('click', generarVistaMensual);
    document.getElementById('pluginVista').addEventListener('change', generarVistaMensual);
    document.getElementById('pluginZoomIn').addEventListener('click', () => { if (miGraficoMensual) miGraficoMensual.zoom(1.2); });
    document.getElementById('pluginZoomOut').addEventListener('click', () => { if (miGraficoMensual) miGraficoMensual.zoom(0.8); });
    document.getElementById('pluginReset').addEventListener('click', () => { if (miGraficoMensual) miGraficoMensual.resetZoom(); });

    document.getElementById('btnBackToMain').addEventListener('click', () => {
        container.style.display = 'none';
        document.getElementById('main-controls').style.display = 'flex';
        document.getElementById('main-chart-container').style.display = 'block';
        document.getElementById('main-chart-controls').style.display = 'flex';
    });

    generarVistaMensual();
    pluginIniciado = true;
}

function generarVistaMensual() {
    const mes = parseInt(document.getElementById('pluginMes').value);
    const anio = parseInt(document.getElementById('pluginAnio').value);
    const modo = document.getElementById('pluginVista').value;
    const diasEnMes = new Date(anio, mes, 0).getDate();

    document.getElementById('pluginLoading').style.display = 'block';

    setTimeout(() => {
        try {
            const sweModule = window.swe; 
            if (!sweModule) throw new Error("El motor astronómico no está disponible.");

            const planetas = [
                { nombre: 'Sun', id: sweModule.SE_SUN }, { nombre: 'Moon', id: sweModule.SE_MOON }, { nombre: 'Mercury', id: sweModule.SE_MERCURY },
                { nombre: 'Venus', id: sweModule.SE_VENUS }, { nombre: 'Mars', id: sweModule.SE_MARS },
                { nombre: 'Jupiter', id: sweModule.SE_JUPITER }, { nombre: 'Saturn', id: sweModule.SE_SATURN },
                { nombre: 'Uranus', id: sweModule.SE_URANUS }, { nombre: 'Neptune', id: sweModule.SE_NEPTUNE },
                { nombre: 'Pluto', id: sweModule.SE_PLUTO }
            ];

            let etiquetasTiempo = [];
            let datosGrafico = {};
            planetas.forEach(p => datosGrafico[p.nombre] = []);
            let datosTabla = [];

            for (let dia = 1; dia <= diasEnMes; dia++) {
                const jd = sweModule.julday(anio, mes, dia, 0.0); 
                etiquetasTiempo.push({ dia: dia, mes: mes, anio: anio });
                let filaTabla = { dia: dia, planetas: {}, retro: {} };

                planetas.forEach(planeta => {
                    try {
                        const res = sweModule.calc_ut(jd, planeta.id, sweModule.SEFLG_SWIEPH | sweModule.SEFLG_SPEED);
                        const grados = res[0];
                        datosGrafico[planeta.nombre].push(grados);
                        filaTabla.planetas[planeta.nombre] = grados;
                        filaTabla.retro[planeta.nombre] = res[3] < 0; // velocidad negativa = retrógrado
                    } catch (e) {
                        datosGrafico[planeta.nombre].push(null);
                        filaTabla.planetas[planeta.nombre] = null;
                    }
                });
                datosTabla.push(filaTabla);
            }

            const chartContainer = document.getElementById('pluginChartContainer');
            const tableContainer = document.getElementById('pluginTableContainer');
            const chartControls = document.getElementById('pluginChartControls');

            if (modo === 'chart') {
                chartContainer.style.display = 'block';
                tableContainer.style.display = 'none';
                chartControls.style.display = 'flex';
                dibujarGrafico(etiquetasTiempo, datosGrafico, planetas, diasEnMes);
            } else {
                chartContainer.style.display = 'none';
                tableContainer.style.display = 'block';
                chartControls.style.display = 'none';
                if (miGraficoMensual) miGraficoMensual.destroy(); 
                construirTabla(datosTabla, planetas);
            }
        } catch (error) {
            console.error("Error al generar vista:", error);
            alert("Error técnico: " + error.message);
        } finally {
            document.getElementById('pluginLoading').style.display = 'none';
        }
    }, 100);
}

// --- GRÁFICO INVERTIDO CON COLORES DE ELEMENTOS ---
function dibujarGrafico(etiquetasTiempo, datosGrafico, planetas, diasEnMes) {
    const ctx = document.getElementById('graficoPluginMensual').getContext('2d');
    if (miGraficoMensual) miGraficoMensual.destroy();

    const datasets = planetas.map(p => {
        const datosOriginales = datosGrafico[p.nombre];
        const dataPoints = [];

        for (let i = 0; i < datosOriginales.length; i++) {
            const val = datosOriginales[i];
            const et = etiquetasTiempo[i];

            if (val === null || !et) {
                dataPoints.push({ x: NaN, y: et ? et.dia : null });
                continue;
            }

            if (i > 0 && datosOriginales[i - 1] !== null) {
                let diff = val - datosOriginales[i - 1];
                if (diff > 180 || diff < -180) {
                    dataPoints.push({ x: NaN, y: et.dia });
                }
            }
            
            dataPoints.push({ x: val, y: et.dia });
        }

        return {
            label: p.nombre,
            data: dataPoints,
            borderColor: configPlanetas[p.nombre].color,
            borderWidth: 2, fill: false, tension: 0.3, pointRadius: 0, spanGaps: false
        };
    });

    miGraficoMensual = new Chart(ctx, {
        type: 'line',
        data: { datasets: datasets },
        plugins: [monthlyFondosPlugin], // <--- AÑADIMOS EL PLUGIN DE COLORES AQUÍ
        options: {
            responsive: true, maintainAspectRatio: false,
            interaction: { mode: 'nearest', intersect: true },
            clip: false,
            layout: { padding: { right: 15, left: 25, top: 35, bottom: 5 } },
            plugins: {
                legend: { display: false },
                zoom: {
                    pan: { enabled: true, mode: 'xy' },
                    zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'xy' },
                    limits: { x: { min: 0, max: 360 }, y: { min: 1, max: diasEnMes } }
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            return `Day ${context[0].raw.y}`;
                        },
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) label += ': ';
                            if (context.parsed.x !== null) {
                                let grados = context.parsed.x % 360;
                                if (grados < 0) grados += 360;
                                const signos = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
                                const signo = signos[Math.floor(grados / 30) % 12];
                                label += `${(grados % 30).toFixed(2)}° ${signo}`;
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    min: 0, max: 360,
                    position: 'top',
                    ticks: {
                        stepSize: 30,
                        color: 'transparent',
                        callback: function() { return ''; } // los glifos los dibuja el plugin, centrados
                    },
                    grid: { color: (ctx) => (ctx.tick.value % 30 === 0) ? 'rgba(180, 180, 180, 0.4)' : 'transparent' }
                },
                y: {
                    type: 'linear',
                    min: 1, max: diasEnMes,
                    reverse: true,
                    ticks: {
                        stepSize: 1,
                        color: '#888888'
                    },
                    grid: { color: 'rgba(180, 180, 180, 0.1)' } // Líneas un poco más suaves para no chocar con los colores
                }
            }
        }
    });
}

// --- TABLA (blanca; en rojo los astros retrógrados ℞) ---
function construirTabla(datosTabla, planetas) {
    const thead = document.getElementById('pluginTablaHeader');
    const tbody = document.getElementById('pluginTablaBody');
    
    thead.innerHTML = '<th>Day</th>';
    planetas.forEach(p => {
        thead.innerHTML += `<th style="color: ${p.color === '#000000' ? '#fff' : p.color}">${p.nombre}</th>`;
    });

    tbody.innerHTML = '';
    datosTabla.forEach(fila => {
        let tr = document.createElement('tr');
        // Día siempre con fondo gris claro
        tr.innerHTML = `<td style="font-weight:bold; background:#eef2f5;">${fila.dia}</td>`;
        
        planetas.forEach(p => {
            const grados = fila.planetas[p.nombre];
            // Fondo blanco; si el astro está retrógrado: matiz rojo de fondo y letras rojas
            const retro = grados !== null && fila.retro && fila.retro[p.nombre];
            const estilo = retro ? 'background:#fde4e4; color:#c0392b; font-weight:bold;' : 'background:#fff;';
            tr.innerHTML += `<td style="${estilo}">${formatearPosicion(grados)}${retro ? ' ℞' : ''}</td>`;
        });
        tbody.appendChild(tr);
    });
}

function formatearPosicion(gradosTotales) {
    if (gradosTotales === null) return '-';
    let norm = gradosTotales % 360;
    if (norm < 0) norm += 360;
    const indiceSigno = Math.floor(norm / 30);
    const gradosEnSigno = norm % 30;
    const gradosEnteros = Math.floor(gradosEnSigno);
    const minutos = Math.floor((gradosEnSigno - gradosEnteros) * 60);
    const signosCortos = ['Ari', 'Tau', 'Gem', 'Can', 'Leo', 'Vir', 'Lib', 'Sco', 'Sag', 'Cap', 'Aqu', 'Pis'];
    return `${gradosEnteros}° ${signosCortos[indiceSigno]} ${minutos}'`;
}