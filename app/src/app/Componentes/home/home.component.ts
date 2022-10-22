import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
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

}
