import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusquedaClienteComponent } from './Componentes/busqueda-cliente/busqueda-cliente.component';
import { CatalogoComponent } from './Componentes/catalogo/catalogo.component';
import { ClienteCompraComunComponent } from './Componentes/cliente-compra-comun/cliente-compra-comun.component';
import { ClienteProductoComunComponent } from './Componentes/cliente-producto-comun/cliente-producto-comun.component';
import { ClientesComponent } from './Componentes/clientes/clientes.component';
import { ComprasComponent } from './Componentes/compras/compras.component';
import { HomeComponent } from './Componentes/home/home.component';
import { TopClientesComponent } from './Componentes/top-clientes/top-clientes.component';
import { TopMarcasComponent } from './Componentes/top-marcas/top-marcas.component';
import { TopProductosComponent } from './Componentes/top-productos/top-productos.component';

// El array con las rutas para acceder a cada componente
const routes: Routes = [
  {
    path: '', redirectTo: 'home',
     pathMatch: 'full'
  },
  // Componente principal de la app, donde se puede hacer mantenimiento y cargar los archivos csv
  {
    path: 'home',
    component: HomeComponent,
    children:
    [
      {
        path: 'clientes',
        component: ClientesComponent
      },
      {
        path: 'catalogo',
        component: CatalogoComponent
      },
      {
        path: 'compras',
        component: ComprasComponent
      },
      {
        path: 'top-productos',
        component: TopProductosComponent
      },
      {
        path: 'top-marcas',
        component: TopMarcasComponent
      },
      {
        path: 'top-clientes',
        component: TopClientesComponent
      },
      {
        path: 'busqueda-clientes',
        component: BusquedaClienteComponent
      },
      {
        path: 'cliente-producto-comun',
        component: ClienteProductoComunComponent
      },
      {
        path: 'cliente-compra-comun',
        component: ClienteCompraComunComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
