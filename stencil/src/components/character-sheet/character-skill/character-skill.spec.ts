import { render } from '@stencil/core/testing';
import { CharacterSkill } from './character-skill';

describe('character-skill', () => {
  it('should build', () => {
    expect(new CharacterSkill()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;

    beforeEach(async () => {
      element = await render({
        components: [CharacterSkill],
        html: '<character-skill />'
      });
      console.log(element);
    });
  });
});