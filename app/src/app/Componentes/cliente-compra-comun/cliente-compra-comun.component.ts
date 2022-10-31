import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from 'src/app/Servicios/notificaciones.service';
import { PeticionesService } from 'src/app/Servicios/peticiones.service';

@Component({
  selector: 'app-cliente-compra-comun',
  templateUrl: './cliente-compra-comun.component.html',
  styleUrls: ['./cliente-compra-comun.component.css']
})
export class ClienteCompraComunComponent implements OnInit {

  constructor(private peticiones: PeticionesService, private notificaciones: NotificacionesService) { }

  ngOnInit(): void {
    this.fetchTodosClientes()
  }

  selected = ''
  displayedColumns: string[] = ['position', 'first_name', 'last_name', 'product']
  clients: any[] =  []
  productosCliente: any[] =  []

  // Obtener la lista de todos los clientes
  async fetchTodosClientes(){
    const response: any = await this.peticiones.getTodosClientes();

    this.clients=[]
    for(var cliente of response['result']){
      this.clients.push({
        first_name: cliente['first_name'],
        last_name: cliente['last_name'],
        id: cliente['id']
      })
    }
  }


// Buscar productos del cliente
async getComprasEnComun(first_name: string, last_name: string){
  const response: any = await this.peticiones.comprasEnComun(first_name, last_name);

  let status = response['ok'];
  let result = response['result'];
  
  if(!status){
    this.notificaciones.showNotification(
      "Error al obtener la información", 3
    );
    return;
  }else{
    this.actualizarProductos(result)
  }
}

actualizarProductos(products: any[]) {
  this.productosCliente = []
  let i = 1;
  for(var product of products){
    this.productosCliente.push({
      position:i,
      first_name: product['first_name'],
      last_name: product['last_name'],
      product: product['product']
    })
    i++
  }
}

obtenerProductos(){
  if (this.selected){
    let selectedClient = this.clients.find(x => x.id === this.selected)
    this.getComprasEnComun(selectedClient['first_name'], selectedClient['last_name'])
  }
}





}
