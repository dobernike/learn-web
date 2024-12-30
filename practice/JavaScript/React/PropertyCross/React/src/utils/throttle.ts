function throttle(func: Function, ms: number) {
    let isThrottled = false,
        savedArgs: any,
        savedThis: any;

    function wrapper(this: any, ...arg: any) {
        if (isThrottled) {
            savedArgs = arg;
            savedThis = this;
            return;
        }

        func.apply(this, arg);

        isThrottled = true;

        setTimeout(() => {
            isThrottled = false;

            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = null;
                savedThis = null;
            }
        }, ms);
    }

    return wrapper;
}

export default throttle;
