import { Component, Prop, Method } from '@stencil/core';

@Component({
  tag: 'rpg-wallet',
  styleUrl: './wallet.scss'
})
export class Wallet {
  /**
   * This is maintained in 2 values to preserve the order.
   */
  @Prop() currencies: string[] = [
    'GP',
    'SP',
    'PP',
    'EP',
    'CP',
  ];

  @Prop() currencyValues: number[] = [
    0,
    0,
    0,
    0,
    0
  ];

  @Method()
  setCurrencyValue(name, value) : void {
    var pos = this.currencies.indexOf(name);

    if (pos <= 0) {
      return;
    }

    this.currencyValues[pos] = value;
  }

  render() {
    return (
      <div class="wallet-container">
        {this.currencies.map((currency, index) => 
          <div class="currency">
            <span class="currency-name">
              {currency}
            </span>
            <span class="currency-value">
              {this.currencyValues[index]}
            </span>
          </div>
        )}
      </div>
    )
  }
}