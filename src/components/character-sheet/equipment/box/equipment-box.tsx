import { Component, Prop, State, Element, h } from "@stencil/core";

@Component({
  styleUrl: './equipment-box.scss',
  tag: 'rpg-equipment-box'
})
export class EquipmentBox {
  @Prop() numGeneric: number = 10;
  @Prop() numWeapons: number = 3;

  @State() totalWeight: number = 0;

  @Element() el;

  public render() {
    let genericLines: any[] = [];
    let weaponLines: any[] = [];

    for (let i = 0; i < this.numWeapons; i++) {
      weaponLines.push('');
    }

    for (let i = 0; i < this.numGeneric; i++) {
      genericLines.push(<rpg-equipment-generic />)
    }
    return (
      <div class='equipment-box'>
        <h3>Weapons</h3>
      {
        weaponLines.map(el => el)
      }
      <h3>General Equipment</h3>
      <div class="equipment-titles">
        <div>Name</div>
        <div>Amount</div>
        <div>Weight</div>
      </div>
      {
        genericLines.map(el => el)
      }
      </div>
    )
  }
}