import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router-dom";
import { SearchBar } from "@/products/components/SearchBar";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => (key === "searchPlaceholder" ? "Buscar..." : key),
  }),
}));

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.search}</div>;
};

describe("SearchBar Component", () => {
  it("debería actualizar el input y la URL al escribir", async () => {
    render(
      <MemoryRouter>
        <SearchBar />
        <LocationDisplay />
      </MemoryRouter>,
    );

    const input = screen.getByPlaceholderText("Buscar...");

    await userEvent.type(input, "iPhone");

    expect(input).toHaveValue("iPhone");

    expect(screen.getByTestId("location-display")).toHaveTextContent("?q=iPhone");
  });
});
