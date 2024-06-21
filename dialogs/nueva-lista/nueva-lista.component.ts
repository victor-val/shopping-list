import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-nueva-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule, MatInputModule],
  templateUrl: './nueva-lista.component.html',
  styleUrl: './nueva-lista.component.scss',
})
export class NuevaListaComponent {
  constructor(private dialog: MatDialogRef<NuevaListaComponent>) {}

  cancelar() {
    this.dialog.close();
  }

  doSubmit(formulario: NgForm) {
    this.dialog.close(formulario.value.nombreLista);
  }
}
