import { Component, Prop, Method, EventEmitter, Event, h } from "@stencil/core";


@Component({
  styleUrl: './spell-line.scss',
  tag: 'rpg-spell-line',
  shadow: true
})
export class RpgSpellLine {
  @Prop() components: string[] = [
    'verbal',
    'somatic',
    'material',
  ];

  @Prop() spellName: string;

  @Event() didCastSpell: EventEmitter<any>;

  @Method()
  public async castSpell(): Promise<any> {
    this.didCastSpell.emit({
      spellName: this.spellName,
      components: this.components
    });
  }

  public render() {
    return (
      <div class="spell-line">
        <div class="spell-name">{this.spellName}</div>
        <div class="action-button">
          <slot name="action">
            <button onClick={() => this.castSpell()}>
              Cast Spell
            </button>
          </slot>
        </div>
      </div>
    )
  }
}