import { LoopLimiterPipe } from './loop-limiter.pipe';

describe('LoopLimiterPipe', () => {
  it('create an instance', () => {
    const pipe = new LoopLimiterPipe();
    expect(pipe).toBeTruthy();
  });
});
