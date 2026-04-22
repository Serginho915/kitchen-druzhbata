"use client";

import { useState } from "react";
import type { DishPayload } from "@/lib/menuApi";
import styles from "./DishForm.module.scss";

type DishFormProps = {
  categories: string[];
  onCreate: (payload: DishPayload) => Promise<void>;
};

type FormState = {
  name: string;
  weight: string;
  price: string;
  category: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  weight: "",
  price: "",
  category: "",
};

export function DishForm({ categories, onCreate }: DishFormProps) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleAddDish = async () => {
    const parsedPrice = Number(form.price);
    const parsedWeight = form.weight.trim() === "" ? 0 : Number(form.weight);

    if (!form.name.trim() || !form.category) {
      window.alert("Заполните обязательные поля (Название, Цена, Категория)!");
      return;
    }

    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      window.alert("Цена должна быть положительным числом!");
      return;
    }

    if (Number.isNaN(parsedWeight) || parsedWeight < 0) {
      window.alert("Вес не может быть отрицательным!");
      return;
    }

    await onCreate({
      name: form.name.trim(),
      category: form.category,
      price: parsedPrice,
      weight: parsedWeight,
    });

    setForm(INITIAL_FORM);
  };

  const handleKeyDown = async (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      await handleAddDish();
    }
  };

  return (
    <div className={`card ${styles.formCard}`}>
      <h2 className={styles.title}>Добавить позицию в меню</h2>
      <div className={styles.grid}>
        <input
          type="text"
          placeholder="Название"
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          type="number"
          placeholder="Вес"
          min="0"
          value={form.weight}
          onChange={(event) => updateField("weight", event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          type="number"
          placeholder="Цена"
          min="0"
          step="0.01"
          value={form.price}
          onChange={(event) => updateField("price", event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <select
          value={form.category}
          onChange={(event) => updateField("category", event.target.value)}
          onKeyDown={handleKeyDown}
        >
          <option value="" disabled>
            Выберите категорию
          </option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <button type="button" onClick={() => void handleAddDish()} className={styles.addButton}>
        Добавить
      </button>
    </div>
  );
}
