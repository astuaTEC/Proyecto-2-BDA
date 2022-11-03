import { Component, OnInit } from '@angular/core';
import { PeticionesService } from 'src/app/Servicios/peticiones.service';

@Component({
  selector: 'app-top-productos',
  templateUrl: './top-productos.component.html',
  styleUrls: ['./top-productos.component.css']
})
export class TopProductosComponent implements OnInit {

  constructor(private peticiones: PeticionesService) { }

  ngOnInit(): void {
    this.getComprasTop5();
    this.getComprasSeparadoTop5()
  }

  displayedColumns: string[] = ['position', 'name', 'quantity_sold']
  top5compras: any[] =  []
  top5comprasseparado: any[] =  []

  async getComprasTop5(){
    const response: any = await this.peticiones.getTop5Compras();

    this.top5compras = [];
    var i = 1;
    for(var producto of response['result']){
      this.top5compras.push({
        position:i,
        name: producto['name'],
        quantity_sold: producto['quantity_sold']
      })
      i++;
    }
  }

  async getComprasSeparadoTop5(){
    const response: any = await this.peticiones.getTop5ComprasSeparadas();

    this.top5comprasseparado = [];
    var i = 1;
    for(var producto of response['result']){
      this.top5comprasseparado.push({
        position:i,
        name: producto['name'],
        quantity_sold: producto['quantity_sold']
      })
      i++;
    }
  }


  

}
