import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[productoTachado]',
  standalone: true,
})
export class ProductotachadoDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') onClick() {
    const producto = this.el.nativeElement.querySelector(
      '.nombre'
    );
    producto.style.textDecoration =
      producto.style.textDecoration === 'line-through'
        ? 'none'
        : 'line-through';
  }
}
