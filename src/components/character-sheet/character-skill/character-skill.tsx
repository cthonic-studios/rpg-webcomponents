import { Component, Prop, Element, State, Listen, h } from "@stencil/core";



@Component({
  tag: 'character-skill',
  styleUrl: 'character-skill.scss'
})
export class CharacterSkill {
  @Prop() proficient: boolean;
  @Prop() proficiencyBonus: number = 2;
  @Prop() name: string;
  @Prop() ranks: number = 0;
  @Prop() bonus: number = 0;
  @Prop() attributeBonus: number = 0;

  @State() isProficient: boolean;
  @State() currentBonus: number = 0;

  @Element() el: HTMLElement;

  componentWillLoad() {
    this.isProficient = this.proficient;
  }

  componentDidLoad() {
    this.renderProficiency();
    this.recalculateCurrentBonus();
  }

  @Listen('setRanks')
  setRanks(event: CustomEvent) {
    this.ranks = event.detail;
    this.recalculateCurrentBonus();
  }

  @Listen('setAttributeBonus')
  setAttributeBonus(event: CustomEvent) {
    this.attributeBonus = event.detail;
    this.recalculateCurrentBonus();
  }

  @Listen('setBonus')
  setBonus(event: CustomEvent) {
    this.bonus = event.detail;
    this.recalculateCurrentBonus();
  }

  toggleProficient() {
    this.isProficient = !this.isProficient;
    console.log(this.isProficient);
    this.renderProficiency();
    this.recalculateCurrentBonus();
  }

  recalculateCurrentBonus() {
    let bonus = this.bonus + this.attributeBonus + this.ranks;

    if (this.proficient) {
      bonus += this.proficiencyBonus;
    }

    this.currentBonus = bonus;
  }

  renderProficiency() {
    let span = this.el.querySelector('#isProficient');
    if (!span) {
      return;
    }
    if (this.isProficient) {
      span.classList.add('proficient');
    } else {
      span.classList.remove('proficient');
    }
  }

  render() {
    return (
      <div>
        <div class="is-proficient">
          <span id="isProficient" onClick={() => this.toggleProficient()}></span>
        </div>
        <div class="current-bonus">{this.currentBonus}</div>
        <div class="name">{this.name}</div>
      </div>
    );
  }
}