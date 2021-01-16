import { Component, OnInit, ViewChild } from '@angular/core';
import { Examen } from './../../_model/examen';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExamenService } from './../../_service/examen.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {
  displayedColumns = ['id', 'nombre', 'acciones'];
  dataSource: MatTableDataSource<Examen>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private examenService: ExamenService,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.examenService.getExamenCambio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort =this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.examenService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2500,
      });
    });

    this.examenService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort =  this.sort;
      this.dataSource.paginator =  this.paginator;
    });
  }

  filtrar(valor: string){
    this.dataSource.filter = valor.trim().toLocaleLowerCase();
  }

  eliminar(examen: Examen){
    this.examenService.eliminar(examen.idExamen).pipe(switchMap(() => {
      return this.examenService.listar();
    })).subscribe(data => {
      this.examenService.setExamenCambio(data);
      this.examenService.setMensajeCambio('Se elimino');
    });
  }
}
