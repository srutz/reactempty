
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

describe("suite1", () => {
    it("test1", () => {
        render(<div>hi</div>)
        expect(screen.getByText("hi"))
    })
})


