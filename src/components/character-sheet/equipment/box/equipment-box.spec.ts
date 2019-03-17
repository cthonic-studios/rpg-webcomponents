import { render } from '@stencil/core/testing';
import { EquipmentBox } from './equipment-box';

describe('equipment-box', () => {
  it('should build', () => {
    expect(new EquipmentBox()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;

    beforeEach(async () => {
      element = await render({
        components: [EquipmentBox],
        html: '<equipment-box />'
      });
      console.log(element);
    });
  });
});