"use client";

import { useState } from "react";
import type { Dish } from "@/lib/menuApi";
import styles from "./MenuItem.module.scss";

type EditFormData = {
  name: string;
  weight: string;
  price: string;
  category: string;
};

type MenuItemProps = {
  item: Dish;
  categories: string[];
  isEditing: boolean;
  editFormData: EditFormData | null;
  onEditStart: (item: Dish) => void;
  onEditChange: (field: keyof EditFormData, value: string) => void;
  onEditSave: () => Promise<void>;
  onEditCancel: () => void;
  onDelete: (id: number) => Promise<void>;
};

export function MenuItem({
  item,
  categories,
  isEditing,
  editFormData,
  onEditStart,
  onEditChange,
  onEditSave,
  onEditCancel,
  onDelete,
}: MenuItemProps) {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const handleDeleteClick = () => {
    setIsConfirmingDelete(true);
  };

  const handleConfirmDelete = async () => {
    await onDelete(item.id);
    setIsConfirmingDelete(false);
  };

  const handleCancelDelete = () => {
    setIsConfirmingDelete(false);
  };

  const handleKeyDown = async (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      await onEditSave();
    }

    if (event.key === "Escape") {
      onEditCancel();
    }
  };

  return (
    <li className={styles.menuItem}>
      {isEditing && editFormData ? (
        <div className={styles.editContainer}>
          <div className={styles.editField}>
            <span className={styles.label}>Название</span>
            <input
              className={styles.inputEdit}
              type="text"
              value={editFormData.name}
              onChange={(event) => onEditChange("name", event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Название"
              autoFocus
            />
          </div>

          <div className={styles.editField}>
            <span className={styles.label}>Вес (г)</span>
            <input
              className={styles.inputEdit}
              type="number"
              value={editFormData.weight}
              onChange={(event) => onEditChange("weight", event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Вес"
            />
          </div>

          <div className={styles.editField}>
            <span className={styles.label}>Цена (€)</span>
            <input
              className={styles.inputEdit}
              type="number"
              step="0.01"
              value={editFormData.price}
              onChange={(event) => onEditChange("price", event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Цена"
            />
          </div>

          <div className={styles.editField}>
            <span className={styles.label}>Категория</span>
            <select
              className={styles.inputEdit}
              value={editFormData.category}
              onChange={(event) => onEditChange("category", event.target.value)}
              onKeyDown={handleKeyDown}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.editActions}>
            <button type="button" onClick={() => void onEditSave()} className={`${styles.actionButton} ${styles.ok}`}>
              OK
            </button>
            <button type="button" onClick={onEditCancel} className={`${styles.actionButton} ${styles.cancel}`}>
              X
            </button>
          </div>
        </div>
      ) : (
        <>
          <span>
            <strong>{item.name}</strong>
            {item.weight && item.weight > 0 ? ` (${item.weight}г)` : ""}
            {" — "}
            {(() => {
              const parsed = Number(item.price);
              return Number.isNaN(parsed) ? "N/A" : parsed.toFixed(2);
            })()}
            €
          </span>

          <div className={styles.actions}>
            {isConfirmingDelete ? (
              <div className={styles.confirmDelete}>
                <span className={styles.confirmText}>Уверены?</span>
                <button
                  type="button"
                  className={`${styles.actionButton} ${styles.ok}`}
                  onClick={() => void handleConfirmDelete()}
                >
                  Да
                </button>
                <button
                  type="button"
                  className={`${styles.actionButton} ${styles.cancel}`}
                  onClick={handleCancelDelete}
                >
                  Нет
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  className={`${styles.actionButton} ${styles.edit}`}
                  onClick={() => onEditStart(item)}
                >
                  Ред.
                </button>
                <button
                  type="button"
                  className={`${styles.actionButton} ${styles.delete}`}
                  onClick={handleDeleteClick}
                >
                  Удалить
                </button>
              </>
            )}
          </div>
        </>
      )}
    </li>
  );
}
