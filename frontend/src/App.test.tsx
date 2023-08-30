import React from "react"
import {screen} from "@testing-library/react"
import {render} from "./test-utils"
import {App} from "./App"
import {LABEL} from "./language";

test("renders learn react link", () => {
    render(<App/>)
    const linkElement = screen.getByText(LABEL.HEAD_LINE)
    expect(linkElement).toBeInTheDocument()
})
