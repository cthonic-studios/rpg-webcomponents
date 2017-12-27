/**
 * This is an autogenerated file created by the Stencil build process.
 * It contains typing information for all components that exist in this project
 * and imports for stencil collections that might be configured in your stencil.config.js file
 */

import '@stencil/router';


import {
  CharacterAttribute as CharacterAttribute
} from './components/character-sheet/character-attribute/character-attribute';

declare global {
  interface HTMLCharacterAttributeElement extends CharacterAttribute, HTMLElement {
  }
  var HTMLCharacterAttributeElement: {
    prototype: HTMLCharacterAttributeElement;
    new (): HTMLCharacterAttributeElement;
  };
  interface HTMLElementTagNameMap {
    "character-attribute": HTMLCharacterAttributeElement;
  }
  interface ElementTagNameMap {
    "character-attribute": HTMLCharacterAttributeElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "character-attribute": JSXElements.CharacterAttributeAttributes;
    }
  }
  namespace JSXElements {
    export interface CharacterAttributeAttributes extends HTMLAttributes {
      attributeCap?: number;
      attributeValue?: number;
      bonusCalculation?: Function;
      name?: string;
      showBonus?: boolean;
      styleType?: string;
    }
  }
}


import {
  CharacterSkill as CharacterSkill
} from './components/character-sheet/character-skill/character-skill';

declare global {
  interface HTMLCharacterSkillElement extends CharacterSkill, HTMLElement {
  }
  var HTMLCharacterSkillElement: {
    prototype: HTMLCharacterSkillElement;
    new (): HTMLCharacterSkillElement;
  };
  interface HTMLElementTagNameMap {
    "character-skill": HTMLCharacterSkillElement;
  }
  interface ElementTagNameMap {
    "character-skill": HTMLCharacterSkillElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "character-skill": JSXElements.CharacterSkillAttributes;
    }
  }
  namespace JSXElements {
    export interface CharacterSkillAttributes extends HTMLAttributes {
      attributeBonus?: number;
      bonus?: number;
      name?: string;
      proficiencyBonus?: number;
      proficient?: boolean;
      ranks?: number;
    }
  }
}


import {
  PointTracker as PointTracker
} from './components/character-sheet/point-tracker/point-tracker';

declare global {
  interface HTMLPointTrackerElement extends PointTracker, HTMLElement {
  }
  var HTMLPointTrackerElement: {
    prototype: HTMLPointTrackerElement;
    new (): HTMLPointTrackerElement;
  };
  interface HTMLElementTagNameMap {
    "point-tracker": HTMLPointTrackerElement;
  }
  interface ElementTagNameMap {
    "point-tracker": HTMLPointTrackerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "point-tracker": JSXElements.PointTrackerAttributes;
    }
  }
  namespace JSXElements {
    export interface PointTrackerAttributes extends HTMLAttributes {
      maximum?: number;
      minimum?: number;
      title?: string;
    }
  }
}


import {
  Wallet as RpgWallet
} from './components/character-sheet/wallet/wallet';

declare global {
  interface HTMLRpgWalletElement extends RpgWallet, HTMLElement {
  }
  var HTMLRpgWalletElement: {
    prototype: HTMLRpgWalletElement;
    new (): HTMLRpgWalletElement;
  };
  interface HTMLElementTagNameMap {
    "rpg-wallet": HTMLRpgWalletElement;
  }
  interface ElementTagNameMap {
    "rpg-wallet": HTMLRpgWalletElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "rpg-wallet": JSXElements.RpgWalletAttributes;
    }
  }
  namespace JSXElements {
    export interface RpgWalletAttributes extends HTMLAttributes {
      currencies?: string[];
      currencyValues?: number[];
    }
  }
}


import {
  EditableNumber as EditableNumber
} from './components/common/editable-number/editable-number';

declare global {
  interface HTMLEditableNumberElement extends EditableNumber, HTMLElement {
  }
  var HTMLEditableNumberElement: {
    prototype: HTMLEditableNumberElement;
    new (): HTMLEditableNumberElement;
  };
  interface HTMLElementTagNameMap {
    "editable-number": HTMLEditableNumberElement;
  }
  interface ElementTagNameMap {
    "editable-number": HTMLEditableNumberElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "editable-number": JSXElements.EditableNumberAttributes;
    }
  }
  namespace JSXElements {
    export interface EditableNumberAttributes extends HTMLAttributes {
      startingValue?: number;
    }
  }
}


import {
  MyApp as MyApp
} from './components/my-app/my-app';

declare global {
  interface HTMLMyAppElement extends MyApp, HTMLElement {
  }
  var HTMLMyAppElement: {
    prototype: HTMLMyAppElement;
    new (): HTMLMyAppElement;
  };
  interface HTMLElementTagNameMap {
    "my-app": HTMLMyAppElement;
  }
  interface ElementTagNameMap {
    "my-app": HTMLMyAppElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "my-app": JSXElements.MyAppAttributes;
    }
  }
  namespace JSXElements {
    export interface MyAppAttributes extends HTMLAttributes {
      
    }
  }
}

