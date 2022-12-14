import { Component, OnInit } from '@angular/core';
import { PeticionesService } from 'src/app/Servicios/peticiones.service';
import { TopProductosComponent } from '../top-productos/top-productos.component';

@Component({
  selector: 'app-top-marcas',
  templateUrl: './top-marcas.component.html',
  styleUrls: ['./top-marcas.component.css']
})
export class TopMarcasComponent implements OnInit {

  constructor(private peticiones: PeticionesService) { }

  ngOnInit(): void {
    this.getMarcasTop5();  
  }

  displayedColumns: string[] = ['position', 'name', 'country', 'quantity']
  top5marcas: any[] =  []

  async getMarcasTop5(){
    const response: any = await this.peticiones.getTop5Marcas();

    this.top5marcas = [];
    let i = 1;

    for(var marca of response['result']){
      this.top5marcas.push({
        position:i,
        name: marca['name'],
        country: marca['country'],
        quantity_sold: marca['quantity_sold']
      })
      i++;
    }
  }

}
