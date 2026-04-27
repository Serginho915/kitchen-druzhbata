"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminMenuApi } from "@/lib/adminMenuApi";
import layoutStyles from "@/pages/Kitchen/KitchenApp.module.scss";
import styles from "./offer-editing.module.scss";

export default function OfferEditingPage() {
  const [offers, setOffers] = useState<Array<{ id: number; text: string; banner: string | null }>>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number | string>>(new Set());
  const [isSaving, setIsSaving] = useState(false);
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

  useEffect(() => {
    let ignore = false;

    const loadData = async () => {
      try {
        const [allOffers, selectedToday] = await Promise.all([
          adminMenuApi.getSpecialOffers(),
          adminMenuApi.getTodaySpecialOfferSelectionData(),
        ]);

        if (!ignore) {
          setOffers(allOffers);
          setSelectedIds(new Set(selectedToday.ids));
          setLastUpdated(selectedToday.updated_at);
        }
      } catch (error) {
        console.error("Error fetching special offers:", error);
      }
    };

    void loadData();

    return () => {
      ignore = true;
    };
  }, []);

  const resolveImageSrc = (image?: string | null) => {
    if (!image) return null;
    if (image.startsWith("http://") || image.startsWith("https://")) return image;

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api";
    const backendBaseUrl = apiBaseUrl.replace(/\/api\/?$/, "");
    return `${backendBaseUrl}${image.startsWith("/") ? "" : "/"}${image}`;
  };

  const toggleSelectedOffer = (id: number | string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        return next;
      }

      if (next.size >= 3) {
        alert("Можно выбрать не более 3 спецпредложений");
        return prev;
      }

      next.add(id);
      return next;
    });
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await adminMenuApi.saveTodaySpecialOfferSelection(Array.from(selectedIds));

      const updatedData = await adminMenuApi.getTodaySpecialOfferSelectionData();
      setLastUpdated(updatedData.updated_at);

      alert("Спецпредложения на сегодня сохранены");
    } catch (error) {
      console.error("Error saving daily special offers:", error);
      alert("Не удалось сохранить спецпредложения на сегодня");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={`${layoutStyles.contentContainer} ${layoutStyles.editingContainer} ${styles.page}`}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Спецпредложения на сегодня</h2>
        <div className={styles.actions}>
          <Link href="/admin/special-offer/edit" className={`${styles.button} ${styles.secondaryButton}`}>
            Редактировать
          </Link>
          <button type="button" className={styles.button} onClick={() => void handleSave()} disabled={isSaving}>
            {isSaving ? "Сохранение..." : `Сохранить (${selectedIds.size}/3)`}
          </button>
        </div>
      </div>

      <p className={styles.hint}>Выберите до 3 спецпредложений для текущего дня.</p>
      <p className={styles.updatedAt}>Обновлено: {formatLastUpdated(lastUpdated)}</p>

      <div className={styles.grid}>
        {offers.map((offer) => {
          const imageSrc = resolveImageSrc(offer.banner);
          const isSelected = selectedIds.has(offer.id);

          return (
            <article
              key={offer.id}
              className={`${styles.card} ${isSelected ? styles.selected : ""}`}
              onClick={() => toggleSelectedOffer(offer.id)}
            >
              {imageSrc ? <img className={styles.banner} src={imageSrc} alt="Баннер спецпредложения" /> : null}
              <p className={styles.text}>{offer.text || "Без текста"}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
