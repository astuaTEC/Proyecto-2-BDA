import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Archivo } from 'src/app/Interfaces/archivo';
import { NotificacionesService } from 'src/app/Servicios/notificaciones.service';
import { PeticionesService } from 'src/app/Servicios/peticiones.service';
import { CargarDatosComponent } from '../cargar-datos/cargar-datos.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private dialog: MatDialog,
    private peticiones: PeticionesService, private notificaciones: NotificacionesService) { }

  // Flag para el estatus de la base de datos
  status: boolean = false;

  ngOnInit(): void {
    this.verificarStatus();
  }

  // Método para desplegar la sección de clientes
  openClientes(){
    this.router.navigate(['/home/clientes']);
  }

  // Método para desplegar la sección de catalogo de productos
  openCatalogo(){
    this.router.navigate(['/home/catalogo']);
  }

  // Método para desplegar la sección de registro de compras
  openCompras(){
    this.router.navigate(['/home/compras']);
  }


  // Abrir el Dialog de Agregar Producto
  openCargarDatos(): void {
    const dialogRef = this.dialog.open(CargarDatosComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      let datos: Archivo [] = [];
      datos.push(
      {
        "filename": result[0][0],
        "url": result[0][1]
      });

      datos.push(
        {
          "filename": result[1][0],
          "url": result[1][1]
        });

      datos.push(
      {
        "filename": result[2][0],
        "url": result[2][1]
      });

      datos.push(
        {
          "filename": result[3][0],
          "url": result[3][1]
        });

      this.cargarDatos(datos);
      
    });
  }

  // Fetch the suggested clubes by user
  async verificarStatus(){
    const response: any = await this.peticiones.getCantidadNodos();

    this.status = false;

    let cantidadNodos: number = response['result'];
    if (cantidadNodos < 10){
      return;
    }

    // En caso de que la base de datos sí esté populada
    this.status = true;
  }

  // Cargar los archivos en la base de datos
  async cargarDatos(json_array: Archivo[]){
    const response: any = await this.peticiones.CargarArchivos(json_array);

    let status = response['ok'];
    let response_message = response['msg'];
    
    if(!status){
      this.notificaciones.showNotification(
        response_message, 3
      );
      return;
      }
        
      this.verificarStatus();
      this.notificaciones.showNotification(
        'Se han cargado los archivos correctamente', 3);
  }

}
