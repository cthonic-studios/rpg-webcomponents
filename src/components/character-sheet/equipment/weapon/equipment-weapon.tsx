import { Component } from "@stencil/core";

@Component({
  styleUrl: './equipment-weapon.scss',
  tag: 'rpg-equipment-weapon'
})
export class EquipmentWeapon {
  
  public name;
  public currentCount;
  public currentWeight;
  
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