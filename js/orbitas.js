// =====================================================================
//  ÓRBITAS v2 — la órbita lunar vista desde la Tierra (todo en UTC)
//  Modo 1 «Lilith y Selene»: vista desde el polo. Perigeo (izq.) y apogeo (der.) en los
//        bordes; el zodíaco se deforma según la velocidad real de la Luna.
//  Modo 2 «Nodos lunares»: vista inclinada con la eclíptica, el Sol y los nodos al centro.
//  Datos: Swiss Ephemeris (window.swe). Uso: import('./orbitas.js').then(m => m.iniciarOrbitas())
// =====================================================================

const IMG_POLAR = 'data:image/jpeg;base64,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';
const IMG_NUBES = 'data:image/jpeg;base64,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';

const AU_KM = 149597870.7;
const J1970 = 2440587.5;
const SIGNOS = ['♈︎', '♉︎', '♊︎', '♋︎', '♌︎', '♍︎', '♎︎', '♏︎', '♐︎', '♑︎', '♒︎', '♓︎'];
const FUENTE_SIGNOS = '"Segoe UI Symbol","Noto Sans Symbols","Apple Symbols",system-ui,sans-serif';
const LS = 'orb-ajustes-v2';
const RATIO = 0.64;            // perigeo/apogeo en pantalla (forma exagerada)
const INCL_REAL = 5.145;       // inclinación media real de la órbita lunar (°)
const K_INCL = 3;              // exageración de la inclinación
const RANGO = { min: 356371, max: 406720 };   // distancias extremas posibles de la Luna (km)

const DEF = { modo: 'lilith', sid: false, signos: 1, local: false,
    lang: (typeof navigator !== 'undefined' && /^es/i.test(navigator.language || '')) ? 'es' : 'en' };
let cfg = { ...DEF };
try { Object.assign(cfg, JSON.parse(localStorage.getItem(LS) || '{}')); } catch (e) { /* nada */ }
const guardar = () => { try { localStorage.setItem(LS, JSON.stringify(cfg)); } catch (e) { /* nada */ } };

// ---------- Textos ----------
const TX = {
    es: {
        titulo: 'Órbitas', modoL: 'Lilith y Selene', modoN: 'Nodos lunares', trop: 'Tropical', sid: 'Sideral (Lahiri)',
        mes: 'Mes', anio: 'Año', vista: 'Vista', zod: 'Zodíaco', tamSig: 'Tamaño de signos', local: 'Mostrar hora local', idioma: 'Idioma',
        explic: 'Explicaciones', salir: '← Salir', reset: '↺ 00:00',
        meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        perigeo: 'Perigeo', apogeo: 'Apogeo', nodoAsc: 'Nodo ascendente', nodoDesc: 'Nodo descendente', nueva: 'Luna nueva', llena: 'Luna llena',
        cerca: 'cerca', lejos: 'lejos', dist: 'Distancia', lat: 'Latitud', long: 'Longitud', vel: 'Velocidad', edad: 'edad', dias: 'd', ilum: 'iluminada',
        horaLocal: 'Hora local', enRango: 'del rango', sinEvento: 'No se encontró el evento cercano.',
        notaL: 'Forma exagerada ×{n} · signos deformados por la velocidad lunar',
        notaN: 'Inclinación exagerada ×{n} (real {r}°)',
        fases: ['Luna nueva', 'Creciente', 'Cuarto creciente', 'Gibosa creciente', 'Luna llena', 'Gibosa menguante', 'Cuarto menguante', 'Menguante'],
        iMoon: 'LUNA', iSelene: 'SELENE — perigeo real: el punto más cercano de la Luna a la Tierra en esta órbita.',
        iLilith: 'LILITH — apogeo real: el punto más lejano de la Luna a la Tierra en esta órbita.',
        iSun: 'SOL — su posición real sobre la eclíptica.',
        iNodoN: '☊ NODO NORTE (medio) — donde la Luna cruza la eclíptica hacia el norte.',
        iNodoS: '☋ NODO SUR (medio) — donde la Luna cruza la eclíptica hacia el sur.',
        ex: [
            ['Lilith y Selene', 'La Tierra es el punto desde donde se mide. Cada punto de la órbita se ubica por su longitud (el signo) y por su distancia real. El perigeo (Selene, disco blanco) queda siempre a la izquierda y el apogeo (Lilith, disco negro) a la derecha. El color de la cinta indica la distancia real: azul cerca, verde media, negro lejos.'],
            ['Perigeo y apogeo reales', 'Son los puntos de máxima cercanía y lejanía de cada órbita, calculados con las efemérides. No son opuestos exactos: su separación varía entre unos 155° y 211°. Por eso el zodíaco se deforma: cada signo se dibuja más ancho si la Luna tarda más en cruzarlo (cerca del apogeo, donde va más lenta) y más angosto si va rápido (cerca del perigeo).'],
            ['Nodos lunares', 'Son los dos puntos donde la órbita de la Luna cruza la eclíptica (el camino del Sol). La vista se orienta para que el eje de los nodos quede siempre vertical y al centro; los signos en cuadratura quedan a los costados. Se usa el nodo medio. La inclinación está exagerada para que se vea.'],
            ['Cálculos reales', 'Las posiciones, distancias y velocidades salen de Swiss Ephemeris. Lo que se exagera para que se vea (la forma de la órbita, la inclinación, el tamaño de la Tierra) está avisado en pantalla. Todo en UTC.']
        ]
    },
    en: {
        titulo: 'Orbits', modoL: 'Lilith & Selene', modoN: 'Lunar nodes', trop: 'Tropical', sid: 'Sidereal (Lahiri)',
        mes: 'Month', anio: 'Year', vista: 'View', zod: 'Zodiac', tamSig: 'Sign size', local: 'Show local time', idioma: 'Language',
        explic: 'Explanations', salir: '← Exit', reset: '↺ 00:00',
        meses: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        perigeo: 'Perigee', apogeo: 'Apogee', nodoAsc: 'Ascending node', nodoDesc: 'Descending node', nueva: 'New Moon', llena: 'Full Moon',
        cerca: 'near', lejos: 'far', dist: 'Distance', lat: 'Latitude', long: 'Longitude', vel: 'Speed', edad: 'age', dias: 'd', ilum: 'lit',
        horaLocal: 'Local time', enRango: 'of range', sinEvento: 'Nearby event not found.',
        notaL: 'Shape exaggerated ×{n} · signs stretched by Moon speed',
        notaN: 'Tilt exaggerated ×{n} (real {r}°)',
        fases: ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'],
        iMoon: 'MOON', iSelene: 'SELENE — real perigee: the Moon\'s closest point to Earth on this orbit.',
        iLilith: 'LILITH — real apogee: the Moon\'s farthest point from Earth on this orbit.',
        iSun: 'SUN — its real position on the ecliptic.',
        iNodoN: '☊ NORTH NODE (mean) — where the Moon crosses the ecliptic northwards.',
        iNodoS: '☋ SOUTH NODE (mean) — where the Moon crosses the ecliptic southwards.',
        ex: [
            ['Lilith & Selene', 'Earth is the point everything is measured from. Each point of the orbit is placed by its longitude (the sign) and its real distance. The perigee (Selene, white disc) is always on the left and the apogee (Lilith, black disc) on the right. Ribbon colour shows the real distance: blue near, green mean, black far.'],
            ['Real perigee and apogee', 'They are the closest and farthest points of each orbit, computed from the ephemeris. They are not exact opposites: their separation varies from about 155° to 211°. That is why the zodiac is stretched: a sign is drawn wider when the Moon takes longer to cross it (near apogee, where it is slower) and narrower when it is fast (near perigee).'],
            ['Lunar nodes', 'The two points where the Moon\'s orbit crosses the ecliptic (the Sun\'s path). The view is oriented so the node axis is always vertical and centred; the signs in square to the nodes stay at the sides. The mean node is used. The tilt is exaggerated so it can be seen.'],
            ['Real calculations', 'Positions, distances and speeds come from Swiss Ephemeris. What is exaggerated to be visible (orbit shape, tilt, Earth size) is stated on screen. Everything in UTC.']
        ]
    }
};
const t = k => (TX[cfg.lang] || TX.es)[k];

// ---------- Utilidades ----------
const norm = a => ((a % 360) + 360) % 360;
const wrap180 = a => norm(a + 180) - 180;
const pad = (n, l = 2) => String(n).padStart(l, '0');
const fmtKm = km => Math.round(km).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const fmtDec = (x, n = 1) => x.toFixed(n).replace('.', cfg.lang === 'es' ? ',' : '.');
const jdADate = jd => new Date((jd - J1970) * 86400000);
function fmtUTC(jd) {
    const d = jdADate(jd);
    return `${d.getUTCDate()} ${t('meses')[d.getUTCMonth()].slice(0, 3)} ${d.getUTCFullYear()} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())} UTC`;
}
function fmtSigno(lon) {
    const l = norm(lon), s = Math.floor(l / 30), g = l - s * 30, gi = Math.floor(g), m = Math.floor((g - gi) * 60);
    return `${gi}° ${SIGNOS[s]} ${pad(m)}'`;
}

// ---------- Cálculo ----------
function calc(jd, id, sid) {
    const s = window.swe;
    return s.calc_ut(jd, id, s.SEFLG_SWIEPH | s.SEFLG_SPEED | (sid ? s.SEFLG_SIDEREAL : 0));
}
const MOON = () => window.swe.SE_MOON, SUN = () => window.swe.SE_SUN;
const dM = jd => calc(jd, MOON(), false)[2];
const elong = jd => norm(calc(jd, MOON(), false)[0] - calc(jd, SUN(), false)[0]);

// raíz (cambio de signo de g) hacia delante (dir=1) o atrás (dir=-1)
function buscar(g, jd, dir, paso, max, signo) {
    let ta = jd + dir / 1440, ga = g(ta);
    for (let s = 0; s < max; s += paso) {
        const tb = ta + dir * paso, gb = g(tb);
        const e = dir > 0 ? ta : tb, l = dir > 0 ? tb : ta, ge = dir > 0 ? ga : gb, gl = dir > 0 ? gb : ga;
        if (signo * ge < 0 && signo * gl >= 0) {
            let lo = e, hi = l;
            for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (signo * g(m) < 0) lo = m; else hi = m; }
            return (lo + hi) / 2;
        }
        ta = tb; ga = gb;
    }
    return null;
}
const gPer = jd => dM(jd + 0.02) - dM(jd - 0.02);
const EV = {
    perigeo: { g: gPer, s: 1 }, apogeo: { g: gPer, s: -1 },
    nodoAsc: { g: jd => calc(jd, MOON(), false)[1], s: 1 }, nodoDesc: { g: jd => calc(jd, MOON(), false)[1], s: -1 },
    nueva: { g: jd => wrap180(elong(jd)), s: 1 }, llena: { g: jd => wrap180(elong(jd) - 180), s: 1 }
};
const buscarEvento = (clave, jd, dir) => buscar(EV[clave].g, jd, dir, 0.5, 40, EV[clave].s);

function estado(jd) {
    const m = calc(jd, MOON(), cfg.sid), s = calc(jd, SUN(), cfg.sid);
    let nodo = null;
    try { nodo = norm(calc(jd, window.swe.SE_MEAN_NODE, cfg.sid)[0]); } catch (e) { /* nada */ }
    return { M: { lon: m[0], lat: m[1], d: m[2], v: m[3] }, S: { lon: s[0], d: s[2] }, nodo };
}

// Lista de perigeos/apogeos reales alrededor de jd (se recalcula cada 10 días)
let evC = { key: null, list: [] };
function evList(jd) {
    const k = Math.floor(jd / 10), key = k + (cfg.sid ? 's' : 't');
    if (evC.key === key) return evC.list;
    const ini = k * 10 - 55, fin = k * 10 + 65;
    const tp = buscar(gPer, ini, 1, 0.5, 25, 1), ta = buscar(gPer, ini, 1, 0.5, 25, -1);
    let tipo = (tp != null && (ta == null || tp < ta)) ? 'P' : 'A';
    let tt = tipo === 'P' ? tp : ta;
    const list = [];
    while (tt != null && tt < fin) {
        const r = calc(tt, MOON(), cfg.sid);
        list.push({ t: tt, tipo, lon: r[0], lat: r[1], d: r[2], v: r[3] });
        tipo = tipo === 'P' ? 'A' : 'P';
        tt = buscar(gPer, tt, 1, 0.5, 25, tipo === 'P' ? 1 : -1);
    }
    evC = { key, list };
    return list;
}

// Trazas de la Luna con caché (paso 0,25 d, índice absoluto)
const cache = new Map();
function punto(idx) {
    const key = (cfg.sid ? 's' : 't') + idx;
    let p = cache.get(key);
    if (!p) {
        const jd = idx * 0.25, r = calc(jd, MOON(), cfg.sid);
        p = { t: jd, lon: r[0], lat: r[1], d: r[2] };
        cache.set(key, p);
        if (cache.size > 9000) cache.clear();
    }
    return p;
}
function serieLuna(jd, half) {
    const i0 = Math.ceil((jd - half) / 0.25), i1 = Math.floor((jd + half) / 0.25), a = [];
    for (let i = i0; i <= i1; i++) a.push(punto(i));
    return a;
}
function trazaCinta(jd, cur) {
    const half = 13.775, a = [];
    serieLuna(jd, half).forEach(p => { if (p.t < jd - 1e-9) a.push(p); });
    a.push({ t: jd, lon: cur.lon, lat: cur.lat, d: cur.d });
    serieLuna(jd, half).forEach(p => { if (p.t > jd + 1e-9) a.push(p); });
    return { arr: a, half };
}

// ---------- Mapa «tiempo → ángulo en pantalla» del modo Lilith ----------
// Cada semiórbita (apogeo→perigeo, perigeo→apogeo) ocupa 180° y la Luna avanza a ritmo uniforme dentro de ella.
function phiUnw(ev, tt) {
    let i = 0;
    while (i < ev.length - 2 && ev[i + 1].t <= tt) i++;
    const e0 = ev[i], e1 = ev[i + 1];
    return 180 * i + (ev[0].tipo === 'A' ? 0 : 180) + 180 * (tt - e0.t) / (e1.t - e0.t);
}
function distPA(ev, tt, tipo) {
    const l = ev.filter(e => e.tipo === tipo);
    let i = 0;
    while (i < l.length - 2 && l[i + 1].t <= tt) i++;
    const a = l[i], b = l[i + 1];
    return a.d + (b.d - a.d) * (tt - a.t) / (b.t - a.t);
}
function cruces(serie, b) {
    const out = [];
    for (let i = 0; i < serie.length - 1; i++) {
        const d0 = wrap180(serie[i].lon - b), d1 = wrap180(serie[i + 1].lon - b);
        if (d0 < 0 && d1 >= 0 && (d1 - d0) < 30) out.push(serie[i].t + (serie[i + 1].t - serie[i].t) * (-d0) / (d1 - d0));
    }
    return out;
}
// ángulo en pantalla de cada frontera de signo: se desliza suavemente entre cruces sucesivos
function phiBordes(ev, serie, jd) {
    const out = [];
    for (let k = 0; k < 12; k++) {
        const cs = cruces(serie, k * 30);
        let tm = null, tn = null;
        for (const c of cs) { if (c <= jd) tm = c; else { tn = c; break; } }
        if (tm == null || tn == null) { out.push(null); continue; }
        const pm = phiUnw(ev, tm), pn = phiUnw(ev, tn), u = (jd - tm) / (tn - tm);
        out.push(norm(pm + u * (pn - 360 - pm)));
    }
    return out;
}
function geomLilith(jd) {
    const ev = evList(jd), serie = serieLuna(jd, 30);
    return { ev, phiBs: phiBordes(ev, serie, jd), phiM: norm(phiUnw(ev, jd)), dP: distPA(ev, jd, 'P'), dA: distPA(ev, jd, 'A') };
}

// edad de la Luna: días desde la última luna nueva
let cicloL = null;
function edadLuna(jd) {
    if (!(cicloL && jd >= cicloL.t0 && jd < cicloL.t1)) {
        const t0 = buscarEvento('nueva', jd, -1);
        const t1 = t0 != null ? buscarEvento('nueva', t0, 1) : null;
        cicloL = (t0 != null && t1 != null) ? { t0, t1 } : null;
    }
    return cicloL ? jd - cicloL.t0 : null;
}

// ---------- Color por distancia ----------
function colDist(p) {
    p = Math.max(0, Math.min(1, p));
    const A = [30, 91, 255], B = [31, 168, 74], C = [0, 0, 0];
    const [u, v, f] = p < 0.5 ? [A, B, p / 0.5] : [B, C, (p - 0.5) / 0.5];
    return `rgb(${Math.round(u[0] + (v[0] - u[0]) * f)},${Math.round(u[1] + (v[1] - u[1]) * f)},${Math.round(u[2] + (v[2] - u[2]) * f)})`;
}
const pctKm = km => (km - RANGO.min) / (RANGO.max - RANGO.min);

// ---------- Tierra difusa ----------
const TEX = { polar: null, nubes: null };
function cargarTexturas() {
    [['polar', IMG_POLAR], ['nubes', IMG_NUBES]].forEach(([k, src]) => {
        const im = new Image();
        im.onload = () => {
            const c = document.createElement('canvas'); c.width = c.height = 160;
            const g = c.getContext('2d');
            g.drawImage(im, 0, 0, 160, 160);
            g.globalCompositeOperation = 'destination-in';
            const rg = g.createRadialGradient(80, 80, 20, 80, 80, 80);
            rg.addColorStop(0, 'rgba(0,0,0,1)'); rg.addColorStop(0.55, 'rgba(0,0,0,.85)'); rg.addColorStop(1, 'rgba(0,0,0,0)');
            g.fillStyle = rg; g.fillRect(0, 0, 160, 160);
            TEX[k] = c; if (root) render();
        };
        im.src = src;
    });
}
function dibujarTierra(x, y, re, pitch) {
    const g0 = ctx.createRadialGradient(x, y, 1, x, y, re * 1.6);
    g0.addColorStop(0, 'rgba(120,160,210,.55)'); g0.addColorStop(1, 'rgba(120,160,210,0)');
    ctx.fillStyle = g0; ctx.beginPath(); ctx.arc(x, y, re * 1.6, 0, 7); ctx.fill();
    const ap = Math.max(0, Math.min(1, (0.95 - pitch) / 0.5));
    if (TEX.nubes && ap < 1) { ctx.globalAlpha = 1 - ap; ctx.drawImage(TEX.nubes, x - re * 1.5, y - re * 1.5, re * 3, re * 3); }
    if (TEX.polar && ap > 0) { ctx.globalAlpha = ap; ctx.drawImage(TEX.polar, x - re * 1.5, y - re * 1.5, re * 3, re * 3); }
    ctx.globalAlpha = 1;
}

// ---------- Fase de la Luna (vista desde la Tierra, hemisferio norte) ----------
function dibujarFase(x, y, r, E) {
    const c = Math.cos(E * Math.PI / 180), a = Math.abs(c) * r, crece = E <= 180;
    ctx.save(); ctx.translate(x, y); if (!crece) ctx.scale(-1, 1);
    ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fillStyle = '#242833'; ctx.fill();
    ctx.beginPath(); ctx.arc(0, 0, r, -Math.PI / 2, Math.PI / 2, false);
    if (c >= 0) ctx.ellipse(0, 0, Math.max(a, 0.01), r, 0, Math.PI / 2, -Math.PI / 2, true);
    else ctx.ellipse(0, 0, Math.max(a, 0.01), r, 0, Math.PI / 2, Math.PI * 1.5, false);
    ctx.closePath(); ctx.fillStyle = '#fbf3c6'; ctx.fill();
    ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.lineWidth = 1.5; ctx.strokeStyle = '#555'; ctx.stroke();
    ctx.restore();
}
function nombreFase(E) { return t('fases')[Math.round(E / 45) % 8]; }

// ---------- Estilos ----------
function inyectarEstilos() {
    if (document.getElementById('orb-estilos')) return;
    const s = document.createElement('style');
    s.id = 'orb-estilos';
    s.textContent = `
    #orb-root { position: fixed; left: 0; top: 0; width: 100%; background: #fff; z-index: 4000; display: flex; flex-direction: column;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #222; touch-action: manipulation; -webkit-user-select: none; user-select: none; }
    #orb-titulo { padding: 4px 10px; font-size: .8rem; font-weight: bold; color: #2c3e50; text-align: center; flex-shrink: 0; }
    #orb-modos { display: flex; gap: 6px; padding: 0 8px 6px; flex-shrink: 0; }
    #orb-modos button { flex: 1; padding: 7px 4px; border: 1px solid #bdc3c7; background: #ecf0f1; border-radius: 8px; font-size: .86rem; cursor: pointer; color: #2c3e50; }
    #orb-modos button.on { background: #2c3e50; color: #fff; border-color: #2c3e50; font-weight: bold; }
    #orb-main { position: relative; flex: 1; min-height: 0; }
    #orb-cv { position: absolute; left: 0; top: 0; width: 100%; height: 100%; display: block; touch-action: none; }
    #orb-chip { position: absolute; left: 8px; right: 8px; top: 2px; background: rgba(244,246,247,.96); border: 1px solid #dde1e3; border-radius: 10px; padding: 4px 9px; font-size: .76rem; line-height: 1.35; z-index: 2; }
    #orb-chip .l1 { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    #orb-chip .det { display: none; margin-top: 3px; border-top: 1px solid #dde1e3; padding-top: 3px; }
    #orb-chip.abierto .det { display: block; }
    #orb-bub { position: absolute; z-index: 4; max-width: 250px; background: #222; color: #fff; border-radius: 10px; padding: 7px 10px; font-size: .76rem; line-height: 1.35; display: none; pointer-events: none; }
    #orb-evrow { display: flex; gap: 6px; padding: 4px 8px 0; flex-shrink: 0; }
    #orb-evrow button { width: 44px; padding: 6px 0; border: 1px solid #bdc3c7; background: #ecf0f1; border-radius: 8px; font-size: 1rem; cursor: pointer; }
    #orb-evrow select { flex: 1; min-width: 0; padding: 5px; border-radius: 8px; border: 1px solid #ccc; font-size: .88rem; background: #fff; }
    #orb-strips { flex-shrink: 0; padding: 4px 8px 8px; }
    .orb-strip { display: flex; align-items: center; touch-action: none; user-select: none; -webkit-user-select: none; }
    .orb-strip .c { text-align: center; overflow: hidden; white-space: nowrap; color: #666; font-size: 1.05rem; box-sizing: border-box; }
    .orb-strip .c:nth-child(1), .orb-strip .c:nth-child(5) { flex: 0 0 15%; opacity: .4; }
    .orb-strip .c:nth-child(2), .orb-strip .c:nth-child(4) { flex: 0 0 15%; opacity: .75; }
    .orb-strip .c:nth-child(3) { flex: 0 0 40%; background: #fff; border: 2px solid #2c3e50; border-radius: 10px; color: #2c3e50; font-weight: bold; padding: 2px 0; }
    #orb-sdia { height: 50px; } #orb-sdia .c:nth-child(3) { font-size: 1.55rem; }
    #orb-shora { height: 42px; } #orb-shora .c:nth-child(3) { font-size: .92rem; }
    #orb-fila-hora { display: flex; align-items: center; gap: 6px; margin-top: 6px; padding-right: 58px; }
    #orb-fila-hora .orb-strip { flex: 1; min-width: 0; }
    #orb-reset { flex: 0 0 auto; padding: 6px 8px; font-size: .78rem; border: 1px solid #bdc3c7; background: #ecf0f1; border-radius: 8px; cursor: pointer; }
    #orb-fab { position: absolute; right: 10px; bottom: 8px; width: 48px; height: 48px; border-radius: 50%; border: none; background: #2c3e50;
        color: #fff; font-size: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,.35); cursor: pointer; z-index: 6; }
    #orb-panel { display: none; position: absolute; right: 10px; bottom: 64px; width: min(300px, calc(100% - 20px)); max-height: 72%; overflow-y: auto;
        background: #fff; border: 1px solid #bbb; border-radius: 12px; padding: 12px; box-shadow: 0 4px 16px rgba(0,0,0,.3); z-index: 5; }
    #orb-panel.abierto { display: block; }
    #orb-panel .fila { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 9px; font-size: .88rem; }
    #orb-panel select { padding: 5px; border-radius: 6px; border: 1px solid #ccc; font-size: .88rem; }
    #orb-panel input[type=range] { width: 130px; }
    #orb-panel details { margin: 4px 0 8px; font-size: .8rem; line-height: 1.4; }
    #orb-panel summary { font-weight: bold; color: #2c3e50; cursor: pointer; padding: 3px 0; }
    #orb-panel .sub { font-weight: bold; font-size: .82rem; color: #2c3e50; margin: 6px 0; }
    #orb-panel .orb-sec { width: 100%; padding: 8px; border: 1px solid #c9d1d9; border-radius: 8px; background: #f4f6f8; color: #2c3e50; font-size: .88rem; cursor: pointer; margin-top: 6px; }
    #orb-panel .salir { width: 100%; padding: 8px; border: none; border-radius: 8px; background: #c0392b; color: #fff; font-weight: bold; font-size: .95rem; cursor: pointer; margin-top: 6px; }
    `;
    document.head.appendChild(s);
}

// ---------- Estado de pantalla ----------
let root = null, cv = null, ctx = null, W = 0, H = 0, dpr = 1, hits = [];
const est = { ms: 0, pitch: 1.1, chipAbierto: false };
const jdAhora = () => est.ms / 86400000 + J1970;
const MIN_MS = Date.UTC(1801, 2, 1), MAX_MS = Date.UTC(2399, 8, 1);

function ajustarAlto() {
    if (!root) return;
    root.style.height = window.innerHeight + 'px';
    render();
}

// ---------- Dibujo ----------
function render() {
    if (!root || root.style.display === 'none') return;
    const main = document.getElementById('orb-main');
    W = main.clientWidth; H = main.clientHeight;
    if (!W || !H) return;
    dpr = window.devicePixelRatio || 1;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
    hits = [];
    try {
        const jd = jdAhora(), s = estado(jd);
        if (cfg.modo === 'lilith') dibujarLilith(jd, s); else dibujarNodos(jd, s);
        actualizarChip(jd, s);
    } catch (e) { console.error(e); }
    titulo(); pintarStrips(); sincronizarUI();
}

function textoLeyenda(nota) {
    const x0 = W * 0.13, w = W * 0.74, y = H - 43;
    const g = ctx.createLinearGradient(x0, 0, x0 + w, 0);
    g.addColorStop(0, '#1e5bff'); g.addColorStop(0.5, '#1fa84a'); g.addColorStop(1, '#000');
    ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x0, y, w, 7, 3.5) : ctx.rect(x0, y, w, 7); ctx.fill();
    ctx.font = '10px system-ui,sans-serif'; ctx.fillStyle = '#333'; ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left'; ctx.fillText(`${t('cerca')} ${fmtKm(RANGO.min)} km`, x0, y + 19);
    ctx.textAlign = 'right'; ctx.fillText(`${fmtKm(RANGO.max)} km ${t('lejos')}`, x0 + w, y + 19);
    ctx.textAlign = 'center'; ctx.fillStyle = '#4a5160'; ctx.fillText(nota, W / 2, H - 5);
}

function dibujarLilith(jd, s) {
    const g = geomLilith(jd), ev = g.ev;
    const bw = Math.max(24, Math.min(34, W * 0.085)), rm = 12;
    const Ro = Math.min(W / 2 - 4, (H - 96) / 2), Ri = Ro - bw;
    const Cx = W / 2, Cy = 46 + (H - 46 - 52) / 2;
    const Rs = Ri - (rm + 8);
    const rA = 2 * Rs / (1 + RATIO), rP = RATIO * rA;
    const E = { x: Cx - Rs + rP, y: Cy }, C = { x: Cx, y: Cy };
    const mapR = d => rP + (d - g.dP) / (g.dA - g.dP) * (rA - rP);
    const pt = (phi, r) => { const a = phi * Math.PI / 180; return { x: E.x + r * Math.cos(a), y: E.y - r * Math.sin(a) }; };
    const anillo = (phi, R) => {
        const a = phi * Math.PI / 180, ux = Math.cos(a), uy = -Math.sin(a), wx = E.x - C.x, wy = E.y - C.y, wu = wx * ux + wy * uy;
        const rho = -wu + Math.sqrt(wu * wu - (wx * wx + wy * wy) + R * R);
        return { x: E.x + rho * ux, y: E.y + rho * uy };
    };

    // anillo de signos deformado por la velocidad de la Luna
    const fs = Math.max(11, Math.min(30, bw * 0.66 * cfg.signos));
    const bs = g.phiBs;
    if (bs.every(v => v != null)) {
        for (let k = 0; k < 12; k++) {
            const p0 = bs[k], w = norm(bs[(k + 1) % 12] - p0), n = 8;
            ctx.beginPath();
            for (let j = 0; j <= n; j++) { const p = anillo(p0 + w * j / n, Ro); j ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y); }
            for (let j = n; j >= 0; j--) { const p = anillo(p0 + w * j / n, Ri); ctx.lineTo(p.x, p.y); }
            ctx.closePath();
            ctx.fillStyle = k % 2 ? 'rgba(206,212,224,.55)' : 'rgba(244,246,250,.9)'; ctx.fill();
            ctx.strokeStyle = 'rgba(120,128,148,.6)'; ctx.lineWidth = 1; ctx.stroke();
        }
        ctx.font = `${fs}px ${FUENTE_SIGNOS}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#7c8494';
        for (let k = 0; k < 12; k++) {
            const w = norm(bs[(k + 1) % 12] - bs[k]), p = anillo(bs[k] + w / 2, (Ro + Ri) / 2);
            ctx.fillText(SIGNOS[k], p.x, p.y + 1);
        }
    }

    // cinta de la órbita (color = distancia real)
    const tr = trazaCinta(jd, s.M), arr = tr.arr;
    ctx.lineCap = 'round'; ctx.lineWidth = 7;
    for (let i = 0; i < arr.length - 1; i++) {
        const a = arr[i], b = arr[i + 1];
        const pa = pt(phiUnw(ev, a.t), mapR(a.d)), pb = pt(phiUnw(ev, b.t), mapR(b.d));
        ctx.globalAlpha = 1 - 0.6 * Math.abs((a.t + b.t) / 2 - jd) / tr.half;
        ctx.strokeStyle = colDist(pctKm((a.d + b.d) / 2 * AU_KM));
        ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y); ctx.stroke();
    }
    ctx.globalAlpha = 1;

    dibujarTierra(E.x, E.y, 17, 0);

    // Selene y Lilith (perigeo y apogeo reales más cercanos en el tiempo)
    const cerc = tipo => ev.filter(e => e.tipo === tipo).sort((a, b) => Math.abs(a.t - jd) - Math.abs(b.t - jd))[0];
    [['P', true, 'Selene', 'iSelene', 'left'], ['A', false, 'Lilith', 'iLilith', 'right']].forEach(([tipo, blanco, nom, key, alin]) => {
        const e = cerc(tipo); if (!e) return;
        const p = pt(tipo === 'P' ? 180 : 0, mapR(e.d)), km = e.d * AU_KM;
        ctx.beginPath(); ctx.arc(p.x, p.y, 6.5, 0, 7); ctx.fillStyle = blanco ? '#fff' : '#000'; ctx.fill();
        ctx.lineWidth = 2; ctx.strokeStyle = blanco ? '#111' : '#fff'; ctx.stroke(); ctx.lineWidth = 1; ctx.strokeStyle = blanco ? '#fff' : '#000'; ctx.stroke();
        ctx.font = 'bold 11px system-ui,sans-serif'; ctx.textAlign = alin; ctx.textBaseline = 'alphabetic'; ctx.fillStyle = '#111';
        const lx = alin === 'left' ? p.x + 13 : p.x - 13;
        ctx.fillText(nom, lx, p.y - 8);
        ctx.font = '10px system-ui,sans-serif'; ctx.fillStyle = '#333';
        ctx.fillText(`${fmtKm(km)} km`, lx, p.y + 4); ctx.fillText(`${fmtDec(e.v)} °/${t('dias')}`, lx, p.y + 16);
        hits.push({ x: p.x, y: p.y, r: 14, txt: `${t(key)} ${fmtUTC(e.t)} · ${fmtKm(km)} km · ${fmtDec(e.v)} °/${t('dias')} · ${fmtSigno(e.lon)}` });
    });

    // Luna con su fase
    const pm = pt(g.phiM, mapR(s.M.d)), Ef = norm(s.M.lon - s.S.lon);
    dibujarFase(pm.x, pm.y, rm, Ef);
    hits.push({ x: pm.x, y: pm.y, r: 16, txt: `${t('iMoon')} ${fmtSigno(s.M.lon)} · ${fmtKm(s.M.d * AU_KM)} km · ${nombreFase(Ef)}` });

    const eVis = (1 - RATIO) / (1 + RATIO), eReal = (g.dA - g.dP) / (g.dA + g.dP);
    textoLeyenda(t('notaL').replace('{n}', fmtDec(eVis / eReal, 1)));
}

function dibujarNodos(jd, s) {
    const nodo = s.nodo == null ? 0 : s.nodo;
    const yaw = nodo * Math.PI / 180 - Math.PI / 2, pitch = est.pitch, cp = Math.cos(pitch), sp = Math.sin(pitch);
    const R0 = Math.min(W / 2 - 34, 170), Cx = W / 2, Cy = 46 + (H - 46 - 52) / 2;
    const iVis = INCL_REAL * K_INCL * Math.PI / 180, zs = pitch < 0.02 ? 0.3 : sp;
    const zOrb = lon => R0 * Math.sin(iVis) * Math.sin((lon - nodo) * Math.PI / 180);
    const P = (lon, r, z) => {
        const a = lon * Math.PI / 180, X = -Math.cos(a) * r, Y = Math.sin(a) * r;
        const X2 = X * Math.cos(yaw) - Y * Math.sin(yaw), Y2 = X * Math.sin(yaw) + Y * Math.cos(yaw);
        return { x: Cx + X2, y: Cy + Y2 * cp - z * zs, d: Y2 * sp + z * cp };
    };
    const items = [];

    // eclíptica: anillo claro con signos tenues
    ctx.beginPath();
    for (let i = 0; i <= 120; i++) { const p = P(i * 3, R0, 0); i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y); }
    ctx.strokeStyle = '#cfd5e0'; ctx.lineWidth = 1.6; ctx.stroke();
    const fsE = Math.max(10, 15 * cfg.signos * 0.85), fsM = Math.max(12, 20 * cfg.signos);
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (let k = 0; k < 12; k++) {
        const a = P(k * 30, R0 - 7, 0), b = P(k * 30, R0 + 7, 0);
        ctx.strokeStyle = '#d6dae3'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        const p = P(k * 30 + 15, R0 - 17, 0);
        ctx.font = `${fsE}px ${FUENTE_SIGNOS}`; ctx.fillStyle = '#d3d7e0'; ctx.fillText(SIGNOS[k], p.x, p.y);
    }
    // línea de los nodos
    const na = P(nodo, R0 * 1.12, 0), nb = P(nodo + 180, R0 * 1.12, 0);
    ctx.setLineDash([6, 5]); ctx.strokeStyle = 'rgba(60,70,90,.65)'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(na.x, na.y); ctx.lineTo(nb.x, nb.y); ctx.stroke(); ctx.setLineDash([]);

    // cinta lunar inclinada (color = distancia real) con sus signos
    const tr = trazaCinta(jd, s.M), arr = tr.arr;
    for (let i = 0; i < arr.length - 1; i++) {
        const a = arr[i], b = arr[i + 1];
        const pa = P(a.lon, R0, zOrb(a.lon)), pb = P(b.lon, R0, zOrb(b.lon));
        const al = 1 - 0.6 * Math.abs((a.t + b.t) / 2 - jd) / tr.half, col = colDist(pctKm((a.d + b.d) / 2 * AU_KM));
        items.push({ d: (pa.d + pb.d) / 2, f: () => { ctx.globalAlpha = al; ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y); ctx.stroke(); ctx.globalAlpha = 1; } });
    }
    for (let k = 0; k < 12; k++) {
        const a = P(k * 30, R0 - 9, zOrb(k * 30)), b = P(k * 30, R0 + 9, zOrb(k * 30)), p = P(k * 30 + 15, R0 + 21, zOrb(k * 30 + 15));
        items.push({ d: p.d + 0.2, f: () => {
            ctx.strokeStyle = '#6b7384'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            ctx.font = `${fsM}px ${FUENTE_SIGNOS}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#7c8494'; ctx.fillText(SIGNOS[k], p.x, p.y);
        } });
    }
    // nodos ☊ ☋
    [[nodo, '☊', 'iNodoN'], [nodo + 180, '☋', 'iNodoS']].forEach(([lo, gl, key]) => {
        const p = P(lo, R0 * 1.12, 0);
        items.push({ d: p.d + 0.3, f: () => { ctx.font = `20px ${FUENTE_SIGNOS}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineWidth = 4; ctx.strokeStyle = '#fff'; ctx.strokeText(gl, p.x, p.y); ctx.fillStyle = '#222'; ctx.fillText(gl, p.x, p.y); } });
        hits.push({ x: p.x, y: p.y, r: 14, txt: `${t(key)} ${fmtSigno(lo)}` });
    });
    // Tierra
    items.push({ d: 0, f: () => dibujarTierra(Cx, Cy, 15, pitch) });
    // Sol sobre la eclíptica
    const ps = P(s.S.lon, R0, 0);
    items.push({ d: ps.d + 0.5, f: () => {
        const gr = ctx.createRadialGradient(ps.x, ps.y, 3, ps.x, ps.y, 24);
        gr.addColorStop(0, 'rgba(255,214,10,.9)'); gr.addColorStop(1, 'rgba(255,214,10,0)');
        ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(ps.x, ps.y, 24, 0, 7); ctx.fill();
        ctx.beginPath(); ctx.arc(ps.x, ps.y, 10, 0, 7); ctx.fillStyle = '#f5c518'; ctx.fill(); ctx.lineWidth = 1.5; ctx.strokeStyle = '#b8860b'; ctx.stroke();
    } });
    hits.push({ x: ps.x, y: ps.y, r: 16, txt: `${t('iSun')} ${fmtSigno(s.S.lon)}` });
    // Luna
    const pm = P(s.M.lon, R0, zOrb(s.M.lon)), Ef = norm(s.M.lon - s.S.lon);
    items.push({ d: pm.d + 0.6, f: () => dibujarFase(pm.x, pm.y, 12, Ef) });
    hits.push({ x: pm.x, y: pm.y, r: 16, txt: `${t('iMoon')} ${fmtSigno(s.M.lon)} · ${fmtKm(s.M.d * AU_KM)} km · ${nombreFase(Ef)}` });

    items.sort((a, b) => a.d - b.d).forEach(it => it.f());
    textoLeyenda(t('notaN').replace('{n}', K_INCL).replace('{r}', fmtDec(INCL_REAL, 1)));
}

// ---------- Datos arriba ----------
function actualizarChip(jd, s) {
    const chip = document.getElementById('orb-chip'), Ef = norm(s.M.lon - s.S.lon), il = (1 - Math.cos(Ef * Math.PI / 180)) / 2 * 100;
    const ed = edadLuna(jd), km = s.M.d * AU_KM;
    const l1 = `☽ ${fmtSigno(s.M.lon)} · ${fmtKm(km)} km · ${fmtDec(s.M.v)} °/${t('dias')}`;
    const det = [
        `☽ ${nombreFase(Ef)} · ${il.toFixed(0)}% ${t('ilum')}${ed != null ? ` · ${t('edad')} ${fmtDec(ed)} ${t('dias')}` : ''}`,
        `${t('long')}: ${fmtSigno(s.M.lon)} · ${t('lat')}: ${fmtDec(s.M.lat, 2)}°`,
        `${t('dist')}: ${fmtKm(km)} km (${(pctKm(km) * 100).toFixed(0)}% ${t('enRango')}: ${t('cerca')}→${t('lejos')})`,
        `☉ ${fmtSigno(s.S.lon)}`,
        cfg.local ? `${t('horaLocal')}: ${horaLocal(jd)}` : ''
    ].filter(Boolean).join('<br>');
    chip.innerHTML = `<div class="l1">${l1}</div><div class="det">${det}</div>`;
    chip.classList.toggle('abierto', est.chipAbierto);
}
function horaLocal(jd) {
    try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return `${new Intl.DateTimeFormat(cfg.lang, { dateStyle: 'medium', timeStyle: 'short' }).format(jdADate(jd))} (${tz})`;
    } catch (e) { return ''; }
}

// ---------- Título, tiras, panel ----------
function titulo() {
    const d = new Date(est.ms);
    document.getElementById('orb-titulo').textContent =
        `${t('titulo')} · ${t('meses')[d.getUTCMonth()]} ${d.getUTCFullYear()} · ${cfg.sid ? t('sid') : t('trop')} · UTC`;
}
function pintarStrips() {
    const d0 = new Date(est.ms), mes = d0.getUTCMonth() + 1;
    const dd = document.getElementById('orb-sdia').children;
    for (let off = -2; off <= 2; off++) {
        const d = new Date(Date.UTC(d0.getUTCFullYear(), d0.getUTCMonth(), d0.getUTCDate() + off));
        const m = d.getUTCMonth() + 1;
        dd[off + 2].textContent = off === 0 ? `${d.getUTCDate()}/${m}` : (m !== mes ? `${d.getUTCDate()}/${m}` : d.getUTCDate());
    }
    const hh = document.getElementById('orb-shora').children, h0 = d0.getUTCHours();
    for (let off = -2; off <= 2; off++) {
        const h = h0 + off;
        hh[off + 2].textContent = (h < 0 || h > 23) ? '' : (off === 0 ? `${pad(h)}:${pad(d0.getUTCMinutes())} UTC` : pad(h));
    }
}
function sincronizarUI() {
    const d = new Date(est.ms);
    const m = document.getElementById('orb-mes'), a = document.getElementById('orb-anio');
    if (m) m.value = d.getUTCMonth(); if (a) a.value = d.getUTCFullYear();
    document.querySelectorAll('#orb-modos button').forEach(b => b.classList.toggle('on', b.dataset.modo === cfg.modo));
    const v = document.getElementById('orb-vista'); if (v) v.value = cfg.modo;
}
function ligarStrip(el, mover) {
    let x0 = null, aplicado = 0, movido = false;
    el.addEventListener('pointerdown', e => { x0 = e.clientX; aplicado = 0; movido = false; try { el.setPointerCapture(e.pointerId); } catch (err) { /* nada */ } });
    el.addEventListener('pointermove', e => {
        if (x0 === null) return;
        const dx = e.clientX - x0;
        if (Math.abs(dx) > 6) movido = true;
        const pasos = -Math.trunc(dx / (el.clientWidth * 0.15));
        if (pasos !== aplicado) { mover(pasos - aplicado); aplicado = pasos; }
    });
    el.addEventListener('pointerup', e => {
        if (x0 === null) return;
        if (!movido) {
            const r = el.getBoundingClientRect(), fx = (e.clientX - r.left) / r.width;
            const idx = fx < 0.15 ? 0 : fx < 0.30 ? 1 : fx < 0.70 ? 2 : fx < 0.85 ? 3 : 4;
            if (idx !== 2) mover(idx - 2);
        }
        x0 = null;
    });
    el.addEventListener('pointercancel', () => { x0 = null; });
}
function fijarMs(ms) { if (ms < MIN_MS || ms > MAX_MS) return; est.ms = ms; render(); }
function cambiarDias(delta) { fijarMs(est.ms + delta * 86400000); }
function cambiarHoras(delta) {
    const d = new Date(est.ms), h = Math.max(0, Math.min(23, d.getUTCHours() + delta));
    if (h !== d.getUTCHours()) fijarMs(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), h, 0));
}
function irA(jd) { fijarMs(Math.ceil((jd - J1970) * 1440 - 1e-6) * 60000); }
function saltar(dir) {
    const sel = document.getElementById('orb-evsel');
    let r = null;
    try { r = buscarEvento(sel.value, jdAhora(), dir); } catch (e) { console.error(e); }
    if (r == null) { alert(t('sinEvento')); return; }
    irA(r);
}

function tocar(x, y) {
    const bub = document.getElementById('orb-bub');
    bub.style.display = 'none';
    let mejor = null, md = 1e9;
    hits.forEach(h => { const d = Math.hypot(h.x - x, h.y - y); if (d <= h.r + 8 && d < md) { md = d; mejor = h; } });
    if (!mejor) return;
    bub.textContent = mejor.txt; bub.style.display = 'block';
    const bw = bub.offsetWidth, bh = bub.offsetHeight;
    bub.style.left = Math.max(6, Math.min(W - bw - 6, x - bw / 2)) + 'px';
    bub.style.top = Math.max(40, Math.min(H - bh - 40, y - bh - 18)) + 'px';
    setTimeout(() => { bub.style.display = 'none'; }, 7000);
}

function textosFijos() {
    const sel = document.getElementById('orb-evsel'), cur = sel.value || (cfg.modo === 'lilith' ? 'perigeo' : 'nodoAsc');
    sel.innerHTML = ['perigeo', 'apogeo', 'nodoAsc', 'nodoDesc', 'nueva', 'llena'].map(k => `<option value="${k}">${t(k)}</option>`).join('');
    sel.value = cur;
    const bm = document.querySelectorAll('#orb-modos button');
    bm[0].textContent = '🌑 ' + t('modoL'); bm[1].textContent = '☊ ' + t('modoN');
    document.getElementById('orb-reset').textContent = t('reset');
}
function armarPanel() {
    const p = document.getElementById('orb-panel');
    const meses = t('meses').map((m, i) => `<option value="${i}">${m}</option>`).join('');
    let anios = ''; for (let y = 1801; y <= 2399; y++) anios += `<option value="${y}">${y}</option>`;
    p.innerHTML = `
        <div class="fila"><label>${t('mes')}</label><select id="orb-mes">${meses}</select></div>
        <div class="fila"><label>${t('anio')}</label><select id="orb-anio">${anios}</select></div>
        <div class="fila"><label>${t('vista')}</label><select id="orb-vista"><option value="lilith">${t('modoL')}</option><option value="nodos">${t('modoN')}</option></select></div>
        <div class="fila"><label>${t('zod')}</label><select id="orb-zod"><option value="trop">${t('trop')}</option><option value="sid">${t('sid')}</option></select></div>
        <div class="fila"><label>${t('tamSig')}</label><input type="range" id="orb-tamsig" min="0.7" max="1.6" step="0.05"></div>
        <div class="fila"><label>${t('local')}</label><input type="checkbox" id="orb-local"></div>
        <div class="fila"><label>${t('idioma')}</label><select id="orb-lang"><option value="es">Español</option><option value="en">English</option></select></div>
        <div class="sub">${t('explic')}</div>
        ${t('ex').map(([h, c]) => `<details><summary>${h}</summary>${c}</details>`).join('')}
        <button class="orb-sec" id="orb-about">${cfg.lang === 'es' ? 'ⓘ Acerca de y licencias' : 'ⓘ About & licenses'}</button>
        <button class="orb-sec" id="orb-install">${cfg.lang === 'es' ? '📲 Instalar PWA (opcional)' : '📲 Install PWA (optional)'}</button>
        <button class="salir" id="orb-salir">${t('salir')}</button>`;
    document.getElementById('orb-zod').value = cfg.sid ? 'sid' : 'trop';
    document.getElementById('orb-tamsig').value = cfg.signos;
    document.getElementById('orb-local').checked = cfg.local;
    document.getElementById('orb-lang').value = cfg.lang;
    const cambioFecha = () => {
        const d = new Date(est.ms);
        fijarMs(Date.UTC(+document.getElementById('orb-anio').value, +document.getElementById('orb-mes').value, 1, d.getUTCHours(), d.getUTCMinutes()));
    };
    document.getElementById('orb-mes').addEventListener('change', cambioFecha);
    document.getElementById('orb-anio').addEventListener('change', cambioFecha);
    document.getElementById('orb-vista').addEventListener('change', e => ponerModo(e.target.value));
    document.getElementById('orb-zod').addEventListener('change', e => { cfg.sid = e.target.value === 'sid'; evC = { key: null, list: [] }; guardar(); render(); });
    document.getElementById('orb-tamsig').addEventListener('input', e => { cfg.signos = +e.target.value; guardar(); render(); });
    document.getElementById('orb-local').addEventListener('change', e => { cfg.local = e.target.checked; guardar(); render(); });
    document.getElementById('orb-lang').addEventListener('change', e => { cfg.lang = e.target.value; guardar(); armarPanel(); textosFijos(); render(); });
    document.getElementById('orb-salir').addEventListener('click', salir);
    document.getElementById('orb-about').addEventListener('click', () => document.getElementById('btnAbout').click());
    document.getElementById('orb-install').addEventListener('click', async e => {
        if (window.__pwaInstalar && await window.__pwaInstalar()) return;
        e.target.textContent = cfg.lang === 'es' ? 'Abre la página en tu navegador y usa su menú ⋮ → "Instalar app" (en iPhone: Compartir → "Agregar a pantalla de inicio")' : 'Open the page in your browser and use its ⋮ menu → "Install app" (iPhone: Share → "Add to Home Screen")';
    });
}
function ponerModo(m) {
    cfg.modo = m; est.pitch = 1.1; guardar();
    const sel = document.getElementById('orb-evsel');
    sel.value = m === 'lilith' ? 'perigeo' : 'nodoAsc';
    render();
}
function salir() {
    document.getElementById('orb-panel').classList.remove('abierto');
    document.getElementById('orb-fab').textContent = '☰';
    root.style.display = 'none';
}

// ---------- Inicio ----------
export function iniciarOrbitas() {
    if (root) { root.style.display = 'flex'; ajustarAlto(); return; }
    if (!window.swe) throw new Error('El motor astronómico no está disponible.');
    window.swe.set_sid_mode(window.swe.SE_SIDM_LAHIRI, 0, 0);
    inyectarEstilos();
    const hoy = new Date();
    est.ms = Date.UTC(hoy.getUTCFullYear(), hoy.getUTCMonth(), hoy.getUTCDate());

    root = document.createElement('div');
    root.id = 'orb-root';
    root.innerHTML = `
        <div id="orb-titulo"></div>
        <div id="orb-modos"><button data-modo="lilith"></button><button data-modo="nodos"></button></div>
        <div id="orb-main"><canvas id="orb-cv"></canvas><div id="orb-chip"></div><div id="orb-bub"></div></div>
        <div id="orb-evrow"><button id="orb-prev">◀</button><select id="orb-evsel"></select><button id="orb-next">▶</button></div>
        <div id="orb-strips">
            <div class="orb-strip" id="orb-sdia"><div class="c"></div><div class="c"></div><div class="c"></div><div class="c"></div><div class="c"></div></div>
            <div id="orb-fila-hora">
                <div class="orb-strip" id="orb-shora"><div class="c"></div><div class="c"></div><div class="c"></div><div class="c"></div><div class="c"></div></div>
                <button id="orb-reset"></button>
            </div>
        </div>
        <button id="orb-fab" aria-label="Menu">☰</button>
        <div id="orb-panel"></div>`;
    document.body.appendChild(root);
    cv = document.getElementById('orb-cv'); ctx = cv.getContext('2d');
    root.style.height = window.innerHeight + 'px';
    window.addEventListener('resize', ajustarAlto);
    window.addEventListener('orientationchange', ajustarAlto);

    textosFijos(); armarPanel();
    document.querySelectorAll('#orb-modos button').forEach(b => b.addEventListener('click', () => ponerModo(b.dataset.modo)));
    document.getElementById('orb-prev').addEventListener('click', () => saltar(-1));
    document.getElementById('orb-next').addEventListener('click', () => saltar(1));
    ligarStrip(document.getElementById('orb-sdia'), cambiarDias);
    ligarStrip(document.getElementById('orb-shora'), cambiarHoras);
    document.getElementById('orb-reset').addEventListener('click', () => { const d = new Date(est.ms); fijarMs(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())); });
    document.getElementById('orb-chip').addEventListener('click', () => { est.chipAbierto = !est.chipAbierto; render(); });

    const panel = document.getElementById('orb-panel'), fab = document.getElementById('orb-fab');
    fab.addEventListener('click', () => { const bi = document.getElementById('orb-install'); if (bi) bi.style.display = (window.__pwaVisible && !window.__pwaVisible()) ? 'none' : 'block'; panel.classList.toggle('abierto'); fab.textContent = panel.classList.contains('abierto') ? '✕' : '☰'; });

    // lienzo: tocar un objeto = explicación; arrastrar en vertical inclina la vista (modo nodos)
    let p0 = null, mov = 0, t0 = 0;
    cv.addEventListener('pointerdown', e => { p0 = { x: e.clientX, y: e.clientY }; mov = 0; t0 = Date.now(); try { cv.setPointerCapture(e.pointerId); } catch (err) { /* nada */ } });
    cv.addEventListener('pointermove', e => {
        if (!p0) return;
        const dy = e.clientY - p0.y; mov += Math.abs(dy) + Math.abs(e.clientX - p0.x); p0 = { x: e.clientX, y: e.clientY };
        if (cfg.modo === 'nodos' && mov > 6) { est.pitch = Math.max(0.35, Math.min(1.45, est.pitch + dy * 0.008)); render(); }
    });
    cv.addEventListener('pointerup', e => {
        if (p0 && mov < 8 && Date.now() - t0 < 500) { const r = cv.getBoundingClientRect(); tocar(e.clientX - r.left, e.clientY - r.top); }
        p0 = null;
    });
    cv.addEventListener('pointercancel', () => { p0 = null; });

    cargarTexturas();
    render();
    setTimeout(render, 150);
}

export const _test = { buscar, buscarEvento, estado, evList, geomLilith, phiUnw, edadLuna, fmtSigno, calc, est, cfg, jdADate };
