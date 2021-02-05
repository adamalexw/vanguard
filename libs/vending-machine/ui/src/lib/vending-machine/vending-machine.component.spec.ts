import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { byText, Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { PurchaseOrder } from '@vanguard/vending-machine/data-access';
import { VendingMachineComponent } from './vending-machine.component';

describe('VendingMachineComponent', () => {
  let spectator: Spectator<VendingMachineComponent>;

  const inputs = {
    stock: 1,
    cost: 1.2,
  };

  const createComponent = createComponentFactory({
    component: VendingMachineComponent,
    imports: [
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
    ],
  });

  beforeEach(
    () =>
      (spectator = createComponent({
        props: inputs,
      }))
  );

  it('should create vending machine component', () => {
    expect(spectator.component).toBeDefined();
  });

  describe('Purchase', () => {
    let purchaseButton: HTMLButtonElement;

    beforeEach(() => {
      purchaseButton = spectator.query('#purchase');
      expect(purchaseButton).not.toBeNull();
    });

    it('should emit clear and purchase events', () => {
      const quantity = 1;
      const funds = 2;

      spectator.component.form.setValue({
        quantity,
        funds,
        cost: inputs.cost,
        stock: inputs.stock,
      });

      let clearPurchaseEvent: boolean;
      spectator
        .output('clearPurchase')
        .subscribe(() => (clearPurchaseEvent = true));

      let purchaseEvent: PurchaseOrder;
      spectator
        .output('purchase')
        .subscribe((result: PurchaseOrder) => (purchaseEvent = result));

      spectator.click(purchaseButton);

      expect(clearPurchaseEvent).toBeTruthy();
      expect(purchaseEvent).toEqual({ quantity, funds });
    });

    it('should show change label with change given', () => {
      spectator.setInput('change', 0.8);

      const errorLabel = spectator.query(byText('Change $0.80'));
      expect(errorLabel).not.toBeNull();
    });

    it('should show purchase success as no change given', () => {
      spectator.setInput('change', 0);

      const errorLabel = spectator.query(byText('Purchase Success'));
      expect(errorLabel).not.toBeNull();
    });

    it('should not show change label', () => {
      spectator.setInput('change', undefined);

      const errorLabel = spectator.query('.change');
      expect(errorLabel).toBeNull();
    });

    it('should show insufficent money error label', () => {
      spectator.component.form.setValue({
        quantity: 1,
        funds: 1,
        cost: inputs.cost,
        stock: inputs.stock,
      });

      spectator.component.form.markAsDirty();

      spectator.click(purchaseButton);

      const errorLabel = spectator.query('.form-error');
      expect(errorLabel).not.toBeNull();
      expect(errorLabel.innerHTML.trim()).toBe('Insufficent money');
    });

    it('should show out of stock error label', () => {
      spectator.component.form.setValue({
        quantity: 1,
        funds: 2,
        cost: inputs.cost,
        stock: 0,
      });

      spectator.component.form.markAsDirty();

      spectator.click(purchaseButton);

      const errorLabel = spectator.query('.form-error');
      expect(errorLabel).not.toBeNull();
      expect(errorLabel.innerHTML.trim()).toBe('Out of stock');
    });

    it('should reset form after successful purchase', () => {
      spectator.setInput('purchaseSuccess', true);

      expect(spectator.component.form.value).toEqual({
        quantity: 1,
        funds: 0,
        cost: inputs.cost,
        stock: inputs.stock,
      });
    });
  });

  describe('Resupply', () => {
    it('should emit reSupply event', () => {
      let reSupplyEvent: boolean;
      spectator.output('reSupply').subscribe(() => (reSupplyEvent = true));

      const resupplyButton = spectator.query('#resupply');
      expect(resupplyButton).not.toBeNull();

      spectator.click(resupplyButton);

      expect(reSupplyEvent).toBeTruthy();
    });

    it('should show resupply label', () => {
      spectator.setInput('resupply', 10);

      const errorLabel = spectator.query(byText('Resupplied with 10 cans'));
      expect(errorLabel).not.toBeNull();
    });
  });

  describe('FormValidation', () => {
    it('should return null and pass validation', () => {
      spectator.component.form.setValue({
        quantity: 1,
        funds: 2,
        cost: 1.2,
        stock: 1,
      });

      const result = spectator.component
        .validatePurchase()
        .call(this, spectator.component.form);

      expect(result).toBeNull();
    });

    it('should return insufficentMoney', () => {
      spectator.component.form.setValue({
        quantity: 1,
        funds: 1,
        cost: 1.2,
        stock: 1,
      });

      const result = spectator.component
        .validatePurchase()
        .call(this, spectator.component.form);

      expect(result).toEqual({
        insufficentMoney: { message: 'Insufficent money' },
      });
    });

    it('should return outOfStock', () => {
      spectator.component.form.setValue({
        quantity: 1,
        funds: 2,
        cost: 1.2,
        stock: 0,
      });

      const result = spectator.component
        .validatePurchase()
        .call(this, spectator.component.form);

      expect(result).toEqual({ outOfStock: { message: 'Out of stock' } });
    });
  });
});
