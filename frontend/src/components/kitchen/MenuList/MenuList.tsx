import { MenuItem } from "@/components/kitchen/MenuItem/MenuItem";
import styles from "./MenuList.module.scss";

import { type Product, type EditProduct } from "@/lib/kitchenMenuApi";

interface MenuListProps {
  items: Product[];
  editingId: number | string | null;
  editFormData: EditProduct | null;
  availableCategories: string[];
  onEditClick: (item: Product) => void;
  onEditChange: (field: keyof EditProduct, value: string | number | boolean | File | null) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: (id: number | string) => void;
}

export function MenuList({
  items,
  editingId,
  editFormData,
  availableCategories,
  onEditClick,
  onEditChange,
  onSave,
  onCancel,
  onDelete,
}: MenuListProps) {
  const groupedItems = items.reduce((accumulator, item) => {
    const category = item.category || "Другое";
    if (!accumulator[category]) {
      accumulator[category] = [];
    }
    accumulator[category].push(item);
    return accumulator;
  }, {} as Record<string, Product[]>);

  const categories = Object.keys(groupedItems).sort((a, b) => {
    const indexA = availableCategories.indexOf(a);
    const indexB = availableCategories.indexOf(b);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });

  return (
    <div id="menuContainer" className={styles.menuContainer}>
      {categories.map((category) => (
        <div key={category} className={styles.categorySection}>
          <h3>{category}</h3>
          <ul>
            {groupedItems[category].map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                isEditing={editingId === item.id}
                editFormData={editFormData}
                availableCategories={availableCategories}
                onEditClick={onEditClick}
                onEditChange={onEditChange}
                onSave={onSave}
                onCancel={onCancel}
                onDelete={onDelete}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
