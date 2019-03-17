import { render } from '@stencil/core/testing';
import { RpgTextInput } from './text-input';

describe('editable-number', () => {
  it('should build', () => {
    expect(new RpgTextInput()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;

    beforeEach(async () => {
      element = await render({
        components: [RpgTextInput],
        html: '<rpg-text-input label="" />'
      });
      console.log(element);
    });
  });
});