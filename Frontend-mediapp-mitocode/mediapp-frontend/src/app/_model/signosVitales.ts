import { Paciente } from './paciente';

export class SignosVitales{
    idSigno: number;
    paciente: Paciente;
    fecha: string;
    temperatura: string;
    pulso: string;
    ritmoRespiratorio: string;
}