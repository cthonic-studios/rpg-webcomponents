import { Component, Prop, State, Method, Element } from "@stencil/core";

@Component({
  styleUrl: './equipment-generic.scss',
  tag: 'rpg-equipment-generic'
})
export class EquipmentGeneric {
  @Prop() name: string = '';
  @Prop() startingCount: number = 0;
  @Prop() weight: number;

  @Element() el: HTMLElement;

  @Prop() size: string;

  @State() currentCount: number;

  @Method()
  useItem() {
    this.currentCount = this.currentCount - 1;

    if (this.currentCount < 0) {
      this.currentCount = 0;
      return false;
    }

    this.eventUsed();
    return true;
  }

  componentWillLoad() {
    this.currentCount = this.startingCount;
  }

  eventUsed() {
    const eUsed = new CustomEvent('rpg_item_used', {
      detail: {
        remainingCount: this.currentCount,
      }
    });

    this.el.dispatchEvent(eUsed);
  }

  render() {
    return (
      <div>
        <rpg-text-input starting-text={this.name} />
        <rpg-text-input starting-text={this.currentCount} />
      </div>
    )
  }
}