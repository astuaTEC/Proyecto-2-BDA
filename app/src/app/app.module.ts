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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientesComponent,
    CatalogoComponent,
    ComprasComponent,
    AgregarClienteComponent,
    EliminarClienteComponent,
    EditarClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
