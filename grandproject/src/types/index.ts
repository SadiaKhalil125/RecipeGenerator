export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Recipe {
  id: string;
  title: string;
  description?: string;
  ingredients: (Ingredient | string)[];
  instructions: string[];
  cooking_time: number; // in minutes
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cuisine: string;
  dietary_tags: string[];
  nutritional_info: NutritionalInfo;
  servings: number;
  image_url?: string;
  created_at: string;
  user_id?: string;
}

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  notes?: string;
}

export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
}

export interface Favorite {
  id: string;
  user_id: string;
  recipe_id: string;
  created_at: string;
}

export interface SearchParams {
  query: string;
  cuisine?: string;
  difficulty?: string;
  max_time?: number;
  dietary?: string[];
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
}

export interface RecipeGenerationRequest {
  dish_name: string;
  cuisine?: string;
  dietary_restrictions?: string[];
  difficulty?: string;
  servings?: number;
}

export interface RecipeGenerationResponse {
  recipe: Recipe;
  success: boolean;
  message?: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface RecipeState {
  recipes: Recipe[];
  favorites: Recipe[];
  recent: Recipe[];
  loading: boolean;
  error: string | null;
  currentRecipe: Recipe | null;
} 