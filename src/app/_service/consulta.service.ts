import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConsultaListaExamenDTO } from './../_dto/consultaListaExamenDto';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService extends GenericService<ConsultaService>{


 constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/consultas`);
  }

  registrarTransaccion(consultaDTO: ConsultaListaExamenDTO){
    return this.http.post(this.url, consultaDTO);
  }
}
