import { Component, Prop, State, Listen, Element, Watch, h } from '@stencil/core';


@Component({
  tag: 'point-tracker',
  styleUrl: 'point-tracker.scss'
})
export class PointTracker {

  @Prop() pointTitle: string;
  @Prop() maximum: number;
  @Prop() minimum: number = 0;
  @Prop() showIncrementors: boolean = true;

  @State() currentValue;
  @State() isEditable:boolean = false;

  @Element() el: HTMLElement;

  @Listen('rpg_resetvalue')
  resetCounter() {
    this.currentValue = this.maximum;
    this.setValue(this.currentValue);
  }

  /**
   * 
   * @todo - This Might be better as a prop that can be externally altered
   * Or maybe as both? Not sure.
   * @param event 
   */
  @Listen('rpg_setvalue')
  setValueFromEvent(event: CustomEvent) {
    if (event.detail) {
      this.setValue(event.detail);
    }
  }

  @Listen('keyup')
  closeEditor(event: KeyboardEvent) {
    if (event.key !== 'Escape' && event.key !== 'Enter') {
      return;
    }

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

  @Watch('maximum')
  setMaximum(value: any) {
    this.maximum = parseInt(value);
    this.setValue(this.maximum);
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
        <h2>{this.pointTitle}</h2>

        <editable-number startingValue={this.currentValue}></editable-number>

        {this.showIncrementors ? 
        <div class="button-container">
          <button class="button-left" onClick={() => this.decrement()}>
            -
          </button>

          <button class="button-right" onClick={() => this.increment()}>
            +
          </button>
        </div>
        :
        ""
        }
      </div>
    );
  }
}
