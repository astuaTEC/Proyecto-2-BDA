import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/Interfaces/cliente';
import { ProductoCompra } from 'src/app/Interfaces/producto-compra';
import { PeticionesService } from 'src/app/Servicios/peticiones.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  constructor(private peticiones: PeticionesService) { }

  // Cliente seleccionado para la compra de los productos
  idClienteSeleccionado: number = -1;

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
    this.fetchTodosClientes();
    this.fetchTodosProductos();
    this.idClienteSeleccionado = -1;
  }

  // Obtener la lista de todos los clientes
  async fetchTodosClientes(){
    const response: any = await this.peticiones.getTodosClientes();

    this.clientes = [];

    for(var cliente of response['result']){
      this.clientes.push({
        first_name: cliente['first_name'],
        last_name: cliente['last_name'],
        id: cliente['id']
      })
    }
    this.dataSourceClientes = this.clientes;
  }

  // Permite filtrar los clientes por nombre
  searchClientes(event: any): void {
    let value = event.target.value;
    this.dataSourceClientes = this.clientes.filter((target) => target.first_name.toLowerCase().includes(value) || target.last_name.toLowerCase().includes(value));
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
        precio: producto['precio'],
        cantidad: 0
      })
    }
    this.dataSourceProductos = this.productos;
  }

  // Permite filtrar los clientes por nombre
  searchProductos(event: any): void {
    let value = event.target.value;
    this.dataSourceProductos = this.productos.filter((target) => target.nombre.toLowerCase().includes(value) || target.marca.toLowerCase().includes(value));
  }

  // Seleccionar un cliente para asociar los productos
  seleccionarCliente(id: number){
    this.idClienteSeleccionado = id;
  }

  // Incrementar la cantidad de un producto
  incrementarCantidadProducto(id: number){
    this.productos.forEach(function (producto){
      if (producto.id == id){
        producto.cantidad++;
      }
    });
  }

  // Decrementar la cantidad de un producto
  decrementarCantidadProducto(id: number){
    this.productos.forEach(function (producto){
      if (producto.id == id && producto.cantidad > 0){
        producto.cantidad--;
      }
    });
  }

  // Registrar la compra de productos para un cliente selecionado
  registrarCompra(){
    // Primero verificar que se haya seleccionado un cliente de la lista
    if (this.idClienteSeleccionado == -1){
      return;
    }
    // Segundo, verificar que se haya comprado al menos un producto
    var compradoFlag: boolean = false;
    this.productos.forEach(function (producto){
      if (!compradoFlag && producto.cantidad > 0){
        compradoFlag = true;
      }
    });
    if (!compradoFlag){
      return;
    }
    let compras_array: any = [];
    let idCliente = this.idClienteSeleccionado;
    this.productos.forEach(function (producto){
      if (producto.cantidad > 0){
        compras_array.push(
          {
            "idCliente": idCliente,
            "idProducto": producto.id,
            "cantidad": producto.cantidad
          }
        )
      }
    });

    console.log(compras_array);
    
  }


}
