import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { productosResolver } from './resolvers/productos.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/productos/productos.component').then(
        (c) => c.ProductosComponent
      ),
    canActivate: [authGuard],
  },
  { path: 'listas-compra', redirectTo: '/', pathMatch: 'full' },
  {
    path: 'listas-compra/:id',
    loadComponent: () =>
      import('./components/productos/productos.component').then(
        (c) => c.ProductosComponent
      ),
    resolve: {
      productosDeLaLista: productosResolver,
    },
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./components/registro/registro.component').then(
        (c) => c.RegistroComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/page-not-found/page-not-found.component').then(
        (c) => c.PageNotFoundComponent
      ),
  },
];
