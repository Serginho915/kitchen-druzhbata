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
  const [dishDescription, setDishDescription] = useState("");
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
        description: dishDescription,
        price,
        weight,
        category: dishCategory,
        image: dishImage,
        special_offer_image: specialOfferImage,
        is_spicy: isSpicy,
      });

      onDishAdded();

      setDishName("");
      setDishDescription("");
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
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Название"
          value={dishName}
          onChange={(event) => setDishName(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          type="text"
          placeholder="Описание"
          value={dishDescription}
          onChange={(event) => setDishDescription(event.target.value)}
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
          Блюдо
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setDishImage(event.target.files?.[0] ?? null)}
          />
        </label>
        <label className={styles.fileInputLabel}>
          Спецпредложение
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setSpecialOfferImage(event.target.files?.[0] ?? null)}
          />
        </label>
        <label className={styles.spicyCheckboxLabel}>
          <input
            type="checkbox"
            checked={isSpicy}
            onChange={(event) => setIsSpicy(event.target.checked)}
          />
          <span>{isSpicy ? "Острое" : "Неострое"}</span>
        </label>
      </div>
      <button onClick={() => void handleAddDish()} className={styles.addButton}>Добавить</button>
    </div>
  );
}
