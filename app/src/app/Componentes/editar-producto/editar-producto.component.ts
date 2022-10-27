import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeticionesService } from 'src/app/Servicios/peticiones.service';

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

  // Array con todas las marcas de productos
  marcas: any [] = [];

  constructor(public dialogRef: MatDialogRef<EditarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private peticiones: PeticionesService) { }

  ngOnInit(): void {
    this.nuevoNombre = this.data.nombre;
    this.nuevoPrecio = this.data.precio;
    this.nuevaMarca = this.data.marca;

    this.fetchTodasMarcas();
  }

  // Obtener la lista de todas las marcas
  async fetchTodasMarcas(){
    const response: any = await this.peticiones.getTodasMarcas();

    this.marcas = [];

    for(var marca of response['result']){
      this.marcas.push(marca['nombre'])
    }
  }

}
