"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { KitchenHeader } from "@/components/kitchen/Header/Header";
import { DishForm } from "@/components/kitchen/DishForm/DishForm";
import { MenuList } from "@/components/kitchen/MenuList/MenuList";
import { adminMenuApi } from "@/lib/adminMenuApi";
import { type DishPayload, type Product } from "@/lib/kitchenMenuApi";
import layoutStyles from "@/pages/Kitchen/KitchenApp.module.scss";
import styles from "./AdminPanel.module.scss";

const TOKEN_KEY = "kitchen-admin-token";
const AVAILABLE_CATEGORIES = [
  "СУПИ",
  "САЛАТИ",
  "ОСНОВНИ ЯСТИЯ",
  "МЕСО И РИБА",
  "ГАРНИТУРИ",
  "СТУДЕНИ ЯСТИЯ / РАЗЯДКИ",
  "ДЕСЕРТИ",
];

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"constructor" | "today">("constructor");

  const [menuItems, setMenuItems] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [editFormData, setEditFormData] = useState<Product | null>(null);

  const [todayMenuDate, setTodayMenuDate] = useState<string | null>(null);
  const [todayMenuUpdatedAt, setTodayMenuUpdatedAt] = useState<string | null>(null);
  const [selectedTodayIds, setSelectedTodayIds] = useState<Array<number | string>>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem(TOKEN_KEY);
    if (stored) {
      setToken(stored);
    }
  }, []);

  const loadDishes = async () => {
    if (!token) return;
    const dishes = await adminMenuApi.getAllDishes(token);
    setMenuItems(dishes);
  };

  const loadTodayMenu = async () => {
    if (!token) return;
    const data = await adminMenuApi.getTodayMenu(token);
    setTodayMenuDate(data.date);
    setTodayMenuUpdatedAt(data.updated_at);
    setSelectedTodayIds(data.dishes.map((dish) => dish.id));
  };

  useEffect(() => {
    if (!token) return;
    void Promise.all([loadDishes(), loadTodayMenu()]).catch((err: unknown) => {
      setError(err instanceof Error ? err.message : "Ошибка загрузки");
    });
  }, [token]);

  const login = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const data = await adminMenuApi.login(username, password);
      setToken(data.token);
      window.localStorage.setItem(TOKEN_KEY, data.token);
      setPassword("");
    } catch {
      setError("Неверный логин или пароль");
    }
  };

  const logout = async () => {
    if (token) {
      try {
        await adminMenuApi.logout(token);
      } catch (err) {
        console.error("Failed to logout", err);
      }
    }
    window.localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setMenuItems([]);
    setTodayMenuDate(null);
    setTodayMenuUpdatedAt(null);
    setSelectedTodayIds([]);
    setEditingId(null);
    setEditFormData(null);
  };

  const adminDishFormApi = useMemo(() => {
    return {
      create: async (data: DishPayload) => {
        if (!token) throw new Error("Unauthorized");
        await adminMenuApi.createDish(token, data);
      },
    };
  }, [token]);

  const handleDishAdded = async () => {
    setError("");
    await loadDishes();
    await loadTodayMenu();
  };

  const handleEditClick = (item: Product) => {
    setEditingId(item.id);
    setEditFormData({ ...item, is_spicy: Boolean(item.is_spicy) });
  };

  const handleEditChange = (field: keyof Product, value: string | number | boolean) => {
    if (!editFormData) return;
    setEditFormData({ ...editFormData, [field]: value });
  };

  const saveEdit = async () => {
    if (!token || !editFormData) return;

    try {
      const { id, name, weight, price, category, is_spicy } = editFormData;
      await adminMenuApi.updateDish(token, id, {
        name,
        weight: weight !== undefined && weight !== "" ? Number(weight) : 0,
        price: Number(price),
        category,
        is_spicy: Boolean(is_spicy),
      });

      setEditingId(null);
      setEditFormData(null);
      await loadDishes();
      await loadTodayMenu();
    } catch {
      setError("Не удалось сохранить изменения");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditFormData(null);
  };

  const deleteDish = async (dishId: number | string) => {
    if (!token) return;

    try {
      await adminMenuApi.deleteDish(token, dishId);
      await loadDishes();
      await loadTodayMenu();
      if (editingId === dishId) {
        cancelEdit();
      }
    } catch {
      setError("Не удалось удалить блюдо");
    }
  };

  const saveTodayMenu = async () => {
    if (!token) return;

    try {
      const data = await adminMenuApi.saveTodayMenu(token, selectedTodayIds);
      setTodayMenuDate(data.date);
      setTodayMenuUpdatedAt(data.updated_at);
      setSelectedTodayIds(data.dishes.map((dish) => dish.id));
      setError("");
    } catch {
      setError("Не удалось сохранить сегодняшнее меню");
    }
  };

  const toggleTodayDish = (id: number | string) => {
    setSelectedTodayIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id],
    );
  };

  if (!token) {
    return (
      <div className={styles.page}>
        <KitchenHeader />
        <div className={styles.loginCard}>
          <h1 className={styles.title}>Вход в конструктор меню</h1>
          <p className={styles.meta}>/admin открывает расширенный конструктор меню после авторизации.</p>
          <form className={styles.loginForm} onSubmit={login}>
            <input
              className={styles.input}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Логин"
              autoComplete="username"
            />
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Пароль"
              autoComplete="current-password"
            />
            <button className={styles.primaryButton} type="submit">Войти</button>
          </form>
          {error ? <p className={styles.error}>{error}</p> : null}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <KitchenHeader />
      <div className={styles.topbar}>
        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tabButton} ${tab === "constructor" ? styles.tabButtonActive : ""}`}
            onClick={() => setTab("constructor")}
          >
            Конструктор меню
          </button>
          <button
            type="button"
            className={`${styles.tabButton} ${tab === "today" ? styles.tabButtonActive : ""}`}
            onClick={() => setTab("today")}
          >
            Сегодняшнее меню
          </button>
        </div>
        <button type="button" className={styles.logoutButton} onClick={() => void logout()}>
          Выйти
        </button>
      </div>

      {tab === "constructor" ? (
        <div className={`${layoutStyles.contentContainer} ${layoutStyles.editingContainer}`}>
          <DishForm
            onDishAdded={() => void handleDishAdded()}
            availableCategories={AVAILABLE_CATEGORIES}
            apiClient={adminDishFormApi}
          />

          <MenuList
            items={menuItems}
            editingId={editingId}
            editFormData={editFormData}
            availableCategories={AVAILABLE_CATEGORIES}
            onEditClick={handleEditClick}
            onEditChange={handleEditChange}
            onSave={() => void saveEdit()}
            onCancel={cancelEdit}
            onDelete={(id) => void deleteDish(id)}
          />
        </div>
      ) : (
        <div className={`${layoutStyles.contentContainer} ${layoutStyles.editingContainer}`}>
          <section className={styles.todaySection}>
            <h2 className={styles.title}>Сформировать сегодняшнее меню</h2>
            <p className={styles.meta}>
              Отметьте блюда для публикации сегодня. Список сохраняется в базе и доступен для следующей интеграции API.
            </p>

            <div className={styles.todayGrid}>
              {menuItems.map((item) => (
                <label key={item.id} className={styles.todayItem}>
                  <input
                    type="checkbox"
                    checked={selectedTodayIds.includes(item.id)}
                    onChange={() => toggleTodayDish(item.id)}
                  />
                  <span>
                    <strong>{item.name}</strong>
                    <br />
                    {item.category || "Без категории"}
                  </span>
                </label>
              ))}
            </div>

            <div className={styles.todayActions}>
              <button type="button" className={styles.primaryButton} onClick={() => void saveTodayMenu()}>
                Сохранить сегодняшнее меню
              </button>
              <p className={styles.meta}>
                Дата: {todayMenuDate || "-"} | Обновлено: {todayMenuUpdatedAt || "-"}
              </p>
            </div>
          </section>
        </div>
      )}

      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
}
