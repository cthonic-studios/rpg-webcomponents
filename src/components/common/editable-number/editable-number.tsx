import { Component, Prop, Event, State, Listen, Element, EventEmitter, h, Watch } from '@stencil/core';


@Component({
  tag: 'editable-number',
  styleUrl: 'editable-number.scss'
})
export class EditableNumber {
  @Prop() startingValue: number;

  @Event() valueChanged: EventEmitter;
  
  @Listen('rpg_setvalue')
  setValueEvent(event: CustomEvent) {
    if (event.detail) {
      this.setValue(event.detail);
    }
  }

  @Element() el: HTMLElement;

  @State() currentValue: number;
  @State() isEditable: boolean = false;

  // TODO: Readd Keyboard events.
  @Listen('closeEditor')
  closeEditor() {
    if (this.isEditable) {
      this.isEditable = false;
    }
  }

  componentWillLoad() {
    this.currentValue = this.startingValue;
  }

  @Watch('startingValue')
  svChange(newValue) {
    this.setValue(newValue, false);
  }

  setValue(val, emit:boolean = true) {
    this.currentValue = parseInt(val);
    if (emit) {
      this.valueChanged.emit(this.currentValue);
    }
  }

  clickToEdit(event) {
    if (event.target.tagName == 'INPUT') {
      return;
    }

    this.isEditable = !this.isEditable;

    // This is so the input will exist (could also do it in componentDidUpdate?)
    if (this.isEditable) {
      setTimeout(() => {
        this.el.querySelector('input').focus()
      }, 0);
    }
  }

  render() {
    return (
      <div class="editable-number-container" onClick={(event) => this.clickToEdit(event)}>
      {!this.isEditable
        ? <span id="counterValue" class="counter-value">{this.currentValue}</span>
        : <input class="enter-counter-value" value={this.currentValue}
            onChange={(event: any) => this.setValue(event.target.value)}
          />
      }
    </div>
    )
  }
}