import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditarListaComponent } from '../../../dialogs/editar-lista/editar-lista.component';
import { EliminarListaComponent } from '../../../dialogs/eliminar-lista/eliminar-lista.component';
import { ListaCompra } from '../../../models/lista-compra';
import { ListasCompraService } from '../../../services/listas-compra.service';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-item-lista-compra',
  standalone: true,
  imports: [RouterLink, MatListModule, MatMenuModule, MatIconModule, MatButtonModule],
  templateUrl: './item-lista-compra.component.html',
  styleUrl: './item-lista-compra.component.scss',
})
export class ItemListaCompraComponent {
  @Input() lista!: ListaCompra;
  @Output() listaActualizada: EventEmitter<ListaCompra[]> = new EventEmitter<
    ListaCompra[]
  >();

  constructor(
    private dialog: MatDialog,
    private listasCompraService: ListasCompraService
  ) {}

  cancelarClick(evt: MouseEvent) {
    evt.stopPropagation();
  }

  showDialogEditarLista() {
    const dialog = this.dialog.open(EditarListaComponent, {
      data: this.lista.nombre,
    });

    dialog.afterClosed().subscribe({
      next: (resultado) => {
        if (resultado.trim()) {
          this.lista.nombre = resultado;
          this.listasCompraService.updateListaCompra(this.lista).subscribe({
            next: (respuesta) => console.log(respuesta),
            error: (error) => console.log(error),
          });
        }
      },
      error: (error) => console.log(error),
    });
  }

  showDialogEliminarLista() {
    const dialog = this.dialog.open(EliminarListaComponent);

    dialog.afterClosed().subscribe({
      next: (respuesta: boolean) => {
        if (respuesta) {
          this.listasCompraService
            .deleteListaCompra(this.lista.id as number)
            .subscribe({
              next: (resultado: any) => {
                if (resultado.success) {
                  this.listaActualizada.emit(resultado.data);
                }
              },
              error: (error) => console.log(error),
            });
        }
      },
      error: (error) => console.log(error),
    });
  }
}
