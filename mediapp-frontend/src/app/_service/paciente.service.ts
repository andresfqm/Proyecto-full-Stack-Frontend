import { Injectable } from '@angular/core';
import { environment} from './../../environments/environment';
import { HttpClient} from '@angular/common/http';
import { Paciente } from '../_model/paciente';

// Injeccion de independencias en angular v 6 y superior
@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  url: string = `${environment.HOST}/pacientes`;

  // pasamos en el constructor el HttpClient para consumir los servicios rest
  constructor(private http : HttpClient) { }

  listar(){
    return this.http.get<Paciente[]>(this.url);
  }
}
