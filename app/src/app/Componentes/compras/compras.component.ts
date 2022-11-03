import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/Interfaces/cliente';
import { ProductoCompra } from 'src/app/Interfaces/producto-compra';
import { NotificacionesService } from 'src/app/Servicios/notificaciones.service';
import { PeticionesService } from 'src/app/Servicios/peticiones.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  constructor(private peticiones: PeticionesService,
    private notificaciones: NotificacionesService) { }

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
    this.fetchClientesProductos();
    this.idClienteSeleccionado = -1;
  }

  ngAfterViewInit() {
    this.fetchClientesProductos();
  }

  // Obtener la lista de todos los clientes
  async fetchClientesProductos(){
    const responseC: any = await this.peticiones.getTodosClientes();
    this.clientes = [];
    for(let cliente of responseC['result']){
      this.clientes.push({
        first_name: cliente['first_name'],
        last_name: cliente['last_name'],
        id: cliente['id']
      })
    }
    this.dataSourceClientes = this.clientes;

    const responseP: any = await this.peticiones.getTodosProductos();
    this.productos = [];
    for(let producto of responseP['result']){
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
  searchClientes(event: any): void {
    let value = event.target.value;
    this.dataSourceClientes = this.clientes.filter((target) => target.first_name.toLowerCase().includes(value) || target.last_name.toLowerCase().includes(value));
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

  // Crear un nuevo cliente
  async crearCompra(json_array: any[]){
    const response: any = await this.peticiones.NewCompra(json_array);

    let status = response['ok'];
    let response_message = response['msg'];
    
    if(!status){
      this.notificaciones.showNotification(
        response_message, 3
      );
      return;
      }
      this.notificaciones.showNotification(
        'Se ha registrado la compra', 3);
  }

  // Registrar la compra de productos para un cliente selecionado
  registrarCompra(){
    // Primero verificar que se haya seleccionado un cliente de la lista
    if (this.idClienteSeleccionado == -1){
      return;
    }
    // Segundo, verificar que se haya comprado al menos un producto
    let compradoFlag: boolean = false;
    this.productos.forEach(function (producto){
      if (!compradoFlag && producto.cantidad > 0){
        compradoFlag = true;
      }
    });
    if (!compradoFlag){
      return;
    }
    const compras_array: any = [];
    const idCliente = this.idClienteSeleccionado;
    this.productos.forEach(function (producto){
      if (producto.cantidad > 0){
        compras_array.push(
          {
            "idCliente": idCliente.toString(),
            "idProducto": producto.id.toString(),
            "cantidad": producto.cantidad.toString()
          }
        )
      }
    });

    this.crearCompra(compras_array);    
  }

  limpiar(){
    this.idClienteSeleccionado = -1;
    this.fetchClientesProductos();
  }


}
