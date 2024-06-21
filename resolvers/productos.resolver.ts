import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { ListasCompraService } from '../services/listas-compra.service';

export const productosResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const id = route.params['id'];
  return inject(ListasCompraService).getProductosFromLista(id);
};
