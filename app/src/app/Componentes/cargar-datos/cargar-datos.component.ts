import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cargar-datos',
  templateUrl: './cargar-datos.component.html',
  styleUrls: ['./cargar-datos.component.css']
})
export class CargarDatosComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CargarDatosComponent>) { }

  // ngModels para los archivos que se deben cargar
  nombre1: string = "Productos";
  link1: string = "";

  nombre2: string = "Clientes";
  link2: string = "";


  nombre3: string = "Marcas";
  link3: string = "";


  nombre4: string = "Compras";
  link4: string = "";



  ngOnInit(): void {
  }

}
