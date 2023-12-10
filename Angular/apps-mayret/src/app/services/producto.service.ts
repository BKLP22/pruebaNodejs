import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../modelos/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlEndpoint:string = 'http://localhost:4000/api/productos';

  constructor(private http:HttpClient) { }

  getProductos(): Observable <Producto[]>{
    //return of(PRODUCTOS)
    return this.http.get<Producto[]>(this.urlEndpoint);
  }

  getProductosByCriteria(criteria:string): Observable <Producto[]>{
    //return of(PRODUCTOS)
    return this.http.get<Producto[]>(this.urlEndpoint+"/referencia/"+criteria);
  }

}
