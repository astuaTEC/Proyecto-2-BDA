import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent implements OnInit {


  // ngModel para el nombre del nuevo cliente
  nombre: string = "";

  //ngModel para el apellido del nuevo cliente
  apellido: string = ""

  constructor(public dialogRef: MatDialogRef<AgregarClienteComponent>) {}

  ngOnInit(): void {
  }

}
