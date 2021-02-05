import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { PurchaseOrder } from '@vanguard/vending-machine/data-access';

@Component({
  selector: 'vg-vending-machine',
  templateUrl: './vending-machine.component.html',
  styleUrls: ['./vending-machine.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VendingMachineComponent implements OnChanges {
  @Input()
  stock: number;

  @Input()
  cost: Readonly<number>;

  @Input()
  change: number;

  @Input()
  purchasing: boolean;

  @Input()
  purchaseSuccess: boolean;

  @Input()
  resupply: number;

  @Output()
  purchase = new EventEmitter<PurchaseOrder>();

  @Output()
  clearPurchase = new EventEmitter();

  @Output()
  reSupply = new EventEmitter();

  form: FormGroup;
  soda: number[];

  /**
   * Construct the form
   * @param fb
   */
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        quantity: [1, [Validators.required, Validators.min(1)]],
        funds: [0, [Validators.required, Validators.min(1)]],
        cost: [],
        stock: [],
      },
      {
        validators: [this.validatePurchase()],
        updateOn: 'submit',
      }
    );
  }

  /**
   * Listen to changes in stock, cost and successful purchases
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.stock && this.stock !== undefined) {
      this.form.get('stock').setValue(this.stock, { emitEvent: false });
      this.addSodaStock(this.stock);
    }

    if (changes.cost && this.cost !== undefined) {
      this.form.get('cost').setValue(this.cost, { emitEvent: false });
    }

    if (changes.purchaseSuccess && this.purchaseSuccess) {
      this.resetForm();
    }
  }

  /**
   * Array to ngFor over to display soda icons
   * @param stock
   */
  private addSodaStock(stock: number) {
    this.soda = [];

    for (let index = 0; index < stock; index++) {
      this.soda.push(index + 1);
    }
  }

  /**
   * If the form is valid submit the purchase order
   */
  onSubmit(): void {
    this.clearPurchase.emit();

    if (this.form.valid) {
      const { quantity, funds } = this.form.value;
      this.purchase.emit({ quantity, funds });
    }
  }

  /**
   * Reset the form after a purchase so a further purchase can be made
   */
  resetForm() {
    const { stock, cost } = this.form.value;

    this.form.reset();

    this.form.patchValue(
      {
        quantity: 1,
        funds: 0,
        cost,
        stock,
      },
      { emitEvent: false }
    );
  }

  /**
   * Validate the user has enough funds and there is sufficent stock
   */
  validatePurchase(): ValidatorFn {
    return (formGroup: FormGroup) => {
      const quantity = +formGroup.get('quantity').value;
      const funds = +formGroup.get('funds').value;
      const cost = +formGroup.get('cost').value;
      const stock = +formGroup.get('stock').value;

      if (!funds) {
        return null;
      }

      const totalCost = quantity * cost;

      if (funds < totalCost) {
        return { insufficentMoney: { message: 'Insufficent money' } };
      }

      if (quantity > stock) {
        return { outOfStock: { message: 'Out of stock' } };
      }

      return null;
    };
  }
}
