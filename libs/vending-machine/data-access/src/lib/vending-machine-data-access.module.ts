import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { VendingMachineEffects } from './+state/effects';
import { reducer, VENDINGMACHINE_FEATURE_KEY } from './+state/reducer';
import { VendingMachineService } from './vending-machine.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(VENDINGMACHINE_FEATURE_KEY, reducer),
    EffectsModule.forFeature([VendingMachineEffects]),
  ],
  providers: [VendingMachineService],
})
export class VendingMachineDataAccessModule {}
