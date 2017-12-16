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

  @Listen('rpg_resetcounter')
  resetCounter() {
    this.currentValue = this.maximum;
  }

  @Listen('rpg_setcounter')
  setValueFromEvent(event: CustomEvent) {
    if (event.detail.value) {
      this.setValue(event.detail.value);
    }
  }

  @Listen('keyup.enter')
  closeEditor() {
    if (this.isEditable) {
      this.isEditable = false;
    }
  }

  componentWillLoad() {
    this.currentValue = this.maximum;
  }

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

  setValue(val) {
    this.currentValue = parseInt(val);
  }

  decrement() {
    this.currentValue -= 1;

    if (this.currentValue <= this.minimum) {
      this.currentValue = this.minimum;
    }
  }
  
  increment() {
    this.currentValue += 1;

    if (this.currentValue >= this.maximum) {
      this.currentValue = this.maximum;
    }
  }

  render() {
    return (
      <div class="container">
        <h2>{this.title}</h2>

        <div class="counter-container" onClick={(event) => this.clickToEdit(event)}>
          {!this.isEditable
            ? <span id="counterValue" class="counter-value">{this.currentValue}</span>
            : <input class="enter-counter-value" value={this.currentValue}
                onChange={(event: any) => this.setValue(event.target.value)}
              />
          }
        </div>

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
