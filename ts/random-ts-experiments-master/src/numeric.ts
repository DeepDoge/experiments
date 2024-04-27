import type { Abs, Add, Divide, Gt, GtOrEq, Lt, LtOrEq, Max, Min, Mod, Multiply, Negate, Pow, Subtract } from "ts-arithmetic";

const _int = Symbol("int");
type _int = typeof _int;
export type int<T extends bigint = bigint> = {
    [_int]: T;
};
export function int<T extends bigint = bigint>(value: T): int<T> {
    return {
        [_int]: value,
    };
}
export function is_int(value: unknown): value is int {
    return typeof value === "object" && value !== null && _int in value;
}

const _float = Symbol("float");
type _float = typeof _float;
export type float<T extends number = number> = {
    [_float]: T;
};
export function float<T extends number = number>(value: T): float<T> {
    return {
        [_float]: value,
    };
}
export function is_float(value: unknown): value is float {
    return typeof value === "object" && value !== null && _float in value;
}

type ToNumber<T extends bigint> = `${T}` extends `${infer N extends number}` ? N : never;
type ToBigInt<T extends number> = `${T}` extends `${infer N extends bigint}` ? N : never;

function nameOf<T extends { [key: symbol]: unknown }>(value: T) {
    return Symbol.keyFor(Object.keys(value)[0] as never);
}

// Addition
export function int_add<const A extends int, const B extends int>(a: A, b: B) {
    return int(a[_int] + b[_int]) as A | B extends int ? int<ToBigInt<Add<ToNumber<A[_int]>, ToNumber<B[_int]>>>> : never;
}
export function float_add<const A extends float, const B extends float>(a: A, b: B) {
    return float(a[_float] + b[_float]) as A | B extends float ? float<Add<A[_float], B[_float]>> : never;
}

// Subtraction
export function int_subtract<const A extends int, const B extends int>(a: A, b: B) {
    return int(a[_int] - b[_int]) as A | B extends int ? int<ToBigInt<Subtract<ToNumber<A[_int]>, ToNumber<B[_int]>>>> : never;
}
export function float_subtract<const A extends float, const B extends float>(a: A, b: B) {
    return float(a[_float] - b[_float]) as A | B extends float ? float<Subtract<A[_float], B[_float]>> : never;
}

// Multiplication
export function int_multiply<const A extends int, const B extends int>(a: A, b: B) {
    return int(a[_int] * b[_int]) as A | B extends int ? int<ToBigInt<Multiply<ToNumber<A[_int]>, ToNumber<B[_int]>>>> : never;
}
export function float_multiply<const A extends float, const B extends float>(a: A, b: B) {
    return float(a[_float] * b[_float]) as A | B extends float ? float<Multiply<A[_float], B[_float]>> : never;
}

// Division
export function int_divide<const A extends int, const B extends int>(a: A, b: B) {
    return int(a[_int] / b[_int]) as A | B extends int ? int<ToBigInt<Divide<ToNumber<A[_int]>, ToNumber<B[_int]>>>> : never;
}
export function float_divide<const A extends float, const B extends float>(a: A, b: B) {
    return float(a[_float] / b[_float]) as A | B extends float ? float<Divide<A[_float], B[_float]>> : never;
}

// Modulus
export function int_mod<const A extends int, const B extends int>(a: A, b: B) {
    return int(a[_int] % b[_int]) as A | B extends int ? int<ToBigInt<Mod<ToNumber<A[_int]>, ToNumber<B[_int]>>>> : never;
}
export function float_mod<const A extends float, const B extends float>(a: A, b: B) {
    return float(a[_float] % b[_float]) as A | B extends float ? float<Mod<A[_float], B[_float]>> : never;
}

// Minimum
export function int_min<const A extends int, const B extends int>(a: A, b: B) {
    return int(a[_int] > b[_int] ? b[_int] : a[_int]) as int<ToBigInt<Min<ToNumber<A[_int]>, ToNumber<B[_int]>>>>;
}

export function float_min<const A extends float, const B extends float>(a: A, b: B) {
    return float(a[_float] > b[_float] ? b[_float] : a[_float]) as float<Min<A[_float], B[_float]>>;
}

// Maximum
export function int_max<const A extends int, const B extends int>(a: A, b: B) {
    return int(a[_int] < b[_int] ? b[_int] : a[_int]) as int<ToBigInt<Max<ToNumber<A[_int]>, ToNumber<B[_int]>>>>;
}

export function float_max<const A extends float, const B extends float>(a: A, b: B) {
    return float(a[_float] < b[_float] ? b[_float] : a[_float]) as float<Max<A[_float], B[_float]>>;
}

// Clamp
export function int_clamp<const X extends int, const Min extends int, const Max extends int>(x: X, min: Min, max: Max) {
    return int_min(max, int_max(min, x));
}

export function float_clamp<const X extends float, const Min extends float, const Max extends float>(x: X, min: Min, max: Max) {
    return float_min(max, float_max(min, x));
}

type BitToBoolMap = [false, true];

// Greater Than
export function int_gt<const A extends int, const B extends int>(a: A, b: B) {
    return (a[_int] > b[_int]) as A | B extends int ? BitToBoolMap[Gt<ToNumber<A[_int]>, ToNumber<B[_int]>>] : never;
}

export function float_gt<const A extends float, const B extends float>(a: A, b: B) {
    return (a[_float] > b[_float]) as A | B extends float ? BitToBoolMap[Gt<A[_float], B[_float]>] : never;
}

// Less Than
export function int_lt<const A extends int, const B extends int>(a: A, b: B) {
    return (a[_int] < b[_int]) as A | B extends int ? BitToBoolMap[Lt<ToNumber<A[_int]>, ToNumber<B[_int]>>] : never;
}

export function float_lt<const A extends float, const B extends float>(a: A, b: B) {
    return (a[_float] < b[_float]) as A | B extends float ? BitToBoolMap[Lt<A[_float], B[_float]>] : never;
}

// Less Than or Equal To
export function int_lte<const A extends int, const B extends int>(a: A, b: B) {
    return (a[_int] <= b[_int]) as A | B extends int ? BitToBoolMap[LtOrEq<ToNumber<A[_int]>, ToNumber<B[_int]>>] : never;
}

export function float_lte<const A extends float, const B extends float>(a: A, b: B) {
    return (a[_float] <= b[_float]) as A | B extends float ? BitToBoolMap[LtOrEq<A[_float], B[_float]>] : never;
}

// Greater Than or Equal To
export function int_gte<const A extends int, const B extends int>(a: A, b: B) {
    return (a[_int] >= b[_int]) as A | B extends int ? BitToBoolMap[GtOrEq<ToNumber<A[_int]>, ToNumber<B[_int]>>] : never;
}

export function float_gte<const A extends float, const B extends float>(a: A, b: B) {
    return (a[_float] >= b[_float]) as A | B extends float ? BitToBoolMap[GtOrEq<A[_float], B[_float]>] : never;
}

// Absolute Value
export function int_abs<const A extends int>(a: A) {
    return int(a[_int] < 0n ? -a[_int] : a[_int]) as int<ToBigInt<Abs<ToNumber<A[_int]>>>>;
}

export function float_abs<const A extends float>(a: A) {
    return float(a[_float] < 0 ? -a[_float] : a[_float]) as float<Abs<A[_float]>>;
}

// Power Function for int
export function int_pow<const A extends int, const B extends int>(a: A, b: B) {
    return int(BigInt(Math.pow(Number(a[_int]), Number(b[_int])))) as A | B extends int
        ? int<ToBigInt<Pow<ToNumber<A[_int]>, ToNumber<B[_int]>>>>
        : never;
}

// Power Function for float
export function float_pow<const A extends float, const B extends float>(a: A, b: B) {
    return float(Math.pow(a[_float], b[_float])) as A | B extends float ? float<Pow<A[_float], B[_float]>> : never;
}

// Negate Function for int
export function int_negate<const A extends int>(a: A) {
    return int(-a[_int]) as int<ToBigInt<Negate<ToNumber<A[_int]>>>>;
}

// Negate Function for float
export function float_negate<const A extends float>(a: A) {
    return float(-a[_float]) as float<Negate<A[_float]>>;
}
