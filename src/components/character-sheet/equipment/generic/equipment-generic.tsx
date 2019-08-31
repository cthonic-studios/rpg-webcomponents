import { Component, Prop, State, Method, Element, h, Listen, EventEmitter, Event } from "@stencil/core";

@Component({
  styleUrl: './equipment-generic.scss',
  tag: 'rpg-equipment-generic',
  shadow: true
})
export class EquipmentGeneric {
  @Prop() name: string = '';
  @Prop() startingCount: number = 0;
  @Prop() weight: number = 0;

  @Element() el: HTMLElement;

  @Prop() size: string;

  @State() currentCount: number;
  @State() currentWeight: number = 0;
  @State() itemWeight: number;

  @Event() reachedEndOfEquipment: EventEmitter<any>;
  
  private selectedEditor: any;

  @Listen('editorSelected')
  protected async onEditorSelected(ev: CustomEvent) {
    this.selectedEditor = ev.detail;
  }

  @Listen('keydown')
  protected async onKeyDown(e: KeyboardEvent) {
    console.log(e);
    if (!this.selectedEditor) {
      return;
    }
    if (e.key === 'tab' || e.keyCode === 9) {
      this.selectedEditor.closeEditor();

      const sibling = this.selectedEditor.nextElementSibling;

      if (sibling && sibling.tagName.toLowerCase() === 'rpg-text-input') {
        sibling.openEditor();
      } else {
        this.reachedEndOfEquipment.emit(this.el);
      }
    }
  }

  @Method()
  public async openItemField(fieldIndex = 0) {
    const fields = this.el.shadowRoot.querySelectorAll('rpg-text-input');

    if (!fields[fieldIndex]) {
      throw new Error(`No field at index ${fieldIndex}`);
    }

    await fields[fieldIndex].openEditor();
  }

  @Method()
  public async useItem() {
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
    this.itemWeight = this.weight;

    
  }

  componentDidLoad() {
    this.el.shadowRoot.querySelector('.weight')
      .addEventListener('rpg_text_changed', (ev) => this.playerChangedWeight(ev));

    this.el.shadowRoot.querySelector('.quantity')
      .addEventListener('rpg_text_changed', (ev) => this.playerChangedQuantity(ev));
  }

  recalculateWeight() {
    this.currentWeight = this.currentCount * this.itemWeight;

    console.log(this.currentWeight);

    this.eventWeightChanged();
  }

  playerChangedWeight(event) {
    this.itemWeight = parseInt(event.detail.newText);

    this.recalculateWeight();
  }

  playerChangedQuantity(event) {
    this.currentCount = parseInt(event.detail.newText);

    this.recalculateWeight();
  }

  eventUsed() {
    const eUsed = new CustomEvent('rpg_item_used', {
      detail: {
        name: this.name,
        remainingCount: this.currentCount,
      }
    });

    this.el.dispatchEvent(eUsed);
  }

  /**
   * Fires an event with the item's new calculated weight.
   */
  eventWeightChanged() {
    const weight = new CustomEvent('rpg_item_weight_changed', {
      detail: {
        name: this.name,
        newWeight: this.currentWeight
      }
    });

    this.el.dispatchEvent(weight);
  }
   
  render() {
    return (
      <div class="equipment-line">
        <rpg-text-input starting-text={this.name} />
        <rpg-text-input class="quantity" starting-text={this.currentCount} />
        <rpg-text-input class="weight" starting-text={this.currentWeight} />
        <span>({this.currentWeight})</span>
      </div>
    )
  }
}