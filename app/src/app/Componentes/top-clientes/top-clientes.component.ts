import { Component, OnInit } from '@angular/core';
import { PeticionesService } from 'src/app/Servicios/peticiones.service';

@Component({
  selector: 'app-top-clientes',
  templateUrl: './top-clientes.component.html',
  styleUrls: ['./top-clientes.component.css']
})
export class TopClientesComponent implements OnInit {

  constructor(private peticiones: PeticionesService) { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['position', 'name', 'total_sold']
  top5clientes: any[] =  []

  async getClientsTop5(){
    const response: any = await this.peticiones.getTop5Clientes();

    this.top5clientes = [];
    var i = 1;
    for(var marca of response['result']){
      var fullName = marca['first_name'] + " " + marca['last_name'] 
      this.top5clientes.push({
        position:i,
        name: fullName,
        total_sold: marca['total_sold']
      })
      i++;
    }
  }
}
