import { render } from '@stencil/core/testing';
import { DeathSavingThrow } from './death-saving-throw';

describe('death-saving-throw', () => {
  it('should build', () => {
    expect(new DeathSavingThrow()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;

    beforeEach(async () => {
      element = await render({
        components: [DeathSavingThrow],
        html: '<death-saving-throw />'
      });
      console.log(element);
    });
  });
});