import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'character-attribute',
  styleUrl: './character-attribute.scss'
})
export class CharacterAttribute {
  @Prop() name: string;

  render() {
    return (
      <div class="character-attribute-container">
        {this.name}
      </div>
    )
  }
}