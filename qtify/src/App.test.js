import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import App from "./App";

jest.mock("axios");

const mockData = require("../response.json");

beforeEach(() => {
  axios.get.mockImplementation((url) => {
    if (url.includes("/albums/top")) return Promise.resolve({ data: mockData });
    if (url.includes("/albums/new")) return Promise.resolve({ data: mockData });
    return Promise.resolve({ data: [] });
  });
});

test("should match the count of top, and new album cards with their respective API responses", async () => {
  render(<App />);

  const cards = await screen.findAllByTestId("card");
  expect(cards.length).toBe(mockData.length * 2);
});

test("should show cards for Top and New Albums and verify the 'Show All' functionality", async () => {
  render(<App />);

  // Both sections render cards by default (grid view)
  const initialCards = await screen.findAllByTestId("card");
  expect(initialCards.length).toBe(mockData.length * 2);

  // Both sections show "Collapse" by default
  const collapseButtons = screen.getAllByText("Collapse");
  expect(collapseButtons.length).toBe(2);

  // Click "Collapse" on Top Albums → carousel shows, button becomes "Show All"
  fireEvent.click(collapseButtons[0]);
  expect(screen.getAllByText("Show All").length).toBeGreaterThanOrEqual(1);

  // Cards still in DOM (carousel renders them)
  expect(screen.getAllByTestId("card").length).toBe(mockData.length * 2);

  // Click "Show All" → grid restored, button back to "Collapse"
  fireEvent.click(screen.getAllByText("Show All")[0]);
  expect(screen.getAllByText("Collapse").length).toBe(2);
});
