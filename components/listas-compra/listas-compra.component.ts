import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ListaCompra } from '../../models/lista-compra';
import { ListasCompraService } from '../../services/listas-compra.service';
import { NuevaListaComponent } from '../../dialogs/nueva-lista/nueva-lista.component';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { ItemListaCompraComponent } from './item-lista-compra/item-lista-compra.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-listas-compra',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatButtonModule, ItemListaCompraComponent],
  templateUrl: './listas-compra.component.html',
  styleUrl: './listas-compra.component.scss',
})
export class ListasCompraComponent {
  listasCompra: ListaCompra[] = [];

  constructor(
    private listasCompraService: ListasCompraService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listasCompraService.getListasCompra().subscribe({
      next: (respuesta: any) => {
        if (respuesta.success) {
          this.listasCompra = respuesta.data;
        } else {
          alert('Se ha producido un error al obtener las listas de la compra');
          console.log(respuesta);
        }
      },
      error: (error) => {
        alert('Se ha producido un error al obtener las listas de la compra');
        console.log(error);
      },
    });
  }

  showNewListaDialog() {
    const dialog = this.dialog.open(NuevaListaComponent);

    dialog.afterClosed().subscribe({
      next: (resultado) => {
        if (resultado) {
          const lista: ListaCompra = {
            nombre: resultado,
            productos: [],
          };
          this.listasCompraService.createListaCompra(lista).subscribe({
            next: (respuesta: any) => {
              if (respuesta.success) {
                this.listasCompra = respuesta.data;
              } else {
                alert('No se ha podido añadir la lista de la compra');
                console.log(respuesta);
              }
            },
            error: (error) => {
              alert('No se ha podido añadir la lista de la compra');
              console.log(error);
            },
          });
        }
      },
      error: (error) => console.log(error),
    });
  }

  onListaActualizada(listas: ListaCompra[]) {
    this.listasCompra = listas;
  }
}
