"use client";

import { useEffect, useState } from "react";
import { DishForm } from "@/components/menu-editor/DishForm";
import { MenuList } from "@/components/menu-editor/MenuList";
import { menuApi, type Dish, type DishPayload } from "@/lib/menuApi";
import styles from "./MenuEditorPage.module.scss";

const AVAILABLE_CATEGORIES = [
  "СУПИ",
  "САЛАТИ",
  "ОСНОВНИ ЯСТИЯ",
  "МЕСО И РИБА",
  "ГАРНИТУРИ",
  "СТУДЕНИ ЯСТИЯ / РАЗЯДКИ",
  "ДЕСЕРТИ",
];

type EditFormData = {
  name: string;
  weight: string;
  price: string;
  category: string;
};

const toPayload = (data: EditFormData): DishPayload => ({
  name: data.name.trim(),
  weight: data.weight.trim() === "" ? 0 : Number(data.weight),
  price: Number(data.price),
  category: data.category,
});

export default function MenuEditorPage() {
  const [items, setItems] = useState<Dish[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<EditFormData | null>(null);

  const loadItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await menuApi.getAll();
      setItems(data);
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "Failed to load menu";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadItems();
  }, []);

  const handleCreate = async (payload: DishPayload) => {
    setError(null);
    try {
      await menuApi.create(payload);
      await loadItems();
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "Failed to create dish";
      setError(message);
    }
  };

  const handleEditStart = (item: Dish) => {
    setEditingId(item.id);
    setEditFormData({
      name: item.name,
      weight: String(item.weight ?? 0),
      price: String(item.price),
      category: item.category ?? "",
    });
  };

  const handleEditChange = (field: keyof EditFormData, value: string) => {
    setEditFormData((previous) => {
      if (!previous) {
        return previous;
      }
      return {
        ...previous,
        [field]: value,
      };
    });
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditFormData(null);
  };

  const handleEditSave = async () => {
    if (editingId === null || editFormData === null) {
      return;
    }

    setError(null);

    try {
      await menuApi.update(editingId, toPayload(editFormData));
      await loadItems();
      handleEditCancel();
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "Failed to update dish";
      setError(message);
    }
  };

  const handleDelete = async (id: number) => {
    setError(null);

    try {
      await menuApi.remove(id);
      await loadItems();
      if (editingId === id) {
        handleEditCancel();
      }
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "Failed to delete dish";
      setError(message);
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.contentContainer}>
        {error ? <p className={styles.errorText}>{error}</p> : null}

        <DishForm
          categories={AVAILABLE_CATEGORIES}
          onCreate={handleCreate}
        />

        <MenuList
          items={items}
          categories={AVAILABLE_CATEGORIES}
          editingId={editingId}
          editFormData={editFormData}
          isLoading={isLoading}
          onEditStart={handleEditStart}
          onEditChange={handleEditChange}
          onEditSave={handleEditSave}
          onEditCancel={handleEditCancel}
          onDelete={handleDelete}
        />
      </div>
    </section>
  );
}
