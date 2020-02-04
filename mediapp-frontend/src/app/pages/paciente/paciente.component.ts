import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/_service/paciente.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  constructor(private pacienteService : PacienteService) { }

  ngOnInit() {
    this.pacienteService.listar().subscribe(data =>{
      console.log(data);
    });
  }

}
