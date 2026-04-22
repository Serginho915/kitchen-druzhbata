import { type DishPayload, type Product } from "@/lib/kitchenMenuApi";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api";

export type TodayMenu = {
  id: number;
  date: string;
  updated_at: string;
  dishes: Product[];
};

const authHeader = (token: string) => ({ Authorization: `Token ${token}` });

const buildDishFormData = (data: Partial<DishPayload>) => {
  const formData = new FormData();

  if (data.name !== undefined) formData.append("name", data.name);
  if (data.weight !== undefined) formData.append("weight", String(data.weight));
  if (data.price !== undefined) formData.append("price", String(data.price));
  if (data.category !== undefined) formData.append("category", data.category);
  if (data.is_spicy !== undefined) formData.append("is_spicy", String(data.is_spicy));

  if (data.image instanceof File) {
    formData.append("image", data.image);
  }

  if (data.special_offer_image instanceof File) {
    formData.append("special_offer_image", data.special_offer_image);
  }

  return formData;
};

export const adminMenuApi = {
  login: async (username: string, password: string): Promise<{ token: string; username: string }> => {
    const response = await fetch(`${API_BASE_URL}/admin/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    return response.json();
  },

  logout: async (token: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/admin/auth/logout/`, {
      method: "POST",
      headers: authHeader(token),
    });

    if (!response.ok && response.status !== 204) {
      throw new Error("Failed to logout");
    }
  },

  getAllDishes: async (token: string): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/admin/dishes/`, {
      headers: authHeader(token),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch dishes");
    }

    return response.json();
  },

  createDish: async (token: string, data: DishPayload): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/admin/dishes/`, {
      method: "POST",
      headers: authHeader(token),
      body: buildDishFormData(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create dish");
    }
  },

  updateDish: async (token: string, id: number | string, data: Partial<DishPayload>): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/admin/dishes/${id}/`, {
      method: "PATCH",
      headers: authHeader(token),
      body: buildDishFormData(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update dish");
    }
  },

  deleteDish: async (token: string, id: number | string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/admin/dishes/${id}/`, {
      method: "DELETE",
      headers: authHeader(token),
    });

    if (!response.ok) {
      throw new Error("Failed to delete dish");
    }
  },

  getTodayMenu: async (token: string): Promise<TodayMenu> => {
    const response = await fetch(`${API_BASE_URL}/admin/today-menu/`, {
      headers: authHeader(token),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch today menu");
    }

    return response.json();
  },

  saveTodayMenu: async (token: string, dishIds: Array<number | string>): Promise<TodayMenu> => {
    const response = await fetch(`${API_BASE_URL}/admin/today-menu/`, {
      method: "PUT",
      headers: {
        ...authHeader(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dish_ids: dishIds.map((id) => Number(id)) }),
    });

    if (!response.ok) {
      throw new Error("Failed to save today menu");
    }

    return response.json();
  },
};
