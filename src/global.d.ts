/// <reference types="svelte" />
interface SINGLE {
    symbol: string;
    unit: string;
    value: number;
    grad: number;
}
interface MULTI {
    symbol: string;
    unit: string;
    len: number;
    grad: number;
    values: number[];
}
interface CONSTANT {
    symbol: string;
    unit: string;
    value: number;
}
interface FORMULA {
    value: string;
}
type DATA = { SINGLE: SINGLE[], MULTI: MULTI[], CONSTANT: CONSTANT[], FORMULA: FORMULA[] }