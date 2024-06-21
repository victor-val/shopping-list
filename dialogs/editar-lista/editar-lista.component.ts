import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-editar-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormField, MatInputModule, MatButtonModule, MatDialogModule],
  templateUrl: './editar-lista.component.html',
  styleUrl: './editar-lista.component.scss',
})
export class EditarListaComponent {
  formulario!: NgForm;

  constructor(
    private dialog: MatDialogRef<EditarListaComponent>,
    @Inject(MAT_DIALOG_DATA) public nombreLista: string
  ) {}

  cancelar() {
    this.dialog.close();
  }

  doSubmit(formulario: NgForm) {
    this.dialog.close(formulario.value.nombreLista);
  }
}
