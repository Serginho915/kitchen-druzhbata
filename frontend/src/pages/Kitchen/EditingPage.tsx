"use client";

import { useEffect, useState } from "react";
import { DishForm } from "@/components/kitchen/DishForm/DishForm";
import { MenuList } from "@/components/kitchen/MenuList/MenuList";
import { menuApi, type Product } from "@/lib/kitchenMenuApi";
import layoutStyles from "./KitchenApp.module.scss";

export default function KitchenEditingPage() {
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
  const [editFormData, setEditFormData] = useState<Product | null>(null);

  const fetchMenu = async () => {
    try {
      const data = await menuApi.getAll();
      setMenuItems(data);
    } catch (err) {
      console.error("Error fetching menu:", err);
    }
  };

  useEffect(() => {
    let ignore = false;

    const loadData = async () => {
      try {
        const data = await menuApi.getAll();
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
  }, []);

  const handleEditClick = (item: Product) => {
    setEditingId(item.id);
    setEditFormData({ ...item, is_spicy: Boolean(item.is_spicy) });
  };

  const handleEditChange = (field: keyof Product, value: string | number | boolean) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, [field]: value });
    }
  };

  const handleSaveEdit = async () => {
    if (!editFormData) return;

    try {
      const { id, name, weight, price, category, is_spicy } = editFormData;

      await menuApi.update(id, {
        name,
        weight: weight !== undefined && weight !== "" ? Number(weight) : 0,
        price: Number(price),
        category,
        is_spicy: Boolean(is_spicy),
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
      await menuApi.delete(id);

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
