import { Component, Prop, State, Listen, Element } from '@stencil/core';


@Component({
  tag: 'point-tracker',
  styleUrl: 'point-tracker.scss'
})
export class PointTracker {

  @Prop() title: string;
  @Prop() maximum: number;
  @Prop() minimum: number = 0;

  @State() currentValue;
  @State() isEditable:boolean = false;

  @Element() el: HTMLElement;

  @Listen('rpg_resetvalue')
  resetCounter() {
    this.currentValue = this.maximum;
    this.setValue(this.currentValue);
  }

  @Listen('rpg_setvalue')
  setValueFromEvent(event: CustomEvent) {
    if (event.detail) {
      this.setValue(event.detail);
    }
  }

  @Listen('keyup.escape')
  @Listen('keyup.enter')
  closeEditor() {
    if (this.isEditable) {
      this.isEditable = false;
    }
  }

  @Listen('valueChanged')
  valueChanged(event: CustomEvent) {
    if (this.currentValue != event.detail) {
      this.currentValue = event.detail;
    }
  }

  componentWillLoad() {
    this.currentValue = this.maximum;
  }

  setValue(val) {
    let event = new CustomEvent('rpg_setvalue', {detail: val});
    this.el.querySelector('editable-number').dispatchEvent(event);
  }

  decrement() {
    this.currentValue -= 1;

    if (this.currentValue <= this.minimum) {
      this.currentValue = this.minimum;
    }

    this.setValue(this.currentValue);
  }
  
  increment() {
    this.currentValue += 1;

    if (this.currentValue >= this.maximum) {
      this.currentValue = this.maximum;
    }

    this.setValue(this.currentValue);
  }

  render() {
    return (
      <div class="container">
        <h2>{this.title}</h2>

        <editable-number startingValue={this.currentValue}></editable-number>

        <div class="button-container">
          <button class="button-left" onClick={() => this.decrement()}>
            -
          </button>

          <button class="button-right" onClick={() => this.increment()}>
            +
          </button>
        </div>
      </div>
    );
  }
}
