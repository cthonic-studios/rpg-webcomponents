import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'character-attribute',
  styleUrl: './character-attribute.scss'
})
export class CharacterAttribute {
  @Prop() name: string;
  @Prop() showBonus: boolean = true;
  @Prop() attributeValue: number;
  @Prop() bonusCalculation: Function;

  calculateBonus() : number {
    if (this.bonusCalculation) {
      return this.bonusCalculation(this.attributeValue);
    }

    return Math.floor(this.attributeValue / 2) - 5;
  }

  render() {
    return (
      <div class="character-attribute-container">
        <div class="attribute-name">
          {this.name}
        </div>
        <div class="attribute-value-container">
          {this.attributeValue}
        </div>
        {this.showBonus ?
          <div class="attribute-bonus-container">
            {this.calculateBonus()}
          </div>
          :
          ""
        }
      </div>
    )
  }
}