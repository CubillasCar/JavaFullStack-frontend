import { Injectable } from '@angular/core';
import { Examen } from './../_model/examen';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamenService extends GenericService<Examen> {

  private examenCambio = new Subject<Examen[]>();

  private mensajeCambio = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/examenes`
    );
   }

   //get Subjects

   getExamenCambio(){
    return this.examenCambio.asObservable();
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  //set Subjects

  setExamenCambio(examenes: Examen[]){
    this.examenCambio.next(examenes)
  }

  setMensajeCambio(mensaje: string){
    return this.mensajeCambio.next(mensaje);
  }
}
