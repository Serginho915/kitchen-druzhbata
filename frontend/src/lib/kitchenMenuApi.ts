export type Product = {
  id: number | string;
  name: string;
  description?: string;
  weight?: number;
  price: number | string;
  category?: string;
  image?: string | null;
  is_spicy?: boolean;
};

export type DishPayload = {
  name: string;
  description?: string;
  weight?: number;
  price: number;
  category?: string;
  image?: File | null;
  is_spicy?: boolean;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api";

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

export const menuApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/dishes/`, { cache: "no-store" });
    if (!response.ok) throw new Error("Failed to fetch menu");
    return response.json();
  },

  update: async (id: number | string, data: Partial<DishPayload>): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/dishes/${id}/`, {
      method: "PATCH",
      body: buildDishFormData(data),
    });
    if (!response.ok) throw new Error("Failed to update item");
  },

  delete: async (id: number | string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/dishes/${id}/`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete item");
  },

  create: async (data: DishPayload): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/dishes/`, {
      method: "POST",
      body: buildDishFormData(data),
    });
    if (!response.ok) throw new Error("Failed to add item");
  },
};
