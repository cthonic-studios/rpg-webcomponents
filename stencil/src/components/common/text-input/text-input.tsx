import { Component } from '@stencil/core';

@Component({
  styleUrl: './text-input.scss',
  tag: 'rpg-text-input'
})
export class RpgTextInput {

  render() {
    return (
      <div>
        <paper-input label="Demo" />
      </div>
    )
  }
}