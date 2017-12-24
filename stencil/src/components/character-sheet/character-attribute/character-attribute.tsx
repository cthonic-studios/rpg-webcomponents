import { Component, Prop, Element, State, Listen } from '@stencil/core';

@Component({
  tag: 'character-attribute',
  styleUrl: './character-attribute.scss'
})
export class CharacterAttribute {
  @Prop() name: string;
  @Prop() showBonus: boolean = true;
  @Prop() attributeValue: number;
  @Prop() attributeCap: number;
  @Prop() bonusCalculation: Function;
  @Prop() styleType: string = 'vertical';

  @Element() el: HTMLElement;

  styleClass: string;
  @State() isEditable: boolean = false;
  @State() currentAttrValue: number;
  @State() bonus: number = 0;

 
  @Listen('rpg_setvalue')
  setValueFromEvent(event: CustomEvent) {
    if (event.detail) {
      this.setValue(event.detail);
    }
  }

  @Listen('clearBonus')
  clearBonus() {
    this.setBonus(0);
  }

  @Listen('attributeDamage')
  @Listen('attributeBonus')
  attributeDamageOrBonus(event: CustomEvent) {
    let newBonus;

    if (event.type === 'attributeBonus') {
      newBonus = this.bonus + event.detail;
    } else {
      newBonus = this.bonus - event.detail;
    }
    
    this.setBonus(newBonus);
  }

  setBonus(value: number) {
    this.bonus = value;
    if (this.bonus > 0) {
      this.el.classList.add('is-boosted');
    } else {
      this.el.classList.remove('is-boosted');
    }

    if (this.bonus < 0) {
      this.el.classList.add('is-penalized');
    } else {
      this.el.classList.remove('is-penalized');
    }

    this.setValue(this.currentAttrValue + this.bonus);
  }

  @Listen('valueChanged')
  valueChanged(event: CustomEvent) {
    let newVal = event.detail;
    if (this.currentAttrValue != newVal) {
      if (this.attributeCap && newVal > this.attributeCap) {
        newVal = this.attributeCap;
        return this.setValue(newVal);
      }

      this.currentAttrValue = newVal;
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