import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Cliente } from 'src/app/Interfaces/cliente';
import { NotificacionesService } from 'src/app/Servicios/notificaciones.service';
import { PeticionesService } from 'src/app/Servicios/peticiones.service';
import { AgregarClienteComponent } from '../agregar-cliente/agregar-cliente.component';
import { EditarClienteComponent } from '../editar-cliente/editar-cliente.component';
import { EliminarClienteComponent } from '../eliminar-cliente/eliminar-cliente.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  constructor( private dialog: MatDialog, private peticiones: PeticionesService,
    private notificaciones: NotificacionesService) { }

  // ngModel para el valor del search
  searchTerm: string = "";

  // Array que contiene todos los clientes
  clientes: Cliente[] = [];

  // Mat Table settings
  displayedColumnClientes: string[] = ['ID','Nombre', 'Apellido', 'Editar', 'Eliminar'];
  dataSourceClientes: Cliente[] = [];

  ngOnInit(): void {
    this.fetchTodosClientes();
  }

  // Abrir el Dialog de Agregar Cliente
  openAgregarCliente(): void {
    const dialogRef = this.dialog.open(AgregarClienteComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      
      let nombreCliente = result[0];
      let apellidoCliente = result[1];
      this.crearCliente(nombreCliente, apellidoCliente);
    });
  }

  // Abrir el Dialog de EditarCliente
  openEditarCliente(id: number, nombre: string, apellido: string): void {
    const dialogRef = this.dialog.open(EditarClienteComponent, {
      width: '400px',
      data: {nombre: nombre, apellido: apellido},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;
      let nuevoNombreCliente = result[0];
      let nuevoApellidoCliente = result[1];
      this.actualizarCliente(id, nuevoNombreCliente, nuevoApellidoCliente);
    });
  }

  // Abrir el Dialog de EditarCliente
  openEliminarCliente(id: number, nombre: string, apellido: string): void {
    const dialogRef = this.dialog.open(EliminarClienteComponent, {
      width: '400px',
      data: {nombre: nombre, apellido: apellido},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;

      this.eliminarCliente(id);
    });
  }

  // Permite filtrar los clientes por nombre
  search(event: any): void {
    let value = event.target.value;
    this.dataSourceClientes = this.clientes.filter((target) => target.first_name.toLowerCase().includes(value) || target.last_name.toLowerCase().includes(value));
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

  // Crear un nuevo cliente
  async crearCliente(first_name: string, last_name: string){
    const response: any = await this.peticiones.NewCliente(first_name, last_name);

    let status = response['ok'];
    let response_message = response['msg'];
    
    if(!status){
      this.notificaciones.showNotification(
        response_message, 3
      );
      return;
      }
      this.fetchTodosClientes();
      this.notificaciones.showNotification(
        'Se ha creado un nuevo cliente', 3);
  }


  // Actualizar un cliente existente
  async actualizarCliente(id: number, first_name: string, last_name: string){
    const response: any = await this.peticiones.updateCliente(id, first_name, last_name);

    let status = response['ok'];
    let response_message = response['msg'];
    
    if(!status){
      this.notificaciones.showNotification(
        response_message, 3
      );
      return;
      }
      this.fetchTodosClientes();
      this.notificaciones.showNotification(
        'Se ha actualizado el cliente', 3);
  }

  // Eliminar un cliente por ID
  async eliminarCliente(id:number){
    const response: any = await this.peticiones.deleteClienteByID(id);

    let status = response['ok'];
    let response_message = response['msg'];
    
    if(!status){
      this.notificaciones.showNotification(
        response_message, 3
      );
      return;
      }
      this.fetchTodosClientes();
      this.notificaciones.showNotification(
        'Se ha eliminado un cliente', 3);
  }
}
