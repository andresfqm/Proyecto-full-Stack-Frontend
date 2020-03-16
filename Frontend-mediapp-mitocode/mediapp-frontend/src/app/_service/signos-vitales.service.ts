import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SignosVitales } from '../_model/signosVitales';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignosVitalesService {
 signosCambio = new Subject<SignosVitales[]>();
 mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/signos-vitales`;

  constructor(private http : HttpClient) { }

  listar(){
    return this.http.get<SignosVitales[]>(this.url);
  }

  listarPageable(p: number, s:number){
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  listarPorId(idSigno: number) {
    return this.http.get<SignosVitales>(`${this.url}/${idSigno}`);
  }

  registrar(signosVitales: SignosVitales) {
    return this.http.post(this.url, signosVitales);
  }

  modificar(signosVitales: SignosVitales) {
    return this.http.put(this.url, signosVitales);
  }

  eliminar(idSigno: number) {
    return this.http.delete(`${this.url}/${idSigno}`);
  }
}
