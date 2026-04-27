import { API_BASE_URL } from "./api";

export type Dish = {
  id: number;
  name: string;
  weight: number;
  price: string;
  category: string;
  created_at: string;
};

export type DishPayload = {
  name: string;
  weight: number;
  price: number;
  category: string;
};

const DISHES_ENDPOINT = `${API_BASE_URL}/dishes/`;

const parseError = async (response: Response): Promise<string> => {
  try {
    const data = (await response.json()) as Record<string, unknown>;
    if (typeof data.detail === "string") {
      return data.detail;
    }
    return "Request failed";
  } catch {
    return "Request failed";
  }
};

export const menuApi = {
  async getAll(): Promise<Dish[]> {
    const response = await fetch(DISHES_ENDPOINT, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(await parseError(response));
    }
    return (await response.json()) as Dish[];
  },

  async create(payload: DishPayload): Promise<Dish> {
    const response = await fetch(DISHES_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(await parseError(response));
    }

    return (await response.json()) as Dish;
  },

  async update(id: number, payload: DishPayload): Promise<Dish> {
    const response = await fetch(`${DISHES_ENDPOINT}${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(await parseError(response));
    }

    return (await response.json()) as Dish;
  },

  async remove(id: number): Promise<void> {
    const response = await fetch(`${DISHES_ENDPOINT}${id}/`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(await parseError(response));
    }
  },
};
