import { render } from '@stencil/core/testing';
import { PointTracker } from './point-tracker';

describe('point-tracker', () => {
  it('should build', () => {
    expect(new PointTracker()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;

    beforeEach(async () => {
      element = await render({
        components: [PointTracker],
        html: '<point-tracker id="hpTracker" title="HP" maximum=10></point-tracker>'
      });
      console.log(element);
    });

    it('Should show the Maximum Value', async () => {
      console.log(element);
      expect(element.querySelector('#counterValue').textContent).toEqual("10");
    });
  });
});