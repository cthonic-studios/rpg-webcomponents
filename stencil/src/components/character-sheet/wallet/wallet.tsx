import { Component, Prop, Method, State } from '@stencil/core';

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

  @State() currentCurrencyValues: number[];

  @Method()
  setCurrencyValue(name, value) : void {
    var pos = this.currencies.indexOf(name);

    if (pos < 0) {
      return;
    }

    this.currentCurrencyValues = this.currentCurrencyValues.map((v, idx) => {
      if (idx === pos) {
        return value;
      };
      return v;
    });
  }

  componentWillLoad() {
    this.currentCurrencyValues = this.currencyValues;
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
              {this.currentCurrencyValues[index]}
            </span>
          </div>
        )}
      </div>
    )
  }
}