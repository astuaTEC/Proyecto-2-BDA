import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PeticionesService } from 'src/app/Servicios/peticiones.service';

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

  // Arreglo con todas las marcas de productos
  marcas: any[] = [];

  constructor(public dialogRef: MatDialogRef<AgregarProductoComponent>,
    private peticiones: PeticionesService) { }

  ngOnInit(): void {
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
