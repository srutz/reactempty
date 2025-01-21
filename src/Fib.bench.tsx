import { bench, describe } from "vitest";

function fib(n: number): number {
    return n <= 1 ? 1 : fib(n - 1) + fib(n -2)
}


describe("fibonacci rekursiv", () => {
    bench("test recursive fib", () => {
        fib(30)
    }, {
        iterations: 100
    })
})