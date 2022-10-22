import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {

  // ngModel del nombre del producto
  nombre: string = "";

  // ngModel de la marca del producto
  marca: string = "";

  //ngModel del precio del producto
  precio: number = 0;

  constructor(public dialogRef: MatDialogRef<AgregarProductoComponent>) { }

  ngOnInit(): void {
  }

}
