import type { Recipe, Recipes } from "@/utils/https";

export const tomatoSoupRecipe: Recipe = {
  id: 1,
  title: "Tomato Soup",
  category: { id: 10, name: "Dinner" },
  author: { id: 20, name: "Chef Ana" },
  cuisine: { id: 30, name: "Italian" },
  image_url: "https://example.com/soup.jpg",
  ratings: 4.5,
  cook_time: 20,
  prep_time: 10,
  ingredients: ["tomato", "basil"],
  short_description: "Simple soup",
  instructions: "Mix and cook",
};

export function buildRecipesResponse(recipes: Recipe[]): Recipes {
  return {
    recipes,
    pagination: {
      current_page: 1,
      total_pages: 1,
      total_count: recipes.length,
      next_page: null,
      prev_page: null,
    },
  };
}
