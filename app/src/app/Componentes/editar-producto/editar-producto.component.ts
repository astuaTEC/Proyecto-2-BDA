import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  //ngModel del nuevo nombre del producto
  nuevoNombre: string = "";

  //ngModel de la marca del producto
  nuevaMarca: string = "";

  //ngModel del nuevo precio del producto
  nuevoPrecio: number = 0;

  constructor(public dialogRef: MatDialogRef<EditarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.nuevoNombre = this.data.nombre;
    this.nuevaMarca = this.data.marca;
    this.nuevoPrecio = this.data.precio;
  }

}
