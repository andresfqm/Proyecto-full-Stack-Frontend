import { Component, OnInit, Inject } from '@angular/core';
import { Paciente } from 'src/app/_model/paciente';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PacienteService } from 'src/app/_service/paciente.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-paciente-dialogo',
  templateUrl: './paciente-dialogo.component.html',
  styleUrls: ['./paciente-dialogo.component.css']
})
export class PacienteDialogoComponent implements OnInit {
  paciente: Paciente;

  constructor(
    private dialogRef: MatDialogRef<PacienteDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Paciente,
    private pacienteService : PacienteService
  ) { }

  ngOnInit(): void {

    this.paciente = new Paciente();
    this.paciente.idPaciente = this.data.idPaciente;
    this.paciente.nombres = this.data.nombres;
    this.paciente.apellidos = this.data.apellidos;
    this.paciente.dni = this.data.dni;
    this.paciente.direccion = this.data.direccion;
    this.paciente.telefono = this.data.telefono;
    this.paciente.email = this.data.email;

  }
  cancelar() {
    this.dialogRef.close();
  }

  operar(){
    if (this.paciente!= null) {
      //MODIFICAR
      //BUENO PRACTICA
      this.pacienteService.modificar(this.paciente).pipe(switchMap( () => {
        return this.pacienteService.listar();
      })).subscribe(data => {
        this.pacienteService.pacienteCambio.next(data);
        this.pacienteService.mensajeCambio.next('SE MODIFICO');
      });      
    }else{
      //REGISTRAR      
      //PRACTICA COMUN
      this.pacienteService.registrar(this.paciente).subscribe(() => {
        this.pacienteService.listar().subscribe(data => {
          this.pacienteService.pacienteCambio.next(data);
          this.pacienteService.mensajeCambio.next('SE REGISTRO');
        });
      });
    }
    this.dialogRef.close();
  }

}
