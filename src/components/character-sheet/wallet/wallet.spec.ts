import { render } from '@stencil/core/testing';
import { Wallet } from './wallet';

describe('rpg-wallet', () => {
  it('should build', () => {
    expect(new Wallet()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;

    beforeEach(async () => {
      element = await render({
        components: [Wallet],
        html: '<rpg-wallet />'
      });
      console.log(element);
    });
  });
});