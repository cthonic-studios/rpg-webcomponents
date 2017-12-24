import { Component, Prop, Element, State, Listen } from '@stencil/core';

@Component({
  tag: 'character-attribute',
  styleUrl: './character-attribute.scss'
})
export class CharacterAttribute {
  @Prop() name: string;
  @Prop() showBonus: boolean = true;
  @Prop() attributeValue: number;
  @Prop() bonusCalculation: Function;
  @Prop() styleType: string = 'vertical';

  @Element() el: HTMLElement;

  styleClass: string;
  @State() isEditable: boolean = false;
  @State() currentAttrValue: number;
  @State() bonus: number;

 
  @Listen('rpg_setvalue')
  setValueFromEvent(event: CustomEvent) {
    if (event.detail) {
      this.setValue(event.detail);
    }
  }

  @Listen('valueChanged')
  valueChanged(event: CustomEvent) {
    if (this.currentAttrValue != event.detail) {
      this.currentAttrValue = event.detail;
      this.bonus = this.calculateBonus();
    }
  }

  componentWillLoad() {
    this.styleClass = `character-attribute-${this.styleType}`;
    this.currentAttrValue = this.attributeValue;
    this.bonus = this.calculateBonus();
  }

  calculateBonus() : number {
    if (this.bonusCalculation) {
      return this.bonusCalculation(this.currentAttrValue);
    }

    return Math.floor(this.currentAttrValue / 2) - 5;
  }

  setValue(value) {
    this.currentAttrValue = value;
    this.bonus = this.calculateBonus();

    let event = new CustomEvent('rpg_setvalue', {detail: this.currentAttrValue});
    this.el.querySelector('editable-number').dispatchEvent(event);
  }

  /**
   * @todo MOVE THIS TO ITS OWN HELPER CLASS???
   * @param event 
   */
  clickToEdit(event) {
    if (event.target.tagName == 'INPUT') {
      return;
    }

    this.isEditable = !this.isEditable;

    // This is so the input will exist (could also do it in componentDidUpdate?)
    if (this.isEditable) {
      setTimeout(() => {
        this.el.querySelector('input').focus()
      }, 0);
    }
  }

  render() {
    return (
      <div class={"character-attribute-container " + this.styleClass}>
        <div class="attribute-name">
          {this.name}
        </div>
        <editable-number startingValue={this.currentAttrValue}></editable-number>
        {this.showBonus ?
          <div class="attribute-bonus-container">
            {this.bonus}
          </div>
          :
          ""
        }
      </div>
    )
  }
}