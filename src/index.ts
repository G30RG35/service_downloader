import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';
import cron from 'node-cron';

// URL de la página web que deseas descargar
const url: string = 'https://www.365informativo.com/';
// Nombre de la carpeta donde se guardarán las páginas descargadas
const downloadFolder: string = path.join(__dirname, 'downloads');

// Crear la carpeta si no existe
if (!fs.existsSync(downloadFolder)) {
    fs.mkdirSync(downloadFolder, { recursive: true });
}

// Función para descargar la página web
async function descargarPagina(): Promise<void> {
    try {
        const response = await fetch(url);
        const data = await response.text();
        const fileName = `pagina-descargada-${new Date().toISOString().split('T')[0]}.html`;
        const filePath = path.join(downloadFolder, fileName);
        fs.writeFileSync(filePath, data);
        console.log('Página descargada y guardada exitosamente en', filePath);
    } catch (error) {
        console.error('Error al descargar la página:', error);
    }
}

// Función para verificar si es un día válido
function esDiaValido(): boolean {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;

    return (
        [1, 15, 30, 31].includes(day) || 
        (month === 2 && (day === 28 || (day === 29 && now.getFullYear() % 4 === 0)))
    );
}

// Programar la tarea para que se ejecute a las 10 PM
cron.schedule('0 22 * * *', () => {
    if (esDiaValido()) {
        descargarPagina();
    }
});

console.log('Servicio de descarga de página iniciado...');