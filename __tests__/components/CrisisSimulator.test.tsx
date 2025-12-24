/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CrisisSimulator from "@/components/CrisisSimulator";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, whileHover, whileTap, animate, initial, exit, variants, ...props }: any) => (
      <div className={className} {...props}>{children}</div>
    ),
    button: ({ children, className, onClick, whileHover, whileTap, animate, ...props }: any) => (
      <button className={className} onClick={onClick} {...props}>{children}</button>
    ),
    h2: ({ children, className, ...props }: any) => <h2 className={className} {...props}>{children}</h2>,
    span: ({ children, className, ...props }: any) => <span className={className} {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe("CrisisSimulator Component", () => {
  it("renders the initial crisis state", () => {
    render(<CrisisSimulator />);
    expect(screen.getByText(/Crisis Alert/i)).toBeInTheDocument();
    expect(screen.getByText(/The Supreme Court just struck down your Executive Order/i)).toBeInTheDocument();
  });

  it("transitions to legislation state when 'Draft Emergency Legislation' is clicked", () => {
    render(<CrisisSimulator />);
    const legislationBtn = screen.getByText(/Draft Emergency Legislation/i);
    fireEvent.click(legislationBtn);
    
    expect(screen.getByText(/GRIDLOCK/i)).toBeInTheDocument();
    expect(screen.getByText(/Bill stalled in Committee/i)).toBeInTheDocument();
  });

  it("transitions to leak state when 'Leak Statement to Press' is clicked", () => {
    render(<CrisisSimulator />);
    const leakBtn = screen.getByText(/Leak Statement to Press/i);
    fireEvent.click(leakBtn);
    
    expect(screen.getByText(/SCANDAL/i)).toBeInTheDocument();
    expect(screen.getByText(/Approval rating drops 5%/i)).toBeInTheDocument();
  });

  it("allows resetting back to idle state", () => {
    render(<CrisisSimulator />);
    
    // Go to legislation
    fireEvent.click(screen.getByText(/Draft Emergency Legislation/i));
    expect(screen.getByText(/GRIDLOCK/i)).toBeInTheDocument();
    
    // Click Reset
    const resetBtn = screen.getByText(/Try Different Path/i);
    fireEvent.click(resetBtn);
    
    expect(screen.getByText(/Crisis Alert/i)).toBeInTheDocument();
  });
});

