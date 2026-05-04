"use client";

import { useEffect, useState } from "react";
import { DishForm } from "@/components/kitchen/DishForm/DishForm";
import { MenuList } from "@/components/kitchen/MenuList/MenuList";
import { menuApi, type Product, type EditProduct } from "@/lib/kitchenMenuApi";
import layoutStyles from "./KitchenApp.module.scss";

interface KitchenEditingPageProps {
  apiClient?: {
    getAll: () => Promise<Product[]>;
    create: typeof menuApi.create;
    update: typeof menuApi.update;
    delete: typeof menuApi.delete;
  };
}

export default function KitchenEditingPage({ apiClient = menuApi }: KitchenEditingPageProps) {
  const AVAILABLE_CATEGORIES = [
    "СУПИ",
    "САЛАТИ",
    "ОСНОВНИ ЯСТИЯ",
    "МЕСО И РИБА",
    "ГАРНИТУРИ",
    "СТУДЕНИ ЯСТИЯ / РАЗЯДКИ",
    "ДЕСЕРТИ",
  ];

  const [menuItems, setMenuItems] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [editFormData, setEditFormData] = useState<EditProduct | null>(null);

  const fetchMenu = async () => {
    try {
      const data = await apiClient.getAll();
      setMenuItems(data);
    } catch (err) {
      console.error("Error fetching menu:", err);
    }
  };

  useEffect(() => {
    let ignore = false;

    const loadData = async () => {
      try {
        const data = await apiClient.getAll();
        if (!ignore) {
          setMenuItems(data);
        }
      } catch (err) {
        console.error("Error fetching menu:", err);
      }
    };

    void loadData();

    return () => {
      ignore = true;
    };
  }, [apiClient]);

  const handleEditClick = (item: Product) => {
    setEditingId(item.id);
    setEditFormData({ ...item, is_spicy: Boolean(item.is_spicy) });
  };

  const handleEditChange = (field: keyof EditProduct, value: string | number | boolean | File | null) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, [field]: value });
    }
  };

  const handleSaveEdit = async () => {
    if (!editFormData) return;

    try {
      const { id, name, description, weight, price, category, is_spicy, image } = editFormData;

      await apiClient.update(id, {
        name,
        description,
        weight: weight != null ? Number(weight) : 0,
        price: Number(price),
        category,
        is_spicy: Boolean(is_spicy),
        ...(image instanceof File ? { image } : {}),
      });

      await fetchMenu();

      setEditingId(null);
      setEditFormData(null);
    } catch (error) {
      console.error("Error updating dish:", error);
      alert("Не удалось обновить блюдо. Проверьте консоль.");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData(null);
  };

  const handleDeleteItem = async (id: number | string) => {
    try {
      await apiClient.delete(id);

      await fetchMenu();

      if (editingId === id) {
        handleCancelEdit();
      }
    } catch (error) {
      console.error("Error deleting dish:", error);
    }
  };

  return (
    <div className={`${layoutStyles.contentContainer} ${layoutStyles.editingContainer}`}>
      <DishForm
        onDishAdded={fetchMenu}
        availableCategories={AVAILABLE_CATEGORIES}
        apiClient={apiClient}
      />

      <MenuList
        items={menuItems}
        editingId={editingId}
        editFormData={editFormData}
        availableCategories={AVAILABLE_CATEGORIES}
        onEditClick={handleEditClick}
        onEditChange={handleEditChange}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
        onDelete={handleDeleteItem}
      />
    </div>
  );
}
