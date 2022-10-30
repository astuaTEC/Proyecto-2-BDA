import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from 'src/app/Servicios/notificaciones.service';
import { PeticionesService } from 'src/app/Servicios/peticiones.service';

@Component({
  selector: 'app-cliente-producto-comun',
  templateUrl: './cliente-producto-comun.component.html',
  styleUrls: ['./cliente-producto-comun.component.css']
})
export class ClienteProductoComunComponent implements OnInit {

  constructor(private peticiones: PeticionesService, private notificaciones: NotificacionesService) { }

  ngOnInit(): void {
    this.fetchTodosClientes()
    
  }

  selectedClient = ''
  selectedProduct = ''
  displayedColumns: string[] = ['position', 'first_name', 'last_name']
  clients: any[] =  []
  productosCliente: any[] =  []
  matchingClients: any[] =  []

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
  async fetchProductosCliente(first_name: string, last_name: string){
    const response: any = await this.peticiones.productosCliente(first_name, last_name);
    let result = response['result'];

    this.productosCliente = []
    for(var product of result){
      this.productosCliente.push({
        name: product['name'],
        quantity: product['quantity']
      })
    }
  }

// Buscar productos del cliente
async getProductosEnComun(first_name: string, last_name: string, product: string){
  const response: any = await this.peticiones.productosEnComun(first_name, last_name, product);
  let status = response['ok'];
  let result = response['result'];
  
  if(!status){
    this.notificaciones.showNotification(
      "Error al obtener la información", 3
    );
    return;
  }else{
    this.actualizarClientes(result)
  }
}

actualizarClientes(clients: any[]) {
  this.matchingClients = []
  let i = 1;
  for(var client of clients){
    this.matchingClients.push({
      position:i,
      first_name: client['first_name'],
      last_name: client['last_name'],
    })
    i++
  }
}

buscarProductos(){
  if (this.selectedClient){
    let selectedClient_ = this.clients.find(x => x.id === this.selectedClient)
    this.fetchProductosCliente(selectedClient_['first_name'], selectedClient_['last_name'])
  }
}

buscar(){
  if (this.selectedClient && this.selectedProduct){
    let selectedClient_ = this.clients.find(x => x.id === this.selectedClient)
    let selectedProduct_ = this.productosCliente.find(x => x.name === this.selectedProduct)

    this.getProductosEnComun(selectedClient_['first_name'], selectedClient_['last_name'], selectedProduct_['name'])
  }
}


}
