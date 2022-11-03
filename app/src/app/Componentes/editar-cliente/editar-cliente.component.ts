import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  //ngModel del nuevo nombre del cliente
  nuevoNombre: string = "";

  //ngModel del nuevo apellido del cliente
  nuevoApellido: string = "";

  constructor(public dialogRef: MatDialogRef<EditarClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.nuevoNombre = this.data.nombre;
    this.nuevoApellido = this.data.apellido;

  }

}
