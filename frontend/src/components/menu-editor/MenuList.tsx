"use client";

import { MenuItem } from "@/components/menu-editor/MenuItem";
import type { Dish } from "@/lib/menuApi";
import styles from "./MenuList.module.scss";

type EditFormData = {
  name: string;
  weight: string;
  price: string;
  category: string;
};

type MenuListProps = {
  items: Dish[];
  categories: string[];
  editingId: number | null;
  editFormData: EditFormData | null;
  isLoading: boolean;
  onEditStart: (item: Dish) => void;
  onEditChange: (field: keyof EditFormData, value: string) => void;
  onEditSave: () => Promise<void>;
  onEditCancel: () => void;
  onDelete: (id: number) => Promise<void>;
};

export function MenuList({
  items,
  categories,
  editingId,
  editFormData,
  isLoading,
  onEditStart,
  onEditChange,
  onEditSave,
  onEditCancel,
  onDelete,
}: MenuListProps) {
  const grouped = items.reduce<Record<string, Dish[]>>((accumulator, item) => {
    const category = item.category || "Другое";
    if (!accumulator[category]) {
      accumulator[category] = [];
    }
    accumulator[category].push(item);
    return accumulator;
  }, {});

  const categoryOrder = Object.keys(grouped).sort((left, right) => {
    const leftIndex = categories.indexOf(left);
    const rightIndex = categories.indexOf(right);

    if (leftIndex === -1 && rightIndex === -1) {
      return left.localeCompare(right);
    }

    if (leftIndex === -1) {
      return 1;
    }

    if (rightIndex === -1) {
      return -1;
    }

    return leftIndex - rightIndex;
  });

  return (
    <div id="menuContainer" className={styles.menuContainer}>
      {isLoading && items.length === 0 ? <p>Loading menu...</p> : null}

      {categoryOrder.map((category) => (
        <section className={styles.categorySection} key={category}>
          <h3>{category}</h3>
          <ul>
            {grouped[category].map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                categories={categories}
                isEditing={editingId === item.id}
                editFormData={editFormData}
                onEditStart={onEditStart}
                onEditChange={onEditChange}
                onEditSave={onEditSave}
                onEditCancel={onEditCancel}
                onDelete={onDelete}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
