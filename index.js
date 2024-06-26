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
const node_cron_1 = __importDefault(require("node-cron"));
// URL de la página web que deseas descargar
const url = 'https://example.com';
// Función para descargar la página web
function descargarPagina() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, node_fetch_1.default)(url);
            const data = yield response.text();
            // Guardar la página web en un archivo
            const fileName = `pagina-descargada-${new Date().toISOString().split('T')[0]}.html`;
            fs.writeFileSync(fileName, data);
            console.log('Página descargada y guardada exitosamente en', fileName);
        }
        catch (error) {
            console.error('Error al descargar la página:', error);
        }
    });
}
// Función para programar la descarga
function programarDescarga() {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    if ([1, 15, 30, 31].includes(day) || (month === 2 && (day === 28 || (day === 29 && now.getFullYear() % 4 === 0)))) {
        descargarPagina();
    }
}
// Programar la tarea para que se ejecute a las 10 PM todos los días
node_cron_1.default.schedule('0 22 * * *', programarDescarga);
console.log('Servicio de descarga de página iniciado...');
