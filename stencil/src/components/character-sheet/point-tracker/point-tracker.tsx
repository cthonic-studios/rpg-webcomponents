import { Component, Prop, State, Listen } from '@stencil/core';


@Component({
  tag: 'point-tracker',
  styleUrl: 'point-tracker.scss'
})
export class PointTracker {

  @Prop() title: string;
  @Prop() maximum: number;
  @Prop() minimum: number = 0;

  @State() currentValue;

  @Listen('rpg_resetcounter')
  resetCounter(ev) {
    this.currentValue = this.maximum;
  }

  componentWillLoad() {
    this.currentValue = this.maximum;
  }

  clickToEdit(ev) {
    // todo
    console.log(ev);
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
      <div>
        <h2>{this.title}</h2>

        <div class="counter-container" onClick={(event) => this.clickToEdit(event)}>
          {this.currentValue}
        </div>

        <button onClick={() => this.decrement()}>
          -
        </button>

        <button onClick={() => this.increment()}>
          +
        </button>
      </div>
    );
  }
}
