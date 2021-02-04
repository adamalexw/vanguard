import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'vending-machine',
  },
  {
    path: 'vending-machine',
    loadChildren: () =>
      import('@vanguard/vending-machine/feature-shell').then(
        (m) => m.VendingMachineFeatureShellModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
    }),
  ],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
