import { Component, Prop, State, Element, Listen, h, EventEmitter, Event, Method } from '@stencil/core';

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

  @Event() editorSelected: EventEmitter<any>;
  
  @Element() el;

  @State() isLocked: boolean = false;
  @State() inEditMode: boolean = false;
  @State() text: string;

  @Listen('closeEditor')
  @Listen('keyup')
  onCloseEditor(e: any = null) {
    if (e && e.key && !(e.key === 'Enter' || e.key === 'Escape')) {
      return;
    }

    if (this.inEditMode) {
      this.inEditMode = false;
    }
  }

  @Method()
  public async closeEditor() {
    this.inEditMode = false;
  }

  @Method()
  public async openEditor() {
    this.inEditMode = true;

    this.editorSelected.emit(this.el);

    setTimeout(() => {
      const inp = this.el.shadowRoot.querySelector('input');
      inp.focus();
      inp.select();
    }, 5);

    this.editorSelected.emit(this.el);
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

    this.inEditMode ? this.closeEditor() : this.openEditor();
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