import { render } from '@stencil/core/testing';
import { EditableNumber } from './editable-number';

describe('editable-number', () => {
  it('should build', () => {
    expect(new EditableNumber()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;

    beforeEach(async () => {
      element = await render({
        components: [EditableNumber],
        html: '<editable-number />'
      });
      console.log(element);
    });
  });
});