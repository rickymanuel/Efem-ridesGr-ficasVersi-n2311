import SwissEph from '../src/swisseph.js';

// ==========================================
// INTERRUPTOR DE DESARROLLO
// Ponlo en "false" cuando quieras que la app 
// arranque en el gráfico normal de años.
// ==========================================
const START_IN_MONTHLY_VIEW = false;
// Enlace público al código fuente (obligatorio por la licencia AGPL). Pega aquí la URL de tu repositorio.
const SOURCE_URL = '';
const START_IN_ORBITS = true;   // la app abre directamente en Órbitas 

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js'); });
}

// --- INSTALAR COMO APP: botón en el menú, sin ventanas emergentes ---
let deferredPrompt;
const pwaEnApp = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
const pwaItem = document.getElementById('pwaItem'), pwaNota = document.getElementById('pwaNota');
const PWA_NOTA_BASE = pwaNota.textContent;
if (pwaEnApp()) pwaItem.style.display = 'none';
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; });
window.addEventListener('appinstalled', () => { deferredPrompt = null; pwaItem.style.display = 'none'; });
window.__pwaInstalar = async () => {
    if (deferredPrompt) { closeAllMenus(); deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt = null; return true; }
    return false;
};
document.getElementById('btnInstallPwa').addEventListener('click', async () => {
    if (await window.__pwaInstalar()) return;
    // Sin instalación directa (iPhone/iPad, o página abierta dentro de otro programa): explicamos el camino manual
    pwaNota.textContent = /iphone|ipad|ipod/i.test(navigator.userAgent)
        ? 'En iPhone/iPad: toca el botón Compartir y luego "Agregar a pantalla de inicio".'
        : 'Abre esta página en tu navegador (Chrome, Edge, Safari...) y elige en su menú ⋮ la opción "Instalar app" o "Agregar a pantalla de inicio".';
});
window.__pwaVisible = () => pwaItem.style.display !== 'none';

if (typeof ChartZoom !== 'undefined') { Chart.register(ChartZoom); }

// --- INICIALIZACIÓN DEL MOTOR ASTRONÓMICO ---
// Ajusta el alto real visible (en algunos visores móviles 100vh/100dvh es mayor al área visible y tapa lo de abajo)
function ajustarAltoVisible() { document.body.style.height = window.innerHeight + 'px'; }
ajustarAltoVisible();
window.addEventListener('resize', ajustarAltoVisible);
window.addEventListener('orientationchange', ajustarAltoVisible);

const swe = new SwissEph();
window.swe = swe; // <--- ¡ESTA LÍNEA ES LA MAGIA PARA EL PLUGIN!

let miGrafico = null;
let isDarkMode = false;
let isInverted = false;

let configPlanetas = {
    'Sun': { color: '#f1c40f', id: 0 }, 'Mercury': { color: '#0A2540', id: 2 },
    'Venus': { color: '#25D366', id: 3 }, 'Mars': { color: '#FF4500', id: 4 },
    'Jupiter': { color: '#4D6BFE', id: 5 }, 'Saturn': { color: '#800080', id: 6 },
    'Uranus': { color: '#1E8449', id: 7 }, 'Neptune': { color: '#8A2BE2', id: 8 },
    'Pluto': { color: '#000000', id: 9 }
};

let configPlanetasOriginal = JSON.parse(JSON.stringify(configPlanetas)); 
let grosorActual = 2;

const simbolosPlanetas = {
    'Sun': '☉', 'Mercury': '☿', 'Venus': '♀', 'Mars': '♂', 
    'Jupiter': '♃', 'Saturn': '♄', 'Uranus': '♅', 'Neptune': '♆', 'Pluto': '♇'
};

function cortarSaltoDeCiclo(datos) {
    if (!datos || datos.length === 0) return datos;
    const resultado = [datos[0]];
    for (let i = 1; i < datos.length; i++) {
        if (datos[i - 1] === null || datos[i] === null) { resultado.push(datos[i]); continue; }
        let diff = datos[i] - datos[i - 1];
        if (diff > 180 || diff < -180) { resultado.push(null); resultado.push(datos[i]); } 
        else { resultado.push(datos[i]); }
    }
    return resultado;
}

const fondosPlugin = {
    id: 'fondosPlugin',
    beforeDatasetsDraw(chart) {
        const { ctx, chartArea: { top, bottom, left, right }, scales: { x, y } } = chart;
        ctx.save();
        if (isInverted) { ctx.fillStyle = '#1a1a1a'; ctx.fillRect(left, top, right - left, bottom - top); }
        for (let i = 0; i < 12; i++) {
            const yInicio = y.getPixelForValue(i * 30);
            const yFin = y.getPixelForValue((i + 1) * 30);
            if (isInverted) { ctx.fillStyle = (i % 2 === 0) ? 'rgba(255, 245, 157, 0.1)' : 'rgba(255, 255, 255, 0.05)'; } 
            else { ctx.fillStyle = (i % 2 === 0) ? 'rgba(255, 245, 157, 0.3)' : 'rgba(255, 255, 255, 0.8)'; }
            ctx.fillRect(left, yFin, right - left, yInicio - yFin);
        }
        const labels = chart.data.labels;
        const modo = chart.config.options.plugins.modoVistaActivo;
        for (let i = 0; i < labels.length; i++) {
            const xInicio = x.getPixelForValue(i);
            const xFin = (i < labels.length - 1) ? x.getPixelForValue(i + 1) : right;
            if (xInicio >= left && xInicio <= right) {
                let esPar = (modo === '6anios') ? (labels[i].anio % 2 === 0) : (labels[i].mes % 2 === 0);
                if (isInverted) { ctx.fillStyle = esPar ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0)'; } 
                else { ctx.fillStyle = esPar ? 'rgba(240, 242, 245, 0.6)' : 'rgba(255, 255, 255, 0)'; }
                ctx.fillRect(xInicio, top, (xFin - xInicio), bottom - top);
                ctx.beginPath(); ctx.moveTo(xInicio, top); ctx.lineTo(xInicio, bottom);
                ctx.lineWidth = 0.4; ctx.strokeStyle = isInverted ? 'rgba(255,255,255,0.1)' : 'rgba(200, 200, 200, 0.3)'; ctx.stroke();
            }
        }
        ctx.restore();
    },
    afterDraw(chart) {
        const { ctx, chartArea: { top }, scales: { x, y } } = chart;
        const labels = chart.data.labels;
        const modo = chart.config.options.plugins.modoVistaActivo;
        ctx.save();
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = isInverted ? '#ffffff' : '#555555'; 
        ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
        if (modo === '6anios') {
            for (let i = 0; i < labels.length; i++) { if (labels[i].mes === 7) { ctx.fillText(labels[i].anio.toString(), x.getPixelForValue(i), top - 5); } }
        } else {
            for (let i = 0; i < labels.length; i++) { if (i === 0 || labels[i].mes !== labels[i-1].mes) { ctx.fillText(labels[i].mes.toString(), x.getPixelForValue(i) + 12, top - 5); } }
            const asignacion = { 'Pluto': 1, 'Neptune': 3, 'Uranus': 5, 'Saturn': 7, 'Jupiter': 9, 'Mars': 11, 'Venus': 12, 'Mercury': 2, 'Sun': 4 };
            chart.data.datasets.forEach(dataset => {
                const mesObj = asignacion[dataset.label];
                if (!mesObj) return;
                let idx = -1;
                for (let i = 0; i < labels.length; i++) { if (labels[i].mes === mesObj && (i === 0 || labels[i-1].mes !== mesObj)) { idx = i; break; } }
                if (idx !== -1) {
                    const valY = dataset.data[idx];
                    if (valY !== null && valY !== undefined) {
                        const xPos = x.getPixelForValue(idx);
                        let valNorm = valY % 360; if (valNorm < 0) valNorm += 360;
                        const yPos = y.getPixelForValue(valNorm);
                        ctx.beginPath(); ctx.arc(xPos, yPos, 10, 0, 2 * Math.PI);
                        ctx.fillStyle = isInverted ? '#333333' : 'white'; 
                        ctx.fill(); ctx.lineWidth = 1.5; ctx.strokeStyle = dataset.borderColor; ctx.stroke();
                        ctx.fillStyle = dataset.borderColor; ctx.textBaseline = 'middle';
                        ctx.fillText(simbolosPlanetas[dataset.label], xPos, yPos + 1); 
                    }
                }
            });
        }
        ctx.restore();
    }
};

function llenarSelectorAnios() {
    const select = document.getElementById('anioInicio');
    select.innerHTML = '';
    const anioActual = new Date().getFullYear(); 
    for (let i = 1900; i <= 2100; i++) {
        const option = document.createElement('option');
        option.value = i; option.textContent = i;
        if (i === anioActual) option.selected = true; 
        select.appendChild(option);
    }
}

function generarSelectoresColor(planetasActivos) {
    const container = document.getElementById('colorPickersContainer');
    container.innerHTML = '';
    planetasActivos.forEach(p => {
        const div = document.createElement('div'); div.className = 'color-item';
        const input = document.createElement('input'); input.type = 'color';
        input.value = configPlanetas[p.nombre].color;
        input.addEventListener('input', (e) => {
            const nuevoColor = e.target.value;
            configPlanetas[p.nombre].color = nuevoColor;
            configPlanetasOriginal[p.nombre].color = nuevoColor; 
            if (miGrafico) {
                const dataset = miGrafico.data.datasets.find(ds => ds.label === p.nombre);
                if (dataset) { dataset.borderColor = nuevoColor; miGrafico.update('none'); }
            }
        });
        const label = document.createElement('span'); label.textContent = p.nombre;
        div.appendChild(input); div.appendChild(label); container.appendChild(div);
    });
}

async function iniciarApp() {
    llenarSelectorAnios();
    try { 
        await swe.initSwissEph(); 
        
        // --- APLICAMOS EL INTERRUPTOR DE ARRANQUE ---
        if (START_IN_ORBITS) {
            document.getElementById('btnLoadOrbitas').click();
        } else if (START_IN_MONTHLY_VIEW) {
            document.getElementById('btnLoadMonthlyPlugin').click();
        } else {
            generarGrafico(); 
        }
        
    } catch (error) { console.error(error); }
}

function generarGrafico() {
    const anioInicio = parseInt(document.getElementById('anioInicio').value);
    const modoVista = document.getElementById('modoVista').value;
    const anioFin = modoVista === '6anios' ? anioInicio + 5 : anioInicio; 
    
    setTimeout(() => {
        let planetasActivos = [];
        if (modoVista === '6anios') {
            planetasActivos = [
                { nombre: 'Jupiter', id: swe.SE_JUPITER }, { nombre: 'Saturn', id: swe.SE_SATURN },
                { nombre: 'Uranus', id: swe.SE_URANUS }, { nombre: 'Neptune', id: swe.SE_NEPTUNE },
                { nombre: 'Pluto', id: swe.SE_PLUTO }
            ];
        } else {
            planetasActivos = [
                { nombre: 'Sun', id: swe.SE_SUN }, { nombre: 'Mercury', id: swe.SE_MERCURY },
                { nombre: 'Venus', id: swe.SE_VENUS }, { nombre: 'Mars', id: swe.SE_MARS },
                { nombre: 'Jupiter', id: swe.SE_JUPITER }, { nombre: 'Saturn', id: swe.SE_SATURN },
                { nombre: 'Uranus', id: swe.SE_URANUS }, { nombre: 'Neptune', id: swe.SE_NEPTUNE },
                { nombre: 'Pluto', id: swe.SE_PLUTO }
            ];
        }
        generarSelectoresColor(planetasActivos);
        let etiquetasTiempo = [];
        let datosGrafico = {};
        planetasActivos.forEach(p => datosGrafico[p.nombre] = []);
        for (let anio = anioInicio; anio <= anioFin; anio++) {
            for (let mes = 1; mes <= 12; mes++) {
                let dias = (modoVista === '6anios') 
                    ? ((anio === anioFin && mes === 12) ? [15, 31] : [15])
                    : ((mes === 12) ? [1, 8, 15, 22, 31] : [1, 8, 15, 22]);
                for (let dia of dias) {
                    const jd = swe.julday(anio, mes, dia, 12.0); 
                    etiquetasTiempo.push({ mes: mes, anio: anio });
                    planetasActivos.forEach(planeta => {
                        try {
                            const res = swe.calc_ut(jd, planeta.id, swe.SEFLG_SWIEPH | swe.SEFLG_SPEED);
                            datosGrafico[planeta.nombre].push(res[0]);
                        } catch (e) { datosGrafico[planeta.nombre].push(null); }
                    });
                }
            }
        }
        const ctx = document.getElementById('graficoAstral').getContext('2d');
        if (miGrafico) miGrafico.destroy();
        const datasets = planetasActivos.map(p => ({
            label: p.nombre,
            data: cortarSaltoDeCiclo(datosGrafico[p.nombre]),
            borderColor: configPlanetas[p.nombre].color,
            borderWidth: grosorActual, fill: false, tension: 0.2, pointRadius: 0, spanGaps: false
        }));
        miGrafico = new Chart(ctx, {
            type: 'line',
            data: { labels: etiquetasTiempo, datasets: datasets },
            plugins: [fondosPlugin],
            options: {
                responsive: true, maintainAspectRatio: false,
                interaction: { mode: 'nearest', intersect: true }, 
                clip: false, layout: { padding: { right: 15, left: 5, top: 25, bottom: 5 } },
                plugins: {
                    modoVistaActivo: modoVista, legend: { display: false },
                    zoom: {
                        pan: { enabled: true, mode: 'xy' },
                        zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'xy' },
                        limits: { y: { min: 0, max: 360 } }
                    },
                    tooltip: {
                        animation: { duration: 100 },
                        callbacks: {
                            title: function(context) {
                                const idx = context[0].dataIndex;
                                const et = etiquetasTiempo[idx];
                                if (!et) return '';
                                const meses = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                                return `${meses[et.mes - 1]} ${et.anio}`;
                            },
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) label += ': ';
                                if (context.parsed.y !== null) {
                                    let grados = context.parsed.y % 360; if (grados < 0) grados += 360;
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
                    x: { grid: { display: false }, ticks: { display: false } },
                    y: {
                        min: 0, max: 360, 
                        ticks: {
                            stepSize: 30, color: isInverted ? '#ffffff' : '#888888',
                            callback: function(value) {
                                const signos = ['♈ Ari', '♉ Tau', '♊ Gem', '♋ Can', '♌ Leo', '♍ Vir', '♎ Lib', '♏ Sco', '♐ Sag', '♑ Cap', '♒ Aqu', '♓ Pis'];
                                let index = Math.floor(value / 30); index = ((index % 12) + 12) % 12; 
                                return signos[index];
                            }
                        },
                        grid: { color: (ctx) => (ctx.tick.value % 30 === 0) ? (isInverted ? 'rgba(255,255,255,0.2)' : 'rgba(180, 180, 180, 0.4)') : 'transparent' }
                    }
                }
            }
        });
    }, 100); 
}

// --- LÓGICA DE LOS MENÚS ---
const sidebar = document.getElementById('sidebar');
const settingsSidebar = document.getElementById('settingsSidebar');
const overlay = document.getElementById('overlay');

function closeAllMenus() {
    sidebar.classList.remove('open');
    settingsSidebar.classList.remove('open');
    overlay.classList.remove('open');
}

document.getElementById('openSidebar').addEventListener('click', () => { closeAllMenus(); sidebar.classList.add('open'); overlay.classList.add('open'); });
document.getElementById('openSettings').addEventListener('click', () => { closeAllMenus(); settingsSidebar.classList.add('open'); overlay.classList.add('open'); });
document.getElementById('closeSidebar').addEventListener('click', closeAllMenus);
document.getElementById('closeSettings').addEventListener('click', closeAllMenus);
overlay.addEventListener('click', closeAllMenus);

document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        document.getElementById('modoVista').value = this.getAttribute('data-view');
        closeAllMenus();
        generarGrafico();
    });
});

document.getElementById('btnLoadMonthlyPlugin').addEventListener('click', async () => {
    closeAllMenus();
    document.getElementById('main-controls').style.display = 'none';
    document.getElementById('main-chart-container').style.display = 'none';
    document.getElementById('main-chart-controls').style.display = 'none';
    
    const pluginContainer = document.getElementById('plugin-container');
    pluginContainer.style.display = 'flex';
    
    try {
        const moduloPlugin = await import('./plugin-mensual.js');
        moduloPlugin.iniciarPlugin(pluginContainer);
    } catch (error) {
        console.error("Error al cargar el plugin:", error);
        alert("No se pudo cargar el plugin. Revisa la consola.");
    }
});

document.getElementById('btnLoadOrbitas').addEventListener('click', async () => {
    closeAllMenus();
    try {
        const modulo = await import('./orbitas.js');
        modulo.iniciarOrbitas();
    } catch (error) {
        console.error("Error al cargar Orbits:", error);
        alert("No se pudo cargar Orbits. Revisa la consola.");
    }
});

document.getElementById('rangeThickness').addEventListener('input', function(e) {
    grosorActual = parseFloat(e.target.value);
    document.getElementById('lblThickness').textContent = grosorActual + ' px';
    if (miGrafico) {
        miGrafico.data.datasets.forEach(dataset => { dataset.borderWidth = grosorActual; });
        miGrafico.update('none');
    }
});

document.getElementById('btnDarkMode').addEventListener('click', function() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    this.classList.toggle('active');
    this.textContent = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
});

document.getElementById('btnInvertColors').addEventListener('click', function() {
    isInverted = !isInverted;
    this.classList.toggle('active');
    
    if (isInverted) {
        for (let key in configPlanetas) {
            configPlanetas[key].color = getContrastColor(configPlanetasOriginal[key].color);
        }
    } else {
        for (let key in configPlanetas) {
            configPlanetas[key].color = configPlanetasOriginal[key].color;
        }
    }
    generarGrafico();
});

function getContrastColor(hexcolor) {
    if (hexcolor === '#000000') return '#ffffff'; 
    if (hexcolor === '#ffffff') return '#000000';
    var r = parseInt(hexcolor.substr(1, 2), 16);
    var g = parseInt(hexcolor.substr(3, 2), 16);
    var b = parseInt(hexcolor.substr(5, 2), 16);
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#333333' : '#f1f1f1'; 
}

document.getElementById('btnGenerar').addEventListener('click', generarGrafico);
document.getElementById('btnZoomIn').addEventListener('click', () => { if (miGrafico) miGrafico.zoom(1.2); });
document.getElementById('btnZoomOut').addEventListener('click', () => { if (miGrafico) miGrafico.zoom(0.8); });
document.getElementById('btnReset').addEventListener('click', () => { if (miGrafico) miGrafico.resetZoom(); });

iniciarApp();

// --- ACERCA DE / LICENCIAS ---
(function () {
    const m = document.getElementById('aboutModal'), src = document.getElementById('aboutSrc');
    if (!m) return;
    if (SOURCE_URL) src.innerHTML = 'Source code: <a href="' + SOURCE_URL + '" target="_blank" rel="noopener">' + SOURCE_URL + '</a>';
    document.getElementById('btnAbout').addEventListener('click', () => { closeAllMenus(); m.style.display = 'flex'; });
    const cerrar = () => { m.style.display = 'none'; };
    document.getElementById('aboutClose').addEventListener('click', cerrar);
    m.addEventListener('click', e => { if (e.target === m) cerrar(); });
})();
