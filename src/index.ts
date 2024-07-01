import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import cron from 'node-cron';

// URL de la página web que deseas descargar y capturar
const url: string =process.env.URL || 'https://www.google.com';
// Nombre de la carpeta donde se guardarán las páginas descargadas y capturas
const downloadFolder: string = path.join(__dirname, 'downloads');

// Crear la carpeta si no existe
if (!fs.existsSync(downloadFolder)) {
    fs.mkdirSync(downloadFolder, { recursive: true });
}

// Función para descargar la página web y tomar captura de pantalla
async function descargarPaginaYCaptura(): Promise<void> {
    
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser', // Ajusta esta ruta según sea necesario
        headless: true, // Puedes dejar esto en true para despliegues en servidor
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    try {
        await page.goto(url, { waitUntil: 'networkidle2' });
        await page.waitForSelector('body');
        // Tomar una captura de pantalla de la página
        const screenshotPath = path.join(downloadFolder, `captura-${new Date().toISOString().split('T')[0]}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true});
        console.log('Captura de pantalla guardada exitosamente en', screenshotPath);

    } catch (error) {
        console.error('Error al descargar la página o tomar la captura:', error);
    } finally {
        await browser.close();
    }
}

// Función para verificar si es un día válido
function esDiaValido(): boolean {
    const now: Date = new Date();
    const day: number = now.getDate();
    const month: number = now.getMonth() + 1;

    return (
        [1, 15, 30, 31].includes(day) || 
        (month === 2 && (day === 28 || (day === 29 && now.getFullYear() % 4 === 0)))
    );
}

// Programar la tarea para que se ejecute a las 10 PM
cron.schedule('0 22 * * *', () => {
// cron.schedule('4 11 * * *', () => {

    if (esDiaValido()) {
        descargarPaginaYCaptura();
    }
});

descargarPaginaYCaptura();

console.log('Servicio de descarga de página y captura iniciado...');
