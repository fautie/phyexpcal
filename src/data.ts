import { writable } from "svelte/store";

export const data = writable(
    { SINGLE: [], MULTI: [], CONSTANT: [], FORMULA: [] } as DATA);