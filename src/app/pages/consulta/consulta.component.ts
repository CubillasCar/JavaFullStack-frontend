import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Medico } from 'src/app/_model/medico';
import { Paciente } from './../../_model/paciente';
import { PacienteService } from './../../_service/paciente.service';
import { MedicoService } from './../../_service/medico.service';
import { Especialidad } from 'src/app/_model/especialidad';
import { EspecialidadService } from './../../_service/especialidad.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  pacientes: Paciente[];
  pacientes$: Observable<Paciente[]>;
  medicos$: Observable<Medico[]>
  especialidad$: Observable<Especialidad[]>

  idPacienteSeleccionado: number;
  idMedicoSeleccionado: number;
  idEspecialidadSelecionado: number;

  maxFecha: Date = new Date();
  fechaSeleccionada: Date = new Date();

  constructor(
   private pacienteService: PacienteService,
   private medicoService: MedicoService,
   private especialidadService: EspecialidadService
   ) { }

  ngOnInit(): void {
   /*this.pacienteService.listar().subscribe(data => {
    this.pacientes=data;
   })*/
   
   this.pacientes$= this.pacienteService.listar();
   this.medicos$= this.medicoService.listar();
   this.especialidad$= this.especialidadService.listar();
  }

  cambieFecha(e: any){
    console.log(e);
  }
}
