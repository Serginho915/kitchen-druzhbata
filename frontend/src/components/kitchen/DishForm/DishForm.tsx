"use client";

import { useState } from "react";
import styles from "./DishForm.module.scss";
import { menuApi } from "@/lib/kitchenMenuApi";
import { type DishPayload } from "@/lib/kitchenMenuApi";

interface DishFormProps {
  onDishAdded: () => void;
  availableCategories: string[];
  apiClient?: {
    create: (data: DishPayload) => Promise<void>;
  };
}

export function DishForm({ onDishAdded, availableCategories, apiClient = menuApi }: DishFormProps) {
  const [dishName, setDishName] = useState("");
  const [dishPrice, setDishPrice] = useState("");
  const [dishWeight, setDishWeight] = useState("");
  const [dishCategory, setDishCategory] = useState("");
  const [dishImage, setDishImage] = useState<File | null>(null);
  const [specialOfferImage, setSpecialOfferImage] = useState<File | null>(null);
  const [isSpicy, setIsSpicy] = useState(false);

  const handleAddDish = async () => {
    if (!dishName || !dishPrice || !dishCategory) {
      alert("Заполните обязательные поля (Название, Цена, Категория)!");
      return;
    }

    const weight = dishWeight !== "" ? Number(dishWeight) : undefined;
    if (weight !== undefined && weight < 0) {
      alert("Вес не может быть отрицательным!");
      return;
    }

    const price = Number(dishPrice);
    if (Number.isNaN(price) || price < 0) {
      alert("Цена должна быть положительным числом!");
      return;
    }

    try {
      await apiClient.create({
        name: dishName,
        price,
        weight,
        category: dishCategory,
        image: dishImage,
        special_offer_image: specialOfferImage,
        is_spicy: isSpicy,
      });

      onDishAdded();

      setDishName("");
      setDishPrice("");
      setDishWeight("");
      setDishCategory("");
      setDishImage(null);
      setSpecialOfferImage(null);
      setIsSpicy(false);
    } catch (error) {
      console.error("Error adding dish:", error);
      alert("Ошибка при добавлении блюда");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      void handleAddDish();
    }
  };

  return (
    <div className={styles.formCard}>
      <h2 className={styles.title}>Добавить позицию в меню</h2>
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Название"
          value={dishName}
          onChange={(event) => setDishName(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          type="number"
          placeholder="Вес"
          min="0"
          value={dishWeight}
          onChange={(event) => setDishWeight(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          type="number"
          placeholder="Цена"
          min="0"
          step="0.01"
          value={dishPrice}
          onChange={(event) => setDishPrice(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <select
          value={dishCategory}
          onChange={(event) => setDishCategory(event.target.value)}
          onKeyDown={handleKeyDown}
        >
          <option value="" disabled>
            Выберите категорию
          </option>
          {availableCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <label className={styles.fileInputLabel}>
          Фото блюда
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setDishImage(event.target.files?.[0] ?? null)}
          />
        </label>
        <label className={styles.fileInputLabel}>
          Фото спецпредложения
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setSpecialOfferImage(event.target.files?.[0] ?? null)}
          />
        </label>
        <div className={styles.spicyToggle} role="group" aria-label="Острота блюда">
          <button
            type="button"
            className={`${styles.spicyOption} ${isSpicy ? "" : styles.active}`}
            onClick={() => setIsSpicy(false)}
          >
            Неострое
          </button>
          <button
            type="button"
            className={`${styles.spicyOption} ${isSpicy ? styles.active : ""}`}
            onClick={() => setIsSpicy(true)}
          >
            Острое
          </button>
        </div>
      </div>
      <button onClick={() => void handleAddDish()} className={styles.addButton}>Добавить</button>
    </div>
  );
}
