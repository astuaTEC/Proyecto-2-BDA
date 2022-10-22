import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoComponent } from './Componentes/catalogo/catalogo.component';
import { ClientesComponent } from './Componentes/clientes/clientes.component';
import { ComprasComponent } from './Componentes/compras/compras.component';
import { HomeComponent } from './Componentes/home/home.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
