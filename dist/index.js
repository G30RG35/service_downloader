"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const node_cron_1 = __importDefault(require("node-cron"));
// URL de la página web que deseas descargar
const url = 'https://www.365informativo.com/';
// Nombre de la carpeta donde se guardarán las páginas descargadas
const downloadFolder = path.join(__dirname, 'downloads');
// Crear la carpeta si no existe
if (!fs.existsSync(downloadFolder)) {
    fs.mkdirSync(downloadFolder, { recursive: true });
}
// Función para descargar la página web
function descargarPagina() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, node_fetch_1.default)(url);
            const data = yield response.text();
            const fileName = `pagina-descargada-${new Date().toISOString().split('T')[0]}.html`;
            const filePath = path.join(downloadFolder, fileName);
            fs.writeFileSync(filePath, data);
            console.log('Página descargada y guardada exitosamente en', filePath);
        }
        catch (error) {
            console.error('Error al descargar la página:', error);
        }
    });
}
// Función para verificar si es un día válido
function esDiaValido() {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    return ([1, 15, 30, 31].includes(day) ||
        (month === 2 && (day === 28 || (day === 29 && now.getFullYear() % 4 === 0))));
}
// Programar la tarea para que se ejecute a las 10 PM
node_cron_1.default.schedule('0 22 * * *', () => {
    if (esDiaValido()) {
        descargarPagina();
    }
});
console.log('Servicio de descarga de página iniciado...');
