const random = require("../src");

test('should get safe random number', () => {
    const output = random();
    expect(output).toBeGreaterThanOrEqual(Number.MIN_SAFE_INTEGER);
    expect(output).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);
});

test('should get safe random number with upper bound', () => {
    const upperBound = 5000;
    const output = random(upperBound);
    expect(output).toBeGreaterThanOrEqual(0);
    expect(output).toBeLessThanOrEqual(upperBound);
});

test('should throw when upper bound less than 0', () => {
    expect(() => random(-0.1)).toThrow();
});

test('should be zero', () => {
    const output = random(0);
    expect(output).toBe(0);
})

test.each([[0, 5], [-4, 5], [1.1, 1.11], [0.1, 10], [1,1], [0.1, 0.1]])(
    'should get random number between %p and %p',
    (lowerBound, upperBound) => {
        const output = random(lowerBound, upperBound);
        expect(output).toBeGreaterThanOrEqual(lowerBound);
        expect(output).toBeLessThanOrEqual(upperBound);
    }
);

test('should get integer when truncated', () => {
    const lower = 2;
    const upper = 5;
    const output = random(lower, upper);
    //not integer
    expect(Number.isInteger(output)).toBe(false);
    //truncated is integer
    const truncated = Math.trunc(output);
    expect(Number.isInteger(truncated)).toBe(true);
    expect(truncated).toBeGreaterThanOrEqual(lower);
    expect(truncated).toBeLessThanOrEqual(upper);
})

test('should throw when lower bound greater than upper bound', () => {
    const lower = 5;
    const upper = -5;
    expect(() => random(lower, upper)).toThrow();
});

test.each([NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    'should throw since %p is not finite',
    (val) => {
        expect(() => {
            random(val)
        }).toThrow();
    }
);

test.each([NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    'should throw since %p is not finite',
    (val) => {
        expect(() => {
            random(val, 100)
        }).toThrow();
    }
);

test.each([NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    'should throw since %p is not finite',
    (val) => {
        expect(() => {
            random(100, val)
        }).toThrow();
    }
);

test.each(["50", null, undefined, true, Symbol()])(
    'should throw since %p is not a number',
    (val) => {
        expect(() => {
            random(val)
        }).toThrow();
    }
);

test.each([{}, _ => _])(
    'should not throw when first arg %p is object',
    (val) => {
        expect(() => {
            random(val)
        }).not.toThrow();
    }
);