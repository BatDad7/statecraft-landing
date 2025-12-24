/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import StandardsMapper from "@/components/StandardsMapper";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, whileHover, whileTap, animate, initial, exit, transition, viewport, ...props }: any) => (
      <div className={className} {...props}>{children}</div>
    ),
    button: ({ children, className, onClick, whileHover, whileTap, ...props }: any) => (
      <button className={className} onClick={onClick} {...props}>{children}</button>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe("StandardsMapper Component", () => {
  it("renders the initial state with no unit selected", () => {
    render(<StandardsMapper />);
    expect(screen.getByText(/AP Gov/i)).toBeInTheDocument();
    expect(screen.getByText(/Standards Mapper/i)).toBeInTheDocument();
    expect(screen.queryByText(/Mission Brief/i)).not.toBeInTheDocument();
  });

  it("updates the content when a unit is selected from the dropdown", () => {
    render(<StandardsMapper />);
    const select = screen.getByRole("combobox");
    
    fireEvent.change(select, { target: { value: "Unit 2" } });
    
    expect(screen.getByText(/Mission Brief: Unit 2/i)).toBeInTheDocument();
    expect(screen.getByText(/AP Unit 2: Interactions Among Branches/i)).toBeInTheDocument();
    expect(screen.getByText(/The Federal Budget Crisis/i)).toBeInTheDocument();
  });

  it("handles multiple unit selections correctly", () => {
    render(<StandardsMapper />);
    const select = screen.getByRole("combobox");
    
    // Select Unit 1
    fireEvent.change(select, { target: { value: "Unit 1" } });
    expect(screen.getByText(/Mission Brief: Unit 1/i)).toBeInTheDocument();
    
    // Change to Unit 5
    fireEvent.change(select, { target: { value: "Unit 5" } });
    expect(screen.getByText(/Mission Brief: Unit 5/i)).toBeInTheDocument();
    expect(screen.getByText(/The Midterm Election Simulator/i)).toBeInTheDocument();
  });

  it("responds to hash changes in the URL", () => {
    // Manually trigger hash change logic
    render(<StandardsMapper />);
    
    // Mock the hash and dispatch event
    window.location.hash = "#unit-3";
    fireEvent(window, new Event("hashchange"));
    
    expect(screen.getByText(/Mission Brief: Unit 3/i)).toBeInTheDocument();
    expect(screen.getByText(/The Landmark Trial/i)).toBeInTheDocument();
  });
});

