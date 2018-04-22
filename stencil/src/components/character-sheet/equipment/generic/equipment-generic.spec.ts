import { render } from '@stencil/core/testing';
import { EquipmentGeneric } from './equipment-generic';

describe('equipment-generic', () => {
  it('should build', () => {
    expect(new EquipmentGeneric()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;

    beforeEach(async () => {
      element = await render({
        components: [EquipmentGeneric],
        html: '<equipment-box />'
      });
      console.log(element);
    });
  });
});