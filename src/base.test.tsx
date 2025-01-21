
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductDetailsPanel, ProductType, Rating } from "./Products";

describe("suite1", () => {
    it("test1", () => {
        render(<div>hi</div>)
        expect(screen.getByText("hi"))
    }),
    it("test2", () => {
        expect(9).toBeLessThan(11)  
    })
})

describe("Rating component additional tests", () => {
    it("renders correct number of stars for rating 2", async () => {
        render(<Rating rating={2}></Rating>)
        const stars = screen.queryAllByText("★")
        const yellowStarCount = stars.filter(
            s => s.classList.contains("text-yellow-600")).length
        expect(yellowStarCount).toBe(2)
    })

    it("renders correct number of stars for rating 5", async () => {
        render(<Rating rating={5}></Rating>)
        const stars = screen.queryAllByText("★")
        const yellowStarCount = stars.filter(
            s => s.classList.contains("text-yellow-600")).length
        expect(yellowStarCount).toBe(5)
    })
})

describe("components", () => {
    it("Rating", async () => {
        render(<Rating rating={4}></Rating>)
        const stars = screen.queryAllByText("★")
        const yellowStarCount = stars.filter(
            s => s.classList.contains("text-yellow-600")).length
        expect(yellowStarCount).toBe(4)
    }),
    it("Product", async () => {
        const r = await fetch("https://dummyjson.com/product/3")
        const d = await r.json() as ProductType
        render(<ProductDetailsPanel product={d} handleClick={() => {}}/>)
        const e = screen.getByText(/Powder Canister$/)
        expect(e).toBeInTheDocument()
    })
})

