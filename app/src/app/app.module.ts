import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './Componentes/home/home.component';
import { ClientesComponent } from './Componentes/clientes/clientes.component';
import { CatalogoComponent } from './Componentes/catalogo/catalogo.component';
import { ComprasComponent } from './Componentes/compras/compras.component';
import { AgregarClienteComponent } from './Componentes/agregar-cliente/agregar-cliente.component';
import { EliminarClienteComponent } from './Componentes/eliminar-cliente/eliminar-cliente.component';
import { EditarClienteComponent } from './Componentes/editar-cliente/editar-cliente.component';
import { FormsModule } from '@angular/forms';
import { AgregarProductoComponent } from './Componentes/agregar-producto/agregar-producto.component';
import { EliminarProductoComponent } from './Componentes/eliminar-producto/eliminar-producto.component';
import { EditarProductoComponent } from './Componentes/editar-producto/editar-producto.component';
import { NotificacionesService } from './Servicios/notificaciones.service';
import { HttpClientModule } from '@angular/common/http';
import { PeticionesService } from './Servicios/peticiones.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientesComponent,
    CatalogoComponent,
    ComprasComponent,
    AgregarClienteComponent,
    EliminarClienteComponent,
    EditarClienteComponent,
    AgregarProductoComponent,
    EliminarProductoComponent,
    EditarProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [NotificacionesService, PeticionesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
