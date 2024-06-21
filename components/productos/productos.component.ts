import { Component, Signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Producto } from '../../models/producto';
import { ListasCompraService } from '../../services/listas-compra.service';
import { NuevoProductoComponent } from '../../dialogs/nuevo-producto/nuevo-producto.component';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ItemProductoComponent } from './item-producto/item-producto.component';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    ItemProductoComponent,
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss',
})
export class ProductosComponent {
  productos!: Signal<Producto[]>;
  idLista: number = -1;
  sinListaSeleccionada: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private listasCompraService: ListasCompraService,
    private dialog: MatDialog
  ) {
    this.productos = this.listasCompraService.productos; //VVV: (1) Signal
  }

  ngOnInit(): void {
    const prod = this.route.snapshot.data['productosDeLaLista']; //VVV: (2) Obtenido con Resolver
    console.log(prod);
    this.route.params.subscribe({
      next: (params: Params) => {
        this.idLista = params['id'];
        if (this.idLista && this.idLista !== -1) {
          this.sinListaSeleccionada = false;
          this.actualizarListaCompra();
        }
      },
      error: (error) => {
        alert(
          'Se ha producido un error al obtener los productos de la lista de la compra.'
        );
        this.sinListaSeleccionada = true;
        console.log(error);
      },
    });
  }

  private actualizarListaCompra() {
    this.listasCompraService.getProductosFromLista(this.idLista).subscribe({
      next: (respuesta: any) => {
        if (respuesta.success) {
          this.sinListaSeleccionada = false;
          //  this.productos = respuesta.data; //VVV: ahora por signal
        } else {
          alert(
            'Se ha producido un error al obtener los productos de la lista de la compra.'
          );
          this.sinListaSeleccionada = true;
          console.log(respuesta);
        }
      },
      error: (error) => {
        alert(
          'Se ha producido un error al obtener los productos de la lista de la compra.'
        );
        this.sinListaSeleccionada = true;
        console.log(error);
      },
    });
  }

  showAnadirProducto() {
    const dialog = this.dialog.open(NuevoProductoComponent);

    dialog.afterClosed().subscribe({
      next: (resultado: Producto) => {
        if (resultado) {
          console.log(resultado);
          this.listasCompraService
            .addProductoToLista(this.idLista, resultado)
            .subscribe({
              next: (respuesta) => this.actualizarListaCompra(),
              error: (error) => console.log(error),
            });
        }
      },
      error: (error) => console.log(error),
    });
  }

  doActualizarLista() {
    this.actualizarListaCompra();
  }
}
