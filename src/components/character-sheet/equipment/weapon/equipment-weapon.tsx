import { Component, Prop, State, Method, Element } from "@stencil/core";
import { EquipmentGeneric } from "../generic/equipment-generic";

@Component({
  styleUrl: './equipment-weapon.scss',
  tag: 'rpg-equipment-weapon'
})
export class EquipmentWeapon extends EquipmentGeneric {
  
  public render() {
    return (
      <div class="equipment-line">
        <rpg-text-input starting-text={this.name} />
        <span>Damage Die</span>
        <rpg-text-input class="quantity" starting-text={this.currentCount} />
        <rpg-text-input class="weight" starting-text={this.currentWeight} />
        <span>({this.currentWeight})</span>
      </div>
    );
  }
}