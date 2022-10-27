import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, lastValueFrom, throwError } from 'rxjs';
import { Archivo } from '../Interfaces/archivo';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

  constructor(
    private http: HttpClient
  ) { }

  // API route
  private api_url: string = 'http://localhost:4000/api/';


  // CONSULTAS DE ARCHIVOS
  // GET cantidad total de nodos en la base de datos
  async getCantidadNodos(){
    return await lastValueFrom(this.http.get<any[]>(this.api_url + 'files/status'));
  }


  // Cargar los archivos a la base de datos
  async CargarArchivos(filesArray: Archivo []){
    return await lastValueFrom(this.http.post<string>(this.api_url + 'files/new',
     filesArray))
     .catch((e) => {
      return e['error'];
  });
}

  // CONSULTAS DE MANTENIMIENTO DE CLIENTES
  // GET Todos los clientes
  async getTodosClientes(){
    return await lastValueFrom(this.http.get<any[]>(this.api_url + 'clients/all'));
  }


  // GET Cliente por ID
  async getClienteByID(ID: number){
    return await lastValueFrom(this.http.get<any[]>(this.api_url + 'clients/get/id/' + ID));
  }


  // GET Cliente por nombre
  async getClienteByNombre(nombre: string){
    return await lastValueFrom(this.http.get<any[]>(this.api_url + 'clients/get/name/' + nombre));
  }

  // DELETE Cliente por ID
  async deleteClienteByID(ID: number){
    return await lastValueFrom(this.http.delete<any[]>(this.api_url + 'clients/delete/' + ID))
    .catch((e) => {
      return e['error'];
  });
  }


  // POST nuevo cliente
  async NewCliente(first_name: string, last_name: string){
    let json_body = {
      "first_name": first_name,
      "last_name": last_name
    }
    return await lastValueFrom(this.http.post<string>(this.api_url + 'clients/new',
     json_body))
     .catch((e) => {
      return e['error'];
  });
}


  // Update cliente
  async updateCliente(id: number, first_name: string, last_name: string){
    let json_body = {
      "id": id,
      "first_name": first_name,
      "last_name": last_name
    }
    return await lastValueFrom(this.http.put<string>(this.api_url + 'clients/update',
     json_body))
     .catch((e) => {
      return e['error'];
  });
}

  // CONSULTAS DE MANTENIMIENTO DE CATALOGO

  // GET Todos los productos
  async getTodosProductos(){
    return await lastValueFrom(this.http.get<any[]>(this.api_url + 'catalog/products'));
  }

  // DELETE Producto por ID
  async deleteProductoByID(ID: number){
    return await lastValueFrom(this.http.delete<any[]>(this.api_url + 'catalog/delete/' + ID))
    .catch((e) => {
      return e['error'];
  });
  }

  // POST nuevo producto
  async NewProducto(nombre: string, marca: string, precio:number){
    let json_body = {
      "nombre": nombre,
      "marca": marca,
      "precio": precio
    }
    return await lastValueFrom(this.http.post<string>(this.api_url + 'catalog/new',
     json_body))
     .catch((e) => {
      return e['error'];
  });
}

  // Update producto
  async updateProducto(id: number, nombre: string, marca: string, precio: number){
    let json_body = {
      "id": id,
      "nombre": nombre,
      "marca": marca,
      "precio": precio
    }
    return await lastValueFrom(this.http.put<string>(this.api_url + 'catalog/update',
     json_body))
     .catch((e) => {
      return e['error'];
  });
}

// CONSULTAS DE COMPRAS
  // GET todas las marcas de productos
  async getTodasMarcas(){
    return await lastValueFrom(this.http.get<any[]>(this.api_url + 'catalog/brands'));
  }

  
}
