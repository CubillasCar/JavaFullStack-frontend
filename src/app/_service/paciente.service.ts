import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paciente } from './../_model/paciente';
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';



@Injectable({
  providedIn: 'root'
})
export class PacienteService extends GenericService<Paciente> {

  //permite enterarse de cambios variable reactiva
  //se almacena una nueva lista de pacientes de pues de hacer un GET, PUT O POST
  private pacienteCambio = new Subject<Paciente[]>();
  private mensajeCambio = new Subject<string>();

  
// METODO MEDIANTE GENERICOS
// SE HACE ESTO PARA EN CADA CRUD PUEDA SER MAS FACIL HACER METODOS PARTICULARES
  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/pacientes`
    );
   };

   
   ////////////////////// GET AND SET //////////////////////////

   getPacienteCambio(){
     return this.pacienteCambio.asObservable();
   }

   setPacienteCambio(pacientes: Paciente[]){
     this.pacienteCambio.next(pacientes)
   }

   
   getMensajeCambio(){
     return this.mensajeCambio.asObservable();
   }

   setMensajeCambio(mensaje: string){
     return this.mensajeCambio.next(mensaje);
   }
   
//METODO MANUAL
   // private url: string =`${environment.HOST}/pacientes`;
/*
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
*/

}
