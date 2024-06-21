import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { ListaCompra } from './models/lista-compra';
import { ListasCompraService } from './services/listas-compra.service';
import { AuthenticationService } from './services/authentication.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ListasCompraComponent } from './components/listas-compra/listas-compra.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatIconModule, MatSidenavModule, MatButtonModule, AsyncPipe, ListasCompraComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  listasCompra: ListaCompra[] = [];
  mostrarFormularios: boolean = true;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private listasCompraService: ListasCompraService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {

    this.router.events.forEach((e: any) => {
      if (e instanceof NavigationEnd) {
        if (
          this.route.root.firstChild?.snapshot.routeConfig?.path === 'login' ||
          this.route.root.firstChild?.snapshot.routeConfig?.path ===
            'registro' ||
          this.route.root.firstChild?.snapshot.routeConfig?.path === '**'
        ) {
          this.mostrarFormularios = true;
        } else {
          this.mostrarFormularios = false;
        }
      }
    });
  }

  doLogout() {
    this.authService.logout();
    this.snackBar.open(
      'Se ha cerrado la sesión correctamente. Vuelve pronto',
      'Ok',
      {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000,
      }
    );
    this.mostrarFormularios = true;
    this.router.navigate(['/login']);
  }
}
