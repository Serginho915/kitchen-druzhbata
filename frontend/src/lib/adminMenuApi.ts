import { type DishPayload, type Product } from "@/lib/kitchenMenuApi";

type DailyMenuResponse = {
  date: string;
  dish_ids: number[];
  dishes: Product[];
  updated_at: string;
};

type SpecialOfferResponse = {
  id: number;
  text: string;
  banner: string | null;
  updated_at: string;
};

type DailySpecialOffersResponse = {
  date: string;
  offer_ids: number[];
  offers: SpecialOfferResponse[];
  updated_at: string;
};

type DailySelectionMeta = {
  ids: number[];
  updated_at: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api";
const ADMIN_TOKEN_KEY = "kitchen-admin-token";

const getToken = () => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(ADMIN_TOKEN_KEY);
};

const getAuthHeaders = () => {
  const token = getToken();
  if (!token) {
    throw new Error("Unauthorized");
  }
  return { Authorization: `Token ${token}` };
};

const buildDishFormData = (data: Partial<DishPayload>) => {
  const formData = new FormData();

  if (data.name !== undefined) formData.append("name", data.name);
  if (data.description !== undefined) formData.append("description", data.description);
  if (data.weight !== undefined) formData.append("weight", String(data.weight));
  if (data.price !== undefined) formData.append("price", String(data.price));
  if (data.category !== undefined) formData.append("category", data.category);
  if (data.is_spicy !== undefined) formData.append("is_spicy", String(data.is_spicy));

  if (data.image instanceof File) {
    formData.append("image", data.image);
  }

  return formData;
};

export const adminAuthApi = {
  tokenKey: ADMIN_TOKEN_KEY,

  login: async (username: string, password: string): Promise<{ token: string; username: string }> => {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    return response.json();
  },

  logout: async (): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout/`, {
        method: "POST",
        headers: getAuthHeaders(),
      });
      if (!response.ok && response.status !== 204) {
        throw new Error("Failed to logout");
      }
    } catch {
      // no-op: local token is removed by UI anyway
    }
  },
};

export const adminMenuApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/admin/dishes/`, {
      cache: "no-store",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch menu");
    return response.json();
  },

  update: async (id: number | string, data: Partial<DishPayload>): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/admin/dishes/${id}/`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: buildDishFormData(data),
    });
    if (!response.ok) throw new Error("Failed to update item");
  },

  delete: async (id: number | string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/admin/dishes/${id}/`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to delete item");
  },

  create: async (data: DishPayload): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/admin/dishes/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: buildDishFormData(data),
    });
    if (!response.ok) throw new Error("Failed to add item");
  },

  getTodaySelection: async (): Promise<Array<number | string>> => {
    const response = await fetch(`${API_BASE_URL}/admin/menu/today/`, {
      cache: "no-store",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch daily menu");
    const data: DailyMenuResponse = await response.json();
    return data.dish_ids;
  },

  getTodaySelectionData: async (): Promise<DailySelectionMeta> => {
    const response = await fetch(`${API_BASE_URL}/admin/menu/today/`, {
      cache: "no-store",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch daily menu");
    const data: DailyMenuResponse = await response.json();
    return {
      ids: data.dish_ids,
      updated_at: data.updated_at,
    };
  },

  saveTodaySelection: async (dishIds: Array<number | string>): Promise<void> => {
    const numericDishIds = dishIds
      .map((dishId) => Number(dishId))
      .filter((dishId) => Number.isInteger(dishId) && dishId > 0);

    const response = await fetch(`${API_BASE_URL}/admin/menu/today/`, {
      method: "PUT",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dish_ids: numericDishIds }),
    });
    if (!response.ok) throw new Error("Failed to save daily menu");
  },

  getSpecialOffers: async (): Promise<SpecialOfferResponse[]> => {
    const response = await fetch(`${API_BASE_URL}/admin/special-offers/`, {
      cache: "no-store",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch special offers");
    return response.json();
  },

  createSpecialOffer: async (data: { text: string; banner?: File | null }): Promise<void> => {
    const formData = new FormData();
    formData.append("text", data.text);
    if (data.banner instanceof File) {
      formData.append("banner", data.banner);
    }

    const response = await fetch(`${API_BASE_URL}/admin/special-offers/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to create special offer");
  },

  updateSpecialOffer: async (
    id: number | string,
    data: { text?: string; banner?: File | null },
  ): Promise<void> => {
    const formData = new FormData();
    if (data.text !== undefined) {
      formData.append("text", data.text);
    }
    if (data.banner instanceof File) {
      formData.append("banner", data.banner);
    }

    const response = await fetch(`${API_BASE_URL}/admin/special-offers/${id}/`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to update special offer");
  },

  deleteSpecialOffer: async (id: number | string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/admin/special-offers/${id}/`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to delete special offer");
  },

  getTodaySpecialOfferSelection: async (): Promise<Array<number | string>> => {
    const response = await fetch(`${API_BASE_URL}/admin/special-offer/`, {
      cache: "no-store",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch daily special offers");
    const data: DailySpecialOffersResponse = await response.json();
    return data.offer_ids;
  },

  getTodaySpecialOfferSelectionData: async (): Promise<DailySelectionMeta> => {
    const response = await fetch(`${API_BASE_URL}/admin/special-offer/`, {
      cache: "no-store",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch daily special offers");
    const data: DailySpecialOffersResponse = await response.json();
    return {
      ids: data.offer_ids,
      updated_at: data.updated_at,
    };
  },

  saveTodaySpecialOfferSelection: async (offerIds: Array<number | string>): Promise<void> => {
    const numericOfferIds = offerIds
      .map((offerId) => Number(offerId))
      .filter((offerId) => Number.isInteger(offerId) && offerId > 0);

    const response = await fetch(`${API_BASE_URL}/admin/special-offer/`, {
      method: "PUT",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ offer_ids: numericOfferIds }),
    });
    if (!response.ok) throw new Error("Failed to save daily special offers");
  },
};
