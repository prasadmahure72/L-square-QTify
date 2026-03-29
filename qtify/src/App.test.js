import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import App from "./App";

jest.mock("axios");

const mockData = require("../response.json");

beforeEach(() => {
  axios.get.mockImplementation((url) => {
    if (url.includes("/albums/top")) return Promise.resolve({ data: mockData });
    if (url.includes("/albums/new")) return Promise.resolve({ data: mockData });
    if (url.includes("/songs")) return Promise.resolve({ data: [] });
    if (url.includes("/genres")) return Promise.resolve({ data: [] });
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

  // Both sections render cards — Top Albums in grid, New Albums in carousel
  const initialCards = await screen.findAllByTestId("card");
  expect(initialCards.length).toBe(mockData.length * 2);

  // Top Albums shows "Collapse", New Albums shows "Show all" by default
  expect(screen.getByText("Collapse")).toBeInTheDocument();
  expect(screen.getByText("Show all")).toBeInTheDocument();

  // Click "Show all" on New Albums → switches to grid, button becomes "Collapse"
  fireEvent.click(screen.getByText("Show all"));
  expect(screen.getAllByText("Collapse").length).toBe(2);
  expect(screen.getAllByTestId("card").length).toBe(mockData.length * 2);

  // Click "Collapse" on Top Albums → switches to carousel, button becomes "Show all"
  fireEvent.click(screen.getAllByText("Collapse")[0]);
  expect(screen.getByText("Show all")).toBeInTheDocument();
  expect(screen.getAllByTestId("card").length).toBe(mockData.length * 2);
});
