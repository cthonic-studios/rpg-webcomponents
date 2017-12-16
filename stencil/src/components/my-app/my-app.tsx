import { Component } from '@stencil/core';


@Component({
  tag: 'my-app',
  styleUrl: 'my-app.scss'
})
export class MyApp {

  resetCounter(id: string) {
    document.getElementById(id).dispatchEvent(new CustomEvent('rpg_resetcounter'))
  }

  counterSetDemo() {
    document.getElementById('hpTracker').dispatchEvent(new CustomEvent('rpg_setcounter', {detail: {value: 100}}))
  }

  render() {
    return (
      <div>
        <header>
          <h1>Stencil App Starter</h1>
        </header>

        <main>
          <div class="point-example">
            <h2>Point Tracker</h2>
            <div class="pointtrack">
              <point-tracker id="hpTracker" title="HP" maximum={10}></point-tracker>
              <point-tracker id="manaTracker" title="MP" maximum={30}></point-tracker>
            </div>

            <button type="button" onClick={() => this.resetCounter('hpTracker')}>Reset HP Count</button>
            <button type="button" onClick={() => this.resetCounter('manaTracker')}>Reset MP Count</button>
            <button type="button" onClick={() => this.counterSetDemo()}>Set HP to 100</button>
          </div>

          <div class="attributes">
            <character-attribute name="Strength"></character-attribute>
          </div>
        </main>
      </div>
    );
  }
}
