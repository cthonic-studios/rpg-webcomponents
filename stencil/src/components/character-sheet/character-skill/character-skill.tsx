import { Component, Prop, Element, State } from "@stencil/core";



@Component({
  tag: 'character-skill',
  styleUrl: 'character-skill.scss'
})
export class CharacterSkill {
  @Prop() proficient: boolean;
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
  }

  toggleProficient() {
    this.isProficient = !this.isProficient;
    console.log(this.isProficient);
    this.renderProficiency();
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