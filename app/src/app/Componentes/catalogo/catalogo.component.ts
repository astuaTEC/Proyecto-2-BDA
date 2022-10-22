import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from 'src/app/Interfaces/producto';
import { AgregarProductoComponent } from '../agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from '../editar-producto/editar-producto.component';
import { EliminarProductoComponent } from '../eliminar-producto/eliminar-producto.component';



const ELEMENT_DATA: Producto[] = [
  {id: 0, nombre: 'Premium Weed', marca: 'Juanki Loko Inc', precio: 2000},
  {id: 1, nombre: 'Cerveza Imperial 1L', marca: 'Imperial', precio: 1750},
  {id: 2, nombre: 'Cerveza babaria 320 mL', marca: 'Babaria', precio: 800},



]

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  // Mat Table settings
  displayedColumnProductos: string[] = ['ID','Nombre', 'Marca', 'Precio', 'Editar', 'Eliminar'];
  dataSourceProductos: Producto[] = ELEMENT_DATA;

  ngOnInit(): void {
  }

  // Abrir el Dialog de Agregar Producto
  openAgregarProducto(): void {
    const dialogRef = this.dialog.open(AgregarProductoComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      //let nombreCliente = result[0];
      //let apellidoCliente = result[1];
      console.log(result);
    });
  }

  // Abrir el Dialog de Editar Producto
  openEditarProducto(id: number, nombre: string, marca: string, precio: number): void {
    const dialogRef = this.dialog.open(EditarProductoComponent, {
      width: '400px',
      data: {nombre: nombre, marca: marca, precio: precio},
    });

    dialogRef.afterClosed().subscribe(result => {
      //let nuevoNombreCliente = result[0];
      //let nuevoApellidoCliente = result[1];
      console.log(result);
    });
  }
  // Abrir el Dialog de Eliminar Producto
  openEliminarProducto(id: number, nombre: string): void {
    const dialogRef = this.dialog.open(EliminarProductoComponent, {
      width: '400px',
      data: {nombre: nombre},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
