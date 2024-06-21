import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-producto',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './eliminar-producto.component.html',
  styleUrl: './eliminar-producto.component.scss',
})
export class EliminarProductoComponent {
  constructor(private dialog: MatDialogRef<EliminarProductoComponent>) {}

  cancelar() {
    this.dialog.close();
  }
}
