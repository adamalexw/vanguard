import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VendingMachineDataAccessModule } from '@vanguard/vending-machine/data-access';
import { VendingMachineUiModule } from '@vanguard/vending-machine/ui';
import { HomeComponent } from './home/home.component';
import { VendingMachineRoutingModule } from './vending-machine-routing.module';

@NgModule({
  imports: [
    CommonModule,
    VendingMachineRoutingModule,
    VendingMachineDataAccessModule,
    VendingMachineUiModule,
    MatProgressSpinnerModule,
  ],
  declarations: [HomeComponent],
})
export class VendingMachineFeatureShellModule {}
