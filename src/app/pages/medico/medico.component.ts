import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Medico } from 'src/app/_model/medico';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MedicoService } from './../../_service/medico.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})


export class MedicoComponent implements OnInit {

  displayedColumns =['idMedico','nombres','apellidos','cmp','acciones'];
  dataSource: MatTableDataSource<Medico>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private medicoService: MedicoService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  //pagina de carga
  ngOnInit(): void {

    this.medicoService.getMedicoCambio().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    
    this.medicoService.getMensajeCambio().subscribe(data =>{
      this.snackBar.open(data, 'AVISO', {duration: 3000})
    })

    this.medicoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }); 
  }

  filtrar(valor: string){
    this.dataSource.filter = valor.trim().toLowerCase();
}

eliminar(medico: Medico){
  this.medicoService.eliminar(medico.idMedico).pipe(switchMap(()=> {
    return this.medicoService.listar()
  })).subscribe(data => {
    this.medicoService.setMedicoCambio(data);
    this.medicoService.setMensajeCambio('SE ELIMINO');
  });
}

abrirDialogo(medico?: Medico) {

}

}
