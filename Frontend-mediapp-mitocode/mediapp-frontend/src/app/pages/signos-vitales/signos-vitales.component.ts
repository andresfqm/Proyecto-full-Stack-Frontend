import { Component, OnInit, ViewChild } from '@angular/core';
import { SignosVitales } from 'src/app/_model/signosVitales';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SignosVitalesService } from 'src/app/_service/signos-vitales.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signos-vitales',
  templateUrl: './signos-vitales.component.html',
  styleUrls: ['./signos-vitales.component.css']
})
export class SignosVitalesComponent implements OnInit {

  cantidad: number = 0;
  displayedColumns = ['idSigno', 'nombres', 'fecha', 'temperatura', 'pulso', 'ritmoRespiratorio', 'acciones'];
  dataSource: MatTableDataSource<SignosVitales>
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private signosService: SignosVitalesService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.signosService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });

    this.signosService.signosCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.signosService.listarPageable(0, 10).subscribe(data => {
      console.log(data);
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(idSigno: number) {
    this.signosService.eliminar(idSigno).subscribe(() => {
      this.signosService.listar().subscribe(data => {
        this.signosService.signosCambio.next(data);
        this.signosService.mensajeCambio.next('SE ELIMINO');
      });
    });
  }

  mostrarMas(e: any) {
    this.signosService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      console.log(data);
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });
  }

}
