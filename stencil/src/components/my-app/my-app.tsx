import { Component } from '@stencil/core';


@Component({
  tag: 'my-app',
  styleUrl: 'my-app.scss'
})
export class MyApp {

  resetCounter(id: string) {
    document.getElementById(id).dispatchEvent(new CustomEvent('rpg_resetvalue'))
  }

  counterSetDemo() {
    //document.getElementById('hpTracker').dispatchEvent(new CustomEvent('rpg_setvalue', {detail: 100}))
    let track:any = document.querySelector('#hpTracker');
    console.log(track);
    track.maximum = "100";
  }

  addBonusToStrength() {
    document.querySelector('#strength').dispatchEvent(new CustomEvent('attributeBonus', {detail: 2}));
  }

  gimmeGold() {
    let wallet: any = document.querySelector('#wallet');
    wallet.setCurrencyValue('GP', 200);
  }

  render() {
    return (
      <div>
        <header>
          <h1>Stencil App Starter</h1>
        </header>

        <main>
          <div class="attributes">
            <character-attribute id="strength" name="Strength" attribute-value={10}></character-attribute>
            <character-attribute name="Dexterity" attribute-value={18}></character-attribute>
            <character-attribute name="Constitution" attribute-value={8}></character-attribute>
            <character-attribute name="Intelligence" attribute-value={12}></character-attribute>
            <character-attribute name="Wisdom" attribute-value={10}></character-attribute>
            <character-attribute name="Charisma" attribute-value={16}></character-attribute>
          </div>

          <div class="point-example">
            <div class="pointtrack">
              <point-tracker id="hpTracker" title="HP" maximum={10}></point-tracker>
              <point-tracker id="manaTracker" title="MP" maximum={30}></point-tracker>
            </div>

            <button type="button" onClick={() => this.resetCounter('hpTracker')}>Reset HP Count</button>
            <button type="button" onClick={() => this.resetCounter('manaTracker')}>Reset MP Count</button>
            <button type="button" onClick={() => this.counterSetDemo()}>Set HP to 100</button>
            <button type="button" onClick={() => this.addBonusToStrength()}>+2 to STR</button>
            <button type="button" onClick={() => this.gimmeGold()}>Gain Gold</button>

            <div class="skill-list">
              <character-skill name="Acrobatics" proficient={true} />
              <character-skill name="Animal Handling" proficient={true} />
              <character-skill name="Arcana" proficient={true} />
              <character-skill name="Athletics" proficient={true} />
              <character-skill name="Deception" proficient={true} />
              <character-skill name="Knowledge (History)" proficient={true} />
            </div>

            <div class="wallet">
              <rpg-wallet id="wallet" currencies={['GP', 'SP', 'CP']} currencyValues={[100, 57, 99]}/>
            </div>

            <div class="death-saving-throw">
              <death-saving-throw />
            </div>
          </div>
        </main>
      </div>
    );
  }
}
