import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paciente } from './../_model/paciente';
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  //permite enterarse de cambios variable reactiva
  //se almacena una nueva lista de pacientes de pues de hacer un GET, PUT O POST
  pacienteCambio = new Subject<Paciente[]>();

  private url: string =`${environment.HOST}/pacientes`;

  constructor(private http: HttpClient) { }


  listar(){
   return this.http.get<Paciente[]>(this.url);
  }

  listarPorId(id: number){
    return this.http.get<Paciente>(`${this.url}/${id}`);
   }

   registrar(paciente: Paciente){
     return this.http.post(this.url, paciente);
   }

   modificar(paciente: Paciente){
    return this.http.put(this.url, paciente);
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`);
   }

}
