"use client";

import { useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import { DishCard } from "@/components/kitchen/DishCard/DishCard";
import { MenuModal } from "@/components/kitchen/MenuModal/MenuModal";
import { menuApi, type Product } from "@/lib/kitchenMenuApi";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface KitchenHomePageProps {
  apiClient?: {
    getAll: () => Promise<Product[]>;
    getTodaySelection?: () => Promise<Array<number | string>>;
    getTodaySelectionData?: () => Promise<{ ids: number[]; updated_at: string }>;
    saveTodaySelection?: (dishIds: Array<number | string>) => Promise<void>;
  };
}

export default function KitchenHomePage({ apiClient = menuApi }: KitchenHomePageProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const [menuItems, setMenuItems] = useState<Product[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number | string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSavingDailyMenu, setIsSavingDailyMenu] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const formatLastUpdated = (value: string | null) => {
    if (!value) return "Еще не обновлялось";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Еще не обновлялось";

    return date.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const CATEGORY_ORDER = [
    "СУПИ",
    "САЛАТИ",
    "ОСНОВНИ ЯСТИЯ",
    "МЕСО И РИБА",
    "ГАРНИТУРИ",
    "СТУДЕНИ ЯСТИЯ / РАЗЯДКИ",
    "ДЕСЕРТИ",
  ];

  useEffect(() => {
    let ignore = false;

    const loadData = async () => {
      try {
        const data = await apiClient.getAll();
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
  }, [apiClient]);

  useEffect(() => {
    if (!isAdminRoute || !apiClient.getTodaySelection) return;

    let ignore = false;

    const loadTodaySelection = async () => {
      try {
        if (apiClient.getTodaySelectionData) {
          const data = await apiClient.getTodaySelectionData();
          if (!ignore) {
            setSelectedIds(new Set(data.ids));
            setLastUpdated(data.updated_at);
          }
          return;
        }

        const savedIds = await apiClient.getTodaySelection?.();
        if (!ignore && savedIds) {
          setSelectedIds(new Set(savedIds));
        }
      } catch (err) {
        console.error("Error fetching daily menu selection:", err);
      }
    };

    void loadTodaySelection();

    return () => {
      ignore = true;
    };
  }, [apiClient, isAdminRoute]);

  const toggleSelection = (id: number | string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectedItems = menuItems.filter((item) => selectedIds.has(item.id));

  const handleSaveTodayMenu = async () => {
    if (!apiClient.saveTodaySelection) return;

    try {
      setIsSavingDailyMenu(true);
      await apiClient.saveTodaySelection(Array.from(selectedIds));

      if (apiClient.getTodaySelectionData) {
        const data = await apiClient.getTodaySelectionData();
        setLastUpdated(data.updated_at);
      }

      alert("Меню на сегодня сохранено");
    } catch (err) {
      console.error("Error saving daily menu:", err);
      alert("Не удалось сохранить меню на сегодня");
    } finally {
      setIsSavingDailyMenu(false);
    }
  };

  const groupedItems = menuItems.reduce((accumulator, item) => {
    const category = item.category || "Другое";
    if (!accumulator[category]) accumulator[category] = [];
    accumulator[category].push(item);
    return accumulator;
  }, {} as Record<string, Product[]>);

  const categories = Object.keys(groupedItems).sort((a, b) => {
    const indexA = CATEGORY_ORDER.indexOf(a);
    const indexB = CATEGORY_ORDER.indexOf(b);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });

  return (
    <div className={styles.homeContainer}>
      {isAdminRoute ? (
        <div className={styles.adminTopRow}>
          <div className={styles.adminHeader}>
            <h2 className={styles.adminTitle}>Меню на сегодня</h2>
            <p className={styles.hint}>Выберите позиции меню для текущего дня.</p>
            <p className={styles.updatedAt}>Обновлено: {formatLastUpdated(lastUpdated)}</p>
          </div>

          <div className={styles.controls}>
            <Link href="/admin/menu-editing" className={`${styles.templateBtn} ${styles.secondaryBtn}`}>
              Редактировать
            </Link>
            <button
              className={styles.templateBtn}
              onClick={() => setIsModalOpen(true)}
              disabled={selectedIds.size === 0}
            >
              Сформировать шаблон ({selectedIds.size})
            </button>
            <button
              className={styles.templateBtn}
              onClick={() => void handleSaveTodayMenu()}
              disabled={selectedIds.size === 0 || isSavingDailyMenu}
            >
              {isSavingDailyMenu ? "Сохранение..." : `Сохранить меню на сегодня (${selectedIds.size})`}
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.controls}>
          <button
            className={styles.templateBtn}
            onClick={() => setIsModalOpen(true)}
            disabled={selectedIds.size === 0}
          >
            Сформировать шаблон ({selectedIds.size})
          </button>
        </div>
      )}

      {categories.map((category) => (
        <section key={category} className={styles.categorySection}>
          <h3 className={styles.categoryTitle}>{category}</h3>
          <div className={styles.dishGrid}>
            {groupedItems[category].map((item) => (
              <DishCard
                key={item.id}
                item={item}
                isSelected={selectedIds.has(item.id)}
                onToggle={toggleSelection}
                showFullDetails={Boolean(isAdminRoute)}
                showDescription={!isAdminRoute}
                showImage={!isAdminRoute}
              />
            ))}
          </div>
        </section>
      ))}

      <MenuModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedItems={selectedItems}
      />
    </div>
  );
}
