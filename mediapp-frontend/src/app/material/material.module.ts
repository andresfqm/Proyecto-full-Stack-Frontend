import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule, MatToolbarModule, MatButtonModule, MatDividerModule, MatMenuModule, MatIconModule} from '@angular/material';
//import {MatToolbarModule} from '@angular/material/toolbar';
//import {MatButtonModule} from '@angular/material/button';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    MatIconModule
  ],
  // Utilizamos el siguiente arreglo para poder usar los componentes afuera de la carpeta
  exports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class MaterialModule { }
