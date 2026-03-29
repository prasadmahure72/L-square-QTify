import { render, screen } from "@testing-library/react";
import axios from "axios";
import App from "./App";

jest.mock("axios");

const mockData = require("../response.json");

test("should match the count of top, and new album cards with their respective API responses", async () => {
  axios.get.mockImplementation((url) => {
    if (url.includes("/albums/top")) return Promise.resolve({ data: mockData });
    if (url.includes("/albums/new")) return Promise.resolve({ data: mockData });
    return Promise.resolve({ data: [] });
  });

  render(<App />);

  const cards = await screen.findAllByTestId("card");
  expect(cards.length).toBe(mockData.length * 2);
});
