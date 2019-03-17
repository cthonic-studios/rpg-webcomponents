import { render } from '@stencil/core/testing';
import { CharacterAttribute } from './character-attribute';

describe('character-attribute', () => {
  it('should build', () => {
    expect(new CharacterAttribute()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;

    beforeEach(async () => {
      element = await render({
        components: [CharacterAttribute],
        html: '<character-attribute />'
      });
      console.log(element);
    });
  });
});