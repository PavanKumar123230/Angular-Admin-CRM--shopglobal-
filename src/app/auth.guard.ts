// src/app/guards/auth.guard.ts

// import { inject } from '@angular/core';
// import { CanActivateFn } from '@angular/router';
// import { Router } from '@angular/router';
// import { AdminService } from './service/admin.service';
// import { TokenService } from './service/token.service';

// export const authGuard: CanActivateFn = (route, state) => {
//   const auth = inject(TokenService);
//   const router = inject(Router);

//   if (auth.getToken()) {
//     return true;
//   } else {
//     router.navigate(['/dashboard']);
//     return false;
//   }
// };


import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from './service/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(TokenService);
  const router = inject(Router);

  if (auth.getToken()) {
    return true;
  } else {
    router.navigate(['/login']); // ✅ redirect to login (correct path)
    return false;
  }
};

