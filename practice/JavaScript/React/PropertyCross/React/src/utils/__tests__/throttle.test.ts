import throttle from '../throttle';

describe('throttle', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    const callback = jest.fn();
    const throttledFunc = throttle(callback, 1000);

    test('in 100 times use for 1 seconds, called one times.', () => {
        expect(callback).toBeCalledTimes(0);

        for (let i = 0; i < 100; i++) {
            throttledFunc();
        }

        expect(callback).toBeCalledTimes(1);
    });

    test('waits 1 second before start callback', () => {
        expect(callback).toBeCalledTimes(1);
        throttledFunc();
        expect(callback).toBeCalledTimes(1);

        jest.runOnlyPendingTimers();
        expect(callback).toBeCalledTimes(2);
    });
});
