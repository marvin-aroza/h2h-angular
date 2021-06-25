import { StringCheckerPipe } from './string-checker.pipe';

describe('StringCheckerPipe', () => {
  it('create an instance', () => {
    const pipe = new StringCheckerPipe();
    expect(pipe).toBeTruthy();
  });
});
