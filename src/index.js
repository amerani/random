module.exports = function(...args) {
    if(args.length <= 0) {
        return randomNumber(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    }
    if(args[0] === Object(args[0])) {
        //with options
    }
    else {
        if(args.length === 1) {
            throwIfNotFinite(args[0])
            return randomNumber(0, args[0]);
        }
        if(args.length === 2) {
            throwIfNotFinite(args[0]);
            throwIfNotFinite(args[1]);
            return randomNumber(args[0], args[1])
        }
    }
}

function throwIfNotFinite(num) {
    if(!Number.isFinite(num)) {
        throw new Error(`${num} is not finite`);
    }
}

function randomNumber(min, max) {
    if(min > max) {
        throw new Error(`Min value ${min} cannot be greater than max value ${max}`);
    }
    return Math.random() * (max - min) + min
}