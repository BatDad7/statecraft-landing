/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { axe, toHaveNoViolations } from "jest-axe";
import LiveIntelligenceFeed from "@/components/LiveIntelligenceFeed";

expect.extend(toHaveNoViolations);

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, whileInView, viewport, transition, ...props }: any) => <div className={className} {...props}>{children}</div>,
    h3: ({ children, className, ...props }: any) => <h3 className={className} {...props}>{children}</h3>,
    p: ({ children, className, ...props }: any) => <p className={className} {...props}>{children}</p>,
    span: ({ children, className, ...props }: any) => <span className={className} {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("LiveIntelligenceFeed Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders the initial state correctly", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        headline: "Initial Headline",
        date: "2025-12-22",
        activity: "Initial Activity",
      }),
    });

    render(<LiveIntelligenceFeed />);

    // Check for initial placeholder text while fetching
    expect(screen.getByText(/Awaiting Satellite Uplink/i)).toBeInTheDocument();
    expect(screen.getByText(/Syncing.../i)).toBeInTheDocument();

    // Wait for the mock fetch to resolve and state to update
    await waitFor(() => {
      expect(screen.getByText("Initial Headline")).toBeInTheDocument();
    });
  });

  it("updates its state when new data is fetched via polling", async () => {
    // 1. First fetch (initial mount)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        headline: "First Headline",
        date: "2025-12-22",
        activity: "First Activity",
      }),
    });

    render(<LiveIntelligenceFeed />);

    await waitFor(() => {
      expect(screen.getByText("First Headline")).toBeInTheDocument();
    });

    // 2. Second fetch (triggered by polling)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        headline: "Updated Headline",
        date: "2025-12-22",
        activity: "Updated Activity",
      }),
    });

    // Fast-forward time by 10 seconds to trigger the interval
    act(() => {
      jest.advanceTimersByTime(10000);
    });

    await waitFor(() => {
      expect(screen.getByText("Updated Headline")).toBeInTheDocument();
      expect(screen.getByText("Updated Activity")).toBeInTheDocument();
    });
  });

  it("handles fetch errors gracefully and keeps showing current data", async () => {
    // 1. Initial success
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        headline: "Stable Headline",
        date: "2025-12-22",
        activity: "Stable Activity",
      }),
    });

    render(<LiveIntelligenceFeed />);

    await waitFor(() => {
      expect(screen.getByText("Stable Headline")).toBeInTheDocument();
    });

    // 2. Subsequent failure
    mockFetch.mockRejectedValueOnce(new Error("API Error"));

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    // Headline should remain the same
    expect(screen.getByText("Stable Headline")).toBeInTheDocument();
  });

  it("should have no accessibility violations", async () => {
    jest.useRealTimers();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        headline: "Access Test",
        date: "2025-12-22",
        activity: "Testing for WCAG compliance.",
      }),
    });

    const { container } = render(<LiveIntelligenceFeed />);
    
    // Wait for data to load so we test the full state
    await waitFor(() => expect(screen.getByText("Access Test")).toBeInTheDocument());
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  }, 10000); // Increased timeout
});

