import { Component, Prop, State, Element, Listen } from '@stencil/core';

@Component({
  styleUrl: './text-input.scss',
  tag: 'rpg-text-input'
})
export class RpgTextInput {
  @Prop() label: string;
  @Prop() isEditable: boolean = true;
  @Prop() showLock: boolean = true;
  @Prop() placeholder: string;
  @Prop() startingText: string;
  @Prop() styleType: string = 'inline';
  
  @Element() el;

  @State() isLocked: boolean = false;
  @State() inEditMode: boolean = false;
  @State() text: string;

  @Listen('keyup.escape')
  @Listen('keyup.enter')
  @Listen('closeEditor')
  closeEditor() {
    if (this.inEditMode) {
      this.inEditMode = false;
    }
  }

  componentWillLoad() {
    this.text = this.startingText;
  }

  clickToEdit(event: Event) {
    if (!this.isEditable || this.isLocked) {
      return;
    }
    if ((event.target as any).tagName == 'INPUT') {
      return;
    }

    this.inEditMode = !this.inEditMode;

    // This is so the input will exist (could also do it in componentDidUpdate?)
    if (this.inEditMode) {
      setTimeout(() => {
        this.el.querySelector('input').focus()
      }, 0);
    }
  }

  textChanged(event: Event) {
    this.text = (event.target as HTMLInputElement).value;

    const tEvent = new CustomEvent('rpg_text_changed', {detail: {
      newText: this.text
    }});

    this.el.dispatchEvent(tEvent);
  }

  render() {
    return (
      <div class={this.styleType} onClick={(ev) => this.clickToEdit(ev)}>
        <label htmlFor="rpgInput">
          {this.label}
        </label>
        {this.inEditMode ?
          <span>
          <input type="text" id="rpgInput" placeholder={this.placeholder} value={this.text} onChange={(ev) => this.textChanged(ev)}/>
          </span>
          :
          <span class="text">{this.text}</span>
        }
      </div>
    )
  }
}