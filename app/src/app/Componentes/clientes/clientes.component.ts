import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Cliente } from 'src/app/Interfaces/cliente';
import { AgregarClienteComponent } from '../agregar-cliente/agregar-cliente.component';
import { EditarClienteComponent } from '../editar-cliente/editar-cliente.component';
import { EliminarClienteComponent } from '../eliminar-cliente/eliminar-cliente.component';




const ELEMENT_DATA: Cliente[] = [
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

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  constructor( private dialog: MatDialog) { }

  // Mat Table settings
  displayedColumnClientes: string[] = ['ID','Nombre', 'Apellido', 'Editar', 'Eliminar'];
  dataSourceClientes: Cliente[] = ELEMENT_DATA;

  ngOnInit(): void {
  }

  // Abrir el Dialog de Agregar Cliente
  openAgregarCliente(): void {
    const dialogRef = this.dialog.open(AgregarClienteComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      //let nombreCliente = result[0];
      //let apellidoCliente = result[1];
      console.log(result);
    });
  }

  // Abrir el Dialog de EditarCliente
  openEditarCliente(id: number, nombre: string, apellido: string): void {
    const dialogRef = this.dialog.open(EditarClienteComponent, {
      width: '400px',
      data: {nombre: nombre, apellido: apellido},
    });

    dialogRef.afterClosed().subscribe(result => {
      //let nuevoNombreCliente = result[0];
      //let nuevoApellidoCliente = result[1];
      console.log(result);
    });
  }

  // Abrir el Dialog de EditarCliente
  openEliminarCliente(id: number, nombre: string, apellido: string): void {
    const dialogRef = this.dialog.open(EliminarClienteComponent, {
      width: '400px',
      data: {nombre: nombre, apellido: apellido},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
