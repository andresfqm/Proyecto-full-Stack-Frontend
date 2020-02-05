import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';

// Configuramos nuestras reglas de navegación
const routes: Routes = [
  {
    path: 'paciente', component: PacienteComponent, children: [
      { path: 'edicion/:id', component: PacienteEdicionComponent }
    ]
  },
  { path: 'medico', component: MedicoComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
