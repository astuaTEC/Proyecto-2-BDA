import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from 'src/app/Servicios/notificaciones.service';
import { PeticionesService } from 'src/app/Servicios/peticiones.service';

@Component({
  selector: 'app-busqueda-cliente',
  templateUrl: './busqueda-cliente.component.html',
  styleUrls: ['./busqueda-cliente.component.css']
})
export class BusquedaClienteComponent implements OnInit {

  constructor(private peticiones: PeticionesService, private notificaciones: NotificacionesService) { }

  ngOnInit(): void {
    this.fetchTodosClientes()
    
  }

  selected = ''
  displayedColumns: string[] = ['position', 'name', 'quantity']
  //clients: any[] =  [{id:0,first_name:"JOse", last_name:"Camacho"}, {id:1,first_name:"JOse1", last_name:"Camacho1"}, {id:2,first_name:"JOse2", last_name:"Camacho2"}]
  clients: any[] =  []
  productosCliente: any[] =  []

  // Obtener la lista de todos los clientes
  async fetchTodosClientes(){
    const response: any = await this.peticiones.getTodosClientes();

    for(var cliente of response['result']){
      this.clients.push({
        first_name: cliente['first_name'],
        last_name: cliente['last_name'],
        id: cliente['id']
      })
    }
  }

  // Buscar productos del cliente
  async getClientProducts(first_name: string, last_name: string){
    const response: any = await this.peticiones.productosCliente(first_name, last_name);

    let status = response['ok'];
    let products = response['result'];
    
    if(!status){
      this.notificaciones.showNotification(
        "Error al obtener los productos", 3
      );
      return;
    }else{
      this.actualizarProductos(products)
    }
  }


  actualizarProductos(products: any[]) {
    this.productosCliente = []
    let i = 1;
    for(var product of products){
      this.productosCliente.push({
        position:i,
        name: product['name'],
        quantity: product['quantity']
      })
      i++
    }
  }

  obtenerProductos(){
    if (this.selected){
      let selectedClient = this.clients.find(x => x.id === this.selected)
      this.getClientProducts(selectedClient['first_name'], selectedClient['last_name'])
    }

  }
}
