import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-nuevo-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './nuevo-producto.component.html',
  styleUrl: './nuevo-producto.component.scss',
})
export class NuevoProductoComponent {
  formulario!: FormGroup;

  constructor(private dialog: MatDialogRef<NuevoProductoComponent>) {}

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required),
      unidades: new FormControl('', [Validators.required, Validators.max(10)]),
    });
  }

  cancelar() {
    this.dialog.close();
  }

  doSubmit() {
    this.dialog.close(this.formulario.value);
  }
}
