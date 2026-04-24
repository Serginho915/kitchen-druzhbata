"use client";

import { useState } from "react";
import styles from "./MenuItem.module.scss";

import { type Product } from "@/lib/kitchenMenuApi";

interface MenuItemProps {
  item: Product;
  isEditing: boolean;
  editFormData: Product | null;
  availableCategories: string[];
  onEditClick: (item: Product) => void;
  onEditChange: (field: keyof Product, value: string | number | boolean | File | null) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: (id: number | string) => void;
}

export function MenuItem({
  item,
  isEditing,
  editFormData,
  availableCategories,
  onEditClick,
  onEditChange,
  onSave,
  onCancel,
  onDelete,
}: MenuItemProps) {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const handleDeleteClick = () => {
    setIsConfirmingDelete(true);
  };

  const handleConfirmDelete = () => {
    onDelete(item.id);
    setIsConfirmingDelete(false);
  };

  const handleCancelDelete = () => {
    setIsConfirmingDelete(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      onSave();
    } else if (event.key === "Escape") {
      onCancel();
    }
  };

  return (
    <li className={styles.menuItem}>
      {isEditing ? (
        <div className={styles.editContainer}>
          <div className={styles.editField}>
            <span className={styles.label}>Название</span>
            <input
              className={styles.inputEdit}
              value={editFormData?.name || ""}
              onChange={(event) => onEditChange("name", event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Название"
              autoFocus
            />
          </div>
          <div className={styles.editField}>
            <span className={styles.label}>Описание</span>
            <input
              className={styles.inputEdit}
              value={editFormData?.description || ""}
              onChange={(event) => onEditChange("description", event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Описание"
            />
          </div>
          <div className={styles.editField}>
            <span className={styles.label}>Вес (г)</span>
            <input
              className={styles.inputEdit}
              type="number"
              value={editFormData?.weight !== undefined ? editFormData.weight : ""}
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
              value={editFormData?.price !== undefined ? editFormData.price : ""}
              onChange={(event) => onEditChange("price", event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Цена"
            />
          </div>
          <div className={styles.editField}>
            <span className={styles.label}>Категория</span>
            <select
              className={styles.inputEdit}
              value={editFormData?.category || ""}
              onChange={(event) => onEditChange("category", event.target.value)}
              onKeyDown={handleKeyDown}
            >
              {availableCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.editField}>
            <span className={styles.label}>Острота</span>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={Boolean(editFormData?.is_spicy)}
                onChange={(event) => onEditChange("is_spicy", event.target.checked)}
              />
              <span>{editFormData?.is_spicy ? "Острое" : "Неострое"}</span>
            </label>
          </div>
          <div className={styles.editField}>
            <span className={styles.label}>Блюдо</span>
            <label className={styles.fileInputLabel}>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => onEditChange("image", event.target.files?.[0] ?? null)}
              />
            </label>
          </div>
          <div className={styles.editField}>
            <span className={styles.label}>Спецпредложение</span>
            <label className={styles.fileInputLabel}>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => onEditChange("special_offer_image", event.target.files?.[0] ?? null)}
              />
            </label>
          </div>
          <div className={styles.editActions}>
            <button onClick={onSave} className={`${styles.actionButton} ${styles.ok}`}>OK</button>
            <button onClick={onCancel} className={`${styles.actionButton} ${styles.cancel}`}>X</button>
          </div>
        </div>
      ) : (
        <>
          <span className={styles.itemText}>
            <strong>{item.name}</strong>
            {item.weight && item.weight > 0 ? ` (${item.weight}г)` : ""}
            {" — "}
            {(() => {
              const parsedPrice = Number(item.price);
              return Number.isNaN(parsedPrice) ? "N/A" : parsedPrice.toFixed(2);
            })()}
            €
            <span className={`${styles.spicyBadge} ${item.is_spicy ? styles.spicy : styles.notSpicy}`}>
              {item.is_spicy ? "Острое" : "Неострое"}
            </span>
          </span>
          <div className={styles.actions}>
            {isConfirmingDelete ? (
              <div className={styles.confirmDelete}>
                <span className={styles.confirmText}>Уверены?</span>
                <button className={`${styles.actionButton} ${styles.ok}`} onClick={handleConfirmDelete}>Да</button>
                <button className={`${styles.actionButton} ${styles.cancel}`} onClick={handleCancelDelete}>Нет</button>
              </div>
            ) : (
              <>
                <button className={`${styles.actionButton} ${styles.edit}`} onClick={() => onEditClick(item)}>Ред.</button>
                <button className={`${styles.actionButton} ${styles.delete}`} onClick={handleDeleteClick}>Удалить</button>
              </>
            )}
          </div>
        </>
      )}
    </li>
  );
}
