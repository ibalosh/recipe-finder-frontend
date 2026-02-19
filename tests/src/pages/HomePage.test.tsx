import { screen, waitFor, within } from "@testing-library/react";
import { delay, http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";

import HomePage from "@/pages/HomePage";
import { API_ENDPOINTS } from "@/utils/https";
import { buildRecipesResponse, tomatoSoupRecipe } from "@tests/utils/fixtures/recipes";
import { apiMockServer, renderWithProviders } from "@tests/utils/testUtils";

describe("HomePage", () => {
  const recipesResponseMock = buildRecipesResponse([tomatoSoupRecipe]);
  const recipesEndpointPattern = new RegExp(`.*${API_ENDPOINTS.recipes}.*`);

  it("shows an error when recipe loading fails", async () => {
    apiMockServer.use(
      http.get(recipesEndpointPattern, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    renderWithProviders(<HomePage />);

    expect(await screen.findByText("Failed to fetch recipes.")).toBeInTheDocument();
  });

  it("shows loading before recipe loading succeeds", async () => {
    apiMockServer.use(
      http.get(recipesEndpointPattern, async () => {
        await delay(120);
        return HttpResponse.json(recipesResponseMock);
      }),
    );

    const homePageView = renderWithProviders(<HomePage />);

    expect(screen.getByText("Loading ...")).toBeInTheDocument();

    await waitFor(() => {
      expect(within(homePageView.container).getAllByRole("listitem")).toHaveLength(1);
    });
  });

  it("shows recipes when the API succeeds", async () => {
    apiMockServer.use(
      http.get(recipesEndpointPattern, () => {
        return HttpResponse.json(recipesResponseMock);
      }),
    );

    const homePageView = renderWithProviders(<HomePage />);

    await waitFor(() => {
      expect(within(homePageView.container).getAllByRole("listitem")).toHaveLength(1);
    });
  });
});
