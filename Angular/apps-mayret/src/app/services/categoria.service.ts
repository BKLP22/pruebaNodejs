import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../modelos/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private urlEndpoint:string = 'http://localhost:4000/api/categorias';

  constructor(private http:HttpClient) { }

  getCategorias(): Observable <Categoria[]>{
    //return of(CATEGORIAS)
    return this.http.get<Categoria[]>(this.urlEndpoint);
  }

}
