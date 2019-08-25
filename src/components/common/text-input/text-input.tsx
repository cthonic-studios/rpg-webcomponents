import { Component, Prop, State, Element, Listen, h } from '@stencil/core';

@Component({
  styleUrl: './text-input.scss',
  tag: 'rpg-text-input',
  shadow: true
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

  @Listen('closeEditor')
  @Listen('keyup')
  closeEditor(e: any) {
    if (e.key && !(e.key === 'Enter' || e.key === 'Escape')) {
      return;
    }

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
        {this.label ? <label htmlFor="rpgInput">
          {this.label}
        </label> : ''}
        {this.inEditMode ?
          <span class="text">
          <input type="text" id="rpgInput" placeholder={this.placeholder} value={this.text} onChange={(ev) => this.textChanged(ev)}/>
          </span>
          :
          <span class="text">{this.text}</span>
        }
      </div>
    )
  }
}