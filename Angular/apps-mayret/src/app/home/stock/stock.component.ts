import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../modelos/producto';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../modelos/categoria';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  productos: Producto[];
  categorias: Categoria[];
  loading: boolean = true;
  categoriaSeleccionada:number;

  constructor(private productoService: ProductoService,private categoriaService:CategoriaService) { }

  busquedaProducto:string;
  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe(
      categorias => {
        this.categorias = categorias;
        this.loading = false; // Oculta el indicador de carga cuando la respuesta se recibe
      },
      error => {
        console.error(error);
        this.loading = false; // Asegúrate de ocultar el indicador de carga en caso de error
      }
    );
  }

  getProductosBusqueda(busqueda:string){
    this.productoService.getProductosByCriteria(busqueda).subscribe(
      productos => {
        this.productos = productos;
        this.loading = false; // Oculta el indicador de carga cuando la respuesta se recibe
      },
      error => {
        console.error(error);
        this.loading = false; // Asegúrate de ocultar el indicador de carga en caso de error
      }
    )
  }

  isDuplicateCombination(producto: Producto, index: number): boolean {
    // Verifica si el producto actual tiene la misma combinación que el producto anterior
    if (index > 0) {
      const productoAnterior = this.productos[index - 1];
      return producto.COMBINACION_TALLA_COLOR === productoAnterior.COMBINACION_TALLA_COLOR;
    }
    return false;
  }
}
