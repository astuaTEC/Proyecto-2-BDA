import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/Interfaces/cliente';
import { ProductoCompra } from 'src/app/Interfaces/producto-compra';


const ELEMENT_DATA_CLIENTES: Cliente[] = [
  {id: 0, first_name: 'Kevin', last_name: 'Acevedo'},
  {id: 1, first_name: 'Saymon', last_name: 'Astua'},
  {id: 2, first_name: 'Julian', last_name: 'Camacho'},
  {id: 3, first_name: 'Edgar', last_name: 'Solis'},
  {id: 4, first_name: 'Kevin', last_name: 'Viquez'},
  {id: 5, first_name: 'Esteban', last_name: 'Alvarado'},
  {id: 6, first_name: 'Kevin', last_name: 'Acevedo'},
  {id: 7, first_name: 'Kevin', last_name: 'Acevedo'},
  {id: 8, first_name: 'Kevin', last_name: 'Acevedo'},
  {id: 9, first_name: 'Kevin', last_name: 'Acevedo'},
  {id: 10, first_name: 'Kevin', last_name: 'Acevedo'},
  {id: 11, first_name: 'Kevin', last_name: 'Acevedo'},
  {id: 12, first_name: 'Kevin', last_name: 'Acevedo'},
  {id: 13, first_name: 'Kevin', last_name: 'Acevedo'},
  {id: 14, first_name: 'Kevin', last_name: 'Acevedo'},


];


const ELEMENT_DATA_PRODUCTOS: ProductoCompra[] = [
  {id: 0, nombre: 'Premium Weed', marca: 'Juanki Loko Inc', precio: 2000, cantidad:0},
  {id: 1, nombre: 'Cerveza Imperial 1L', marca: 'Imperial', precio: 1750, cantidad:0},
  {id: 2, nombre: 'Cerveza babaria 320 mL', marca: 'Babaria', precio: 800, cantidad:0},
  {id: 3, nombre: 'Premium Weed', marca: 'Juanki Loko Inc', precio: 2000, cantidad:0},
  {id: 4, nombre: 'Cerveza Imperial 1L', marca: 'Imperial', precio: 1750, cantidad:0},
  {id: 5, nombre: 'Cerveza babaria 320 mL', marca: 'Babaria', precio: 800, cantidad:0},
  {id: 6, nombre: 'Premium Weed', marca: 'Juanki Loko Inc', precio: 2000, cantidad:0},
  {id: 7, nombre: 'Cerveza Imperial 1L', marca: 'Imperial', precio: 1750, cantidad:0},
  {id: 8, nombre: 'Cerveza babaria 320 mL', marca: 'Babaria', precio: 800, cantidad:0}
]

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  constructor() { }

  // ngModel para el valor del search de clientes
  searchTermCliente: string = "";

  // Array que contiene todos los clientes
  clientes: Cliente[] = [];

  // Mat Table settings
  displayedColumnClientes: string[] = ['ID','Nombre', 'Apellido', 'Seleccionar'];
  dataSourceClientes: Cliente[] = [];


  // ngModel del valor de search
  searchTermProductos: string = "";

  // Arreglo de todos los productos
  productos: ProductoCompra[] = [];

  // Mat Table settings
  displayedColumnProductos: string[] = ['ID','Nombre', 'Marca', 'Precio', 'Cantidad', 'Add', 'Remove'];
  dataSourceProductos: ProductoCompra[] = [];

  ngOnInit(): void {
    this.fetchClientes();
    this.fetchProductos();
  }


  // Fecth de todos los clientes
  fetchClientes() {
    this.clientes = ELEMENT_DATA_CLIENTES;
    this.dataSourceClientes = this.clientes;
  }

  // Permite filtrar los clientes por nombre
  searchClientes(event: any): void {
    let value = event.target.value;
    this.dataSourceClientes = this.clientes.filter((target) => target.first_name.toLowerCase().includes(value) || target.last_name.toLowerCase().includes(value));
  }


  // Fecth de todos los clientes
  fetchProductos() {
    this.productos = ELEMENT_DATA_PRODUCTOS;
    this.dataSourceProductos = this.productos;
  }

  // Permite filtrar los clientes por nombre
  searchProductos(event: any): void {
    let value = event.target.value;
    this.dataSourceProductos = this.productos.filter((target) => target.nombre.toLowerCase().includes(value) || target.marca.toLowerCase().includes(value));
  }

}
