"use client";

import { useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import { DishCard } from "@/components/kitchen/DishCard/DishCard";
import { MenuModal } from "@/components/kitchen/MenuModal/MenuModal";
import { menuApi, type Product } from "@/lib/kitchenMenuApi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminAuthApi } from "@/lib/adminMenuApi";

interface KitchenHomePageProps {
  apiClient?: {
    getAll: () => Promise<Product[]>;
  };
}

export default function KitchenHomePage({ apiClient = menuApi }: KitchenHomePageProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const [menuItems, setMenuItems] = useState<Product[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number | string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleAdminLogout = async () => {
    await adminAuthApi.logout();
    window.localStorage.removeItem(adminAuthApi.tokenKey);
    window.location.reload();
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
      <div className={styles.controls}>
        {isAdminRoute ? (
          <Link href="/admin/editing" className={styles.templateBtn}>
            Редактирование
          </Link>
        ) : null}
        <button
          className={styles.templateBtn}
          onClick={() => setIsModalOpen(true)}
          disabled={selectedIds.size === 0}
        >
          Сформировать шаблон ({selectedIds.size})
        </button>
        {isAdminRoute ? (
          <button
            type="button"
            className={styles.iconLogoutBtn}
            onClick={() => void handleAdminLogout()}
            aria-label="Выйти"
            title="Выйти"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4M15 16l5-4-5-4M20 12H9"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : null}
      </div>

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
