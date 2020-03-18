import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SignosVitalesService } from 'src/app/_service/signos-vitales.service';
import { SignosVitales } from 'src/app/_model/signosVitales';
import { Paciente } from 'src/app/_model/paciente';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PacienteService } from 'src/app/_service/paciente.service';
import { PacienteDialogoComponent } from '../../paciente/paciente-dialogo/paciente-dialogo.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-signos-vitales-edicion',
  templateUrl: './signos-vitales-edicion.component.html',
  styleUrls: ['./signos-vitales-edicion.component.css']
})
export class SignosVitalesEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;
  pacienteSeleccionado: Paciente;
  pacientesFiltrados: Observable<any[]>;
  pacientes: Paciente[] = [];
  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();

  habilitar : boolean;

  myControlPaciente: FormControl = new FormControl();

  constructor(   
    private route: ActivatedRoute,
    private router : Router,
    private signosService : SignosVitalesService,
    private pacienteService: PacienteService,
    private dialog : MatDialog) { }

  ngOnInit(): void {
    this.habilitar = true;
    this.form = new FormGroup({
      'id' : new FormControl(0),
      'paciente': this.myControlPaciente,
      'fecha': new FormControl(new Date()),
      'temperatura': new FormControl(''),
      'pulso': new FormControl(''),
      'ritmoRespiratorio': new FormControl('')
    });

    this.listarPacientes();

    this.pacientesFiltrados = this.myControlPaciente.valueChanges.pipe(map(val => this.filtrarPacientes(val)));

    this.route.params.subscribe((params : Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });

    this.pacienteService.pacienteCambio.subscribe(data => {
      this.listarPacientes();
      });

  }

  filtrarPacientes(val : any){    
    if (val != null && val.idPaciente > 0) {
      return this.pacientes.filter(option =>
        option.nombres.toLowerCase().includes(val.nombres.toLowerCase()) || option.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()));
    } else {
      return this.pacientes.filter(option =>
        option.nombres.toLowerCase().includes(val.toLowerCase()) || option.apellidos.toLowerCase().includes(val.toLowerCase()));
    }
  }

  listarPacientes() {
    
    this.pacienteService.listar().subscribe(data => { 
      this.pacientes = data;
    });
  }

  get f() { return this.form.controls; }

  operar(){

    if(this.form.invalid){
      return;
    }

    let signosVitales = new SignosVitales();
    signosVitales.idSigno = this.form.value['id'];
    signosVitales.paciente = this.form.value['paciente'];
    signosVitales.fecha = this.form.value['fecha'];
    signosVitales.temperatura = this.form.value['temperatura'];
    signosVitales.pulso = this.form.value['pulso'];
    signosVitales.ritmoRespiratorio = this.form.value['ritmoRespiratorio'];

    if(this.edicion){
      this.signosService.modificar(signosVitales).subscribe( ()=> {
        this.signosService.listar().subscribe(data => {
          this.signosService.signosCambio.next(data);
          this.signosService.mensajeCambio.next('SE MODIFICO');
        });
      });
    }else{
      this.signosService.registrar(signosVitales).subscribe( () => {
        this.signosService.listar().subscribe(data => {
          this.signosService.signosCambio.next(data);
          this.signosService.mensajeCambio.next('SE REGISTRO');
        });
      });
    }
    
    this.router.navigate(['signos-vitales']);
  }

  initForm(){
    if(this.edicion){
      this.habilitar = false;
      this.signosService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idSigno),
          'paciente': new FormControl(data.paciente),
          'fecha': new FormControl(data.fecha),
          'temperatura': new FormControl(data.temperatura),
          'pulso': new FormControl(data.pulso),
          'ritmoRespiratorio': new FormControl(data.ritmoRespiratorio)
        });
      });
    }
  }

  mostrarPaciente(val : Paciente){
    return val ? `${val.nombres} ${val.apellidos}` : val;
  }

  seleccionarPaciente(e: any) {
    this.pacienteSeleccionado = e.option.value;
  }

  abrirDialogo(paciente? : Paciente){
    let med = paciente != null ? paciente : new Paciente();
    this.dialog.open(PacienteDialogoComponent, {
      width: '250px',
      data: med
    });
  }


}
