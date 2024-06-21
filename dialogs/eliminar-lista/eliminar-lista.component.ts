import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-lista',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './eliminar-lista.component.html',
  styleUrl: './eliminar-lista.component.scss',
})
export class EliminarListaComponent {
  constructor(private dialog: MatDialogRef<EliminarListaComponent>) {}

  cancelar() {
    this.dialog.close();
  }
}
