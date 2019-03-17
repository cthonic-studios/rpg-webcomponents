import { Component, Prop, State, Method } from '@stencil/core';

/**
 * @todo: The dot display could probably be its own sub-component.
 */
@Component({
  styleUrl: './death-saving-throw.scss',
  tag: 'death-saving-throw'
})
export class DeathSavingThrow {
  @Prop() maxSuccesses: number = 3;
  @Prop() maxFailures: number = 3;

  @State() numSuccesses: number = 0;
  @State() numFailures: number = 0;

  @Method()
  clearCounts() {
    this.numSuccesses = 0;
    this.numFailures = 0;
  }

  counterMap(num: number, tickedNum: number) {
    let mapArr = new Array(num).fill(false);

    return mapArr.map((_, i) => {
      if (i < tickedNum) {
        return true;
      }
      return false;
    });
  }

  decrement(which) {
    if (which === 'success') {
      this.numSuccesses -= 1;
    } else {
      this.numFailures -= 1;
    }

    this.checkForImpossibleNumbers();
  }

  increment(which) {
    if (which === 'success') {
      this.numSuccesses += 1;
    } else {
      this.numFailures += 1;
    }

    this.checkForImpossibleNumbers();
  }

  checkForImpossibleNumbers() {
    if (this.numSuccesses < 0) {
      this.numSuccesses = 0;
    }
    if (this.numFailures < 0) {
      this.numFailures = 0;
    }

    if (this.numSuccesses > this.maxSuccesses) {
      this.numSuccesses = this.maxSuccesses;
    }
    if (this.numFailures > this.maxFailures) {
      this.numFailures = this.maxFailures;
    }
  }

  render() {
    return (
      <div class="death-saving-throw-container">
        <div class="counter-container success-counter">
          <div class="counter-name">Successes</div>

          <div class="counter-trackers">
            <div class="minus-button">
              <button onClick={() => this.decrement('success')}>-</button>
            </div>
            {this.counterMap(this.maxSuccesses, this.numSuccesses).map((v) => {
              if (v) {
                return (<span class="filled"></span>);
              }

              return (<span class="unfilled"></span>);
            })}
            <div class="plus-button">
              <button onClick={_ => this.increment('success')}>+</button>
            </div>
          </div>
        </div>
        <div class="counter-container failure-counter">
          <div class="counter-name">Failures</div>

          <div class="counter-trackers">
            <div class="minus-button">
              <button onClick={() => this.decrement('failure')}>-</button>
            </div>
            {this.counterMap(this.maxFailures, this.numFailures).map((v) => {
              if (v) {
                return (<span class="filled"></span>);
              }

              return (<span class="unfilled"></span>);
            })}
            <div class="plus-button">
              <button onClick={_ => this.increment('failure')}>+</button>
            </div>
          </div>
        </div>
        <h2>Death Saves</h2>
      </div>
    )
  }
}