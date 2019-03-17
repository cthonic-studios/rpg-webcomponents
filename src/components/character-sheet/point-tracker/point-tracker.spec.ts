import { render } from '@stencil/core/testing';
import { PointTracker } from './point-tracker';
import { EditableNumber } from '../../common/editable-number/editable-number';

describe('point-tracker', () => {
  it('should build', () => {
    expect(new PointTracker()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;

    beforeEach(async () => {
      element = await render({
        components: [PointTracker, EditableNumber],
        html: '<point-tracker id="hpTracker" title="HP" maximum=10></point-tracker>'
      });
    });

    it('Should show the Maximum Value', async () => {
      let innerEditable = element.querySelector('editable-number');
      expect(innerEditable.querySelector('#counterValue').textContent).toEqual("10");
    });
  });
});