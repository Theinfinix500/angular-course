import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const canNavigateGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  // const id = 1;
  // const idtwo = 2;
  // router.navigate(['/home', id, idtwo], {relativeTo});
  // router.navigateByUrl('/home');
  return true;
};
