import { Component, Prop, Method, State, Listen, h } from '@stencil/core';

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
  public async setCurrencyValue(nameOrIndex, value) : Promise<any> {
    let pos;
    if (Number.isInteger(nameOrIndex)) {
      pos = nameOrIndex;
    } else {
      pos = this.currencies.indexOf(nameOrIndex);
    }

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

  @Listen('valueChanged')
  valueChanged(ev: CustomEvent) {
    let targetEl = ev.target as HTMLElement

    let index = targetEl.getAttribute('data-index');
    this.setCurrencyValue(parseInt(index), ev.detail);

    console.log(this.currentCurrencyValues);
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
              <editable-number data-index={index} starting-value={this.currentCurrencyValues[index]}></editable-number>
            </span>
          </div>
        )}
      </div>
    )
  }
}