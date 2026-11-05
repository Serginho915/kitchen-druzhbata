import { API_BASE_URL } from "./api";

export type RecipePost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image?: string | null;
  is_published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
};

export type RecipeAutomation = {
  prompt: string;
  frequency_days: number;
  is_enabled: boolean;
  provider: string;
  model: string;
  temperature: number;
  api_key_configured: boolean;
  next_run_at: string;
  last_run_at?: string | null;
  last_error: string;
  updated_at: string;
};

const authHeaders = (): Record<string, string> => {
  if (typeof window === "undefined") return {};
  const token = window.localStorage.getItem("kitchen-admin-token");
  return token ? { Authorization: `Token ${token}` } : {};
};

export const recipesApi = {
  list: async (): Promise<RecipePost[]> => {
    const response = await fetch(`${API_BASE_URL}/recipes/`, { cache: "no-store" });
    if (!response.ok) throw new Error("Неуспешно зареждане на рецептите");
    return response.json();
  },
  get: async (slug: string): Promise<RecipePost> => {
    const response = await fetch(`${API_BASE_URL}/recipes/${encodeURIComponent(slug)}/`, { cache: "no-store" });
    if (!response.ok) throw new Error("Рецептата не е намерена");
    return response.json();
  },
};

export const adminRecipesApi = {
  list: async (): Promise<RecipePost[]> => {
    const response = await fetch(`${API_BASE_URL}/admin/recipes/`, { headers: authHeaders(), cache: "no-store" });
    if (!response.ok) throw new Error("Неуспешно зареждане");
    return response.json();
  },
  create: async (payload: Partial<RecipePost>) => {
    const response = await fetch(`${API_BASE_URL}/admin/recipes/`, { method: "POST", headers: { ...authHeaders(), "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (!response.ok) throw new Error("Неуспешно създаване");
    return response.json();
  },
  remove: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/admin/recipes/${id}/`, { method: "DELETE", headers: authHeaders() });
    if (!response.ok) throw new Error("Неуспешно изтриване");
  },
  getAutomation: async (): Promise<RecipeAutomation> => {
    const response = await fetch(`${API_BASE_URL}/admin/recipe-automation/`, { headers: authHeaders(), cache: "no-store" });
    if (!response.ok) throw new Error("Неуспешно зареждане на настройките");
    return response.json();
  },
  saveAutomation: async (payload: Partial<RecipeAutomation>): Promise<RecipeAutomation> => {
    const response = await fetch(`${API_BASE_URL}/admin/recipe-automation/`, { method: "PUT", headers: { ...authHeaders(), "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (!response.ok) throw new Error("Неуспешно запазване");
    return response.json();
  },
  generate: async (): Promise<RecipePost> => {
    const response = await fetch(`${API_BASE_URL}/admin/recipes/generate/`, { method: "POST", headers: authHeaders() });
    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "Генерирането не беше успешно");
    return data;
  },
};
