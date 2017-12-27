import { Component, Prop, State } from '@stencil/core';

@Component({
  styleUrl: './death-saving-throw.scss',
  tag: 'death-saving-throw'
})
export class DeathSavingThrow {
  @Prop() maxSuccesses: number = 3;
  @Prop() maxFailures: number = 3;

  @State() numSuccesses: number = 0;
  @State() numFailures: number = 0;

  counterMap(num: number, tickedNum: number) {
    let mapArr = new Array(num).fill(false);

    console.log(mapArr);

    return mapArr.map((_, i) => {
      if (i < tickedNum) {
        return true;
      }
      return false;
    });
  }

  render() {
    return (
      <div class="death-saving-throw-container">
        <div class="counter-container success-counter">
          <div class="counter-name">Successes</div>
          <div class="counter-trackers">
          {this.counterMap(this.maxSuccesses, this.numSuccesses).map((v) => {
            if (v) {
              return (<span class="filled"></span>);
            }

            return (<span class="unfilled"></span>);
          })}
          </div>
        </div>
        <div class="counter-container failure-counter">
          <div class="counter-name">Failures</div>
          <div class="counter-trackers">
          {this.counterMap(this.maxFailures, this.numFailures).map((v) => {
            if (v) {
              return (<span class="filled"></span>);
            }

            return (<span class="unfilled"></span>);
          })}
          </div>
        </div>
      </div>
    )
  }
}