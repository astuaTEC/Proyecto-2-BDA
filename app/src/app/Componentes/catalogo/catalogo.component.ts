import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from 'src/app/Interfaces/producto';
import { NotificacionesService } from 'src/app/Servicios/notificaciones.service';
import { PeticionesService } from 'src/app/Servicios/peticiones.service';
import { AgregarProductoComponent } from '../agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from '../editar-producto/editar-producto.component';
import { EliminarProductoComponent } from '../eliminar-producto/eliminar-producto.component';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  constructor(private dialog: MatDialog, private peticiones: PeticionesService,
    private notificaciones: NotificacionesService) { }

  // ngModel del valor de search
  searchTerm: string = "";

  // Arreglo de todos los productos
  productos: Producto[] = [];

  // Mat Table settings
  displayedColumnProductos: string[] = ['ID','Nombre', 'Marca', 'Precio', 'Editar', 'Eliminar'];
  dataSourceProductos: Producto[] = [];

  ngOnInit(): void {
    this.fetchTodosProductos();
  }

  // Abrir el Dialog de Agregar Producto
  openAgregarProducto(): void {
    const dialogRef = this.dialog.open(AgregarProductoComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      let nombre = result[0];
      let marca = result[1];
      let precio = result[2];
      this.crearProducto(nombre, marca, precio);
      
    });
  }

  // Abrir el Dialog de Editar Producto
  openEditarProducto(id: number, nombre: string, marca: string, precio: number): void {
    const dialogRef = this.dialog.open(EditarProductoComponent, {
      width: '400px',
      data: {nombre: nombre, marca: marca, precio: precio},
    });

    dialogRef.afterClosed().subscribe(result => {
      let nuevoNombre = result[0];
      let nuevaMarca = result[1];
      let nuevoPrecio = result[2];
      this.actualizarProducto(id, nuevoNombre, nuevaMarca, nuevoPrecio)
    });
  }
  // Abrir el Dialog de Eliminar Producto
  openEliminarProducto(id: number, nombre: string): void {
    const dialogRef = this.dialog.open(EliminarProductoComponent, {
      width: '400px',
      data: {nombre: nombre},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.eliminarProducto(id);
    });
  }

  // Permite filtrar los clientes por nombre
  search(event: any): void {
    let value = event.target.value;
    this.dataSourceProductos = this.productos.filter((target) => target.nombre.toLowerCase().includes(value) || target.marca.toLowerCase().includes(value));
  }

  // Obtener la lista de todos los productos
  async fetchTodosProductos(){
    const response: any = await this.peticiones.getTodosProductos();

    this.productos = [];

    for(var producto of response['result']){
      this.productos.push({
        nombre: producto['nombre'],
        marca: producto['marca'],
        id: producto['id'],
        precio: producto['precio']
      })
    }
    this.dataSourceProductos = this.productos;
  }

  // Crear un nuevo producto
  async crearProducto(nombre: string, marca: string, precio: number){
    const response: any = await this.peticiones.NewProducto(nombre, marca, precio);

    let status = response['ok'];
    let response_message = response['msg'];
    
    if(!status){
      this.notificaciones.showNotification(
        response_message, 3
      );
      return;
      }
      this.fetchTodosProductos();
      this.notificaciones.showNotification(
        'Se ha creado un nuevo producto', 3);
  }


  // Actualizar un producto existente
  async actualizarProducto(id: number, nombre: string, marca: string, precio: number){
    const response: any = await this.peticiones.updateProducto(id, nombre, marca, precio);

    let status = response['ok'];
    let response_message = response['msg'];
    
    if(!status){
      this.notificaciones.showNotification(
        response_message, 3
      );
      return;
      }
      this.fetchTodosProductos();
      this.notificaciones.showNotification(
        'Se ha actualizado el producto', 3);
  }

  // Eliminar un producto por ID
  async eliminarProducto(id:number){
    const response: any = await this.peticiones.deleteProductoByID(id);

    let status = response['ok'];
    let response_message = response['msg'];
    
    if(!status){
      this.notificaciones.showNotification(
        response_message, 3
      );
      return;
      }
      this.fetchTodosProductos();
      this.notificaciones.showNotification(
        'Se ha eliminado un producto', 3);
  }

}
