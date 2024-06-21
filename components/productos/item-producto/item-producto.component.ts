import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from '../../../models/producto';
import { ListasCompraService } from '../../../services/listas-compra.service';
import { EditarProductoComponent } from '../../../dialogs/editar-producto/editar-producto.component';
import { EliminarProductoComponent } from '../../../dialogs/eliminar-producto/eliminar-producto.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ProductotachadoDirective } from '../../../directives/producto-tachado.directive';

@Component({
  selector: 'app-item-producto',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatMenuModule, MatButtonModule, ProductotachadoDirective],
  templateUrl: './item-producto.component.html',
  styleUrl: './item-producto.component.scss',
})
export class ItemProductoComponent {
  @Input() producto!: Producto;
  @Output() actualizarLista: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private dialog: MatDialog,
    private listasCompraService: ListasCompraService
  ) {}

  cancelarClick(evt: MouseEvent) {
    evt.stopPropagation();
  }

  showDialogEditarProducto() {
    const dialog = this.dialog.open(EditarProductoComponent, {
      data: this.producto,
    });

    dialog.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.listasCompraService
            .updateProductoFromLista(result as Producto)
            .subscribe({
              next: (respuesta) => console.log(respuesta),
              error: (error) => console.log(error),
            });
        }
      },
      error: (error) => console.log(error),
    });
  }

  showDialogEliminarProducto() {
    const dialog = this.dialog.open(EliminarProductoComponent);

    dialog.afterClosed().subscribe({
      next: (result: boolean) => {
        if (result) {
          this.listasCompraService
            .deleteProducto(this.producto.id as number)
            .subscribe({
              next: (respuesta) => {
                this.actualizarLista.emit();
                console.log(respuesta);
              },
              error: (error) => console.log(error),
            });
        }
      },
      error: (error) => console.log(error),
    });
  }
}

