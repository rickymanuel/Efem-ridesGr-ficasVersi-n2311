export function cortarSaltoDeCiclo(datos) {
    if (!datos || datos.length === 0) return datos;
    const resultado = [datos[0]];
    for (let i = 1; i < datos.length; i++) {
        if (datos[i - 1] === null || datos[i] === null) {
            resultado.push(datos[i]);
            continue;
        }
        let diff = datos[i] - datos[i - 1];
        if (diff > 180 || diff < -180) {
            resultado.push(null); 
            resultado.push(datos[i]); 
        } else {
            resultado.push(datos[i]); 
        }
    }
    return resultado;
}