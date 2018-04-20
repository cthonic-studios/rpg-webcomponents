import { Component, Prop, State, Method, Element } from "@stencil/core";

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
    for (let i = 0; i < this.numGeneric; i++) {
      genericLines.push(<rpg-equipment-generic />)
    }
    return (
      <div class='equipment-box'>
      {
        genericLines.map(el => el)
      }
      </div>
    )
  }
}