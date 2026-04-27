"use client";

import { useEffect, useState } from "react";
import { adminMenuApi } from "@/lib/adminMenuApi";
import layoutStyles from "@/pages/Kitchen/KitchenApp.module.scss";
import Link from "next/link";
import styles from "./edit-offer.module.scss";

type OfferItem = {
  id: number;
  text: string;
  banner: string | null;
};

export default function OfferEditingManagePage() {
  const [offers, setOffers] = useState<OfferItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<OfferItem | null>(null);
  const [newText, setNewText] = useState("");
  const [newBanner, setNewBanner] = useState<File | null>(null);
  const [editBannerFile, setEditBannerFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState<number | null>(null);

  const loadOffers = async () => {
    try {
      const data = await adminMenuApi.getSpecialOffers();
      setOffers(data);
    } catch (error) {
      console.error("Error fetching special offers:", error);
      alert("Не удалось загрузить спецпредложения");
    }
  };

  useEffect(() => {
    void loadOffers();
  }, []);

  const resolveImageSrc = (image?: string | null) => {
    if (!image) return null;
    if (image.startsWith("http://") || image.startsWith("https://")) return image;

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api";
    const backendBaseUrl = apiBaseUrl.replace(/\/api\/?$/, "");
    return `${backendBaseUrl}${image.startsWith("/") ? "" : "/"}${image}`;
  };

  const handleCreate = async () => {
    if (!newText.trim()) {
      alert("Введите текст спецпредложения");
      return;
    }

    try {
      setIsSaving(true);
      await adminMenuApi.createSpecialOffer({ text: newText.trim(), banner: newBanner });
      setNewText("");
      setNewBanner(null);
      await loadOffers();
    } catch (error) {
      console.error("Error creating special offer:", error);
      alert("Не удалось создать спецпредложение");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editFormData) return;

    try {
      await adminMenuApi.updateSpecialOffer(editFormData.id, {
        text: editFormData.text,
        banner: editBannerFile,
      });
      setEditingId(null);
      setEditFormData(null);
      setEditBannerFile(null);
      await loadOffers();
    } catch (error) {
      console.error("Error updating special offer:", error);
      alert("Не удалось обновить спецпредложение");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData(null);
    setEditBannerFile(null);
  };

  const handleEditClick = (offer: OfferItem) => {
    setEditingId(offer.id);
    setEditFormData({ ...offer });
  };

  const handleEditChange = (field: keyof OfferItem, value: string) => {
    if (!editFormData) return;
    setEditFormData({ ...editFormData, [field]: value });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Удалить спецпредложение?")) return;

    try {
      await adminMenuApi.deleteSpecialOffer(id);
      await loadOffers();
    } catch (error) {
      console.error("Error deleting special offer:", error);
      alert("Не удалось удалить спецпредложение");
    }
  };

  return (
    <div className={`${layoutStyles.contentContainer} ${layoutStyles.editingContainer} ${styles.page}`}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Редактирование спецпредложений</h2>
        <Link href="/admin/special-offer" className={styles.backBtn}>
          Назад
        </Link>
      </div>

      <div className={styles.formCard}>
        <div className={styles.inputGroup}>
          <input
            className={styles.titleInput}
            value={newText}
            onChange={(event) => setNewText(event.target.value)}
            placeholder="Текст спецпредложения"
          />
          <div className={styles.fileInputLabel}>
            <label className={styles.fileInputWrapper}>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => setNewBanner(event.target.files?.[0] ?? null)}
              />
              <span className={styles.fileButtonText}>{newBanner ? newBanner.name : "Фото баннера"}</span>
            </label>
          </div>
        </div>
        <button type="button" className={styles.addButton} disabled={isSaving} onClick={() => void handleCreate()}>
          {isSaving ? "Сохранение..." : "Создать"}
        </button>
      </div>

      <div className={styles.menuContainer}>
        <h3>Все спецпредложения</h3>
        <ul className={styles.offerList}>
          {offers.map((offer) => {
            const imageSrc = resolveImageSrc(offer.banner);
            const isEditing = editingId === offer.id;

            return (
              <li key={offer.id} className={styles.menuItem}>
                {isEditing ? (
                  <div className={styles.editContainer}>
                    <div className={styles.editField}>
                      <span className={styles.label}>Текст</span>
                      <input
                        className={styles.titleInput}
                        value={editFormData?.text || ""}
                        onChange={(event) => handleEditChange("text", event.target.value)}
                      />
                    </div>
                    <div className={styles.editField}>
                      <div className={styles.fileInputLabel}>
                        <label className={styles.fileInputWrapper}>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => setEditBannerFile(event.target.files?.[0] ?? null)}
                          />
                          <span className={styles.fileButtonText}>
                            {editBannerFile ? editBannerFile.name : "Заменить фото"}
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className={styles.editActions}>
                      <button onClick={() => void handleSaveEdit()} className={`${styles.actionButton} ${styles.ok}`}>
                        OK
                      </button>
                      <button onClick={handleCancelEdit} className={`${styles.actionButton} ${styles.cancel}`}>
                        X
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className={styles.itemText}>
                      <strong>#{offer.id}</strong>
                      {offer.text || "Без текста"}
                    </span>
                    <div className={styles.actions}>
                      {isConfirmingDelete === offer.id ? (
                        <div className={styles.confirmDelete}>
                          <span className={styles.confirmText}>Уверены?</span>
                          <button
                            className={`${styles.actionButton} ${styles.ok}`}
                            onClick={() => void handleDelete(offer.id)}
                          >
                            Да
                          </button>
                          <button
                            className={`${styles.actionButton} ${styles.cancel}`}
                            onClick={() => setIsConfirmingDelete(null)}
                          >
                            Нет
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            className={`${styles.actionButton} ${styles.edit}`}
                            onClick={() => handleEditClick(offer)}
                          >
                            Ред.
                          </button>
                          <button
                            className={`${styles.actionButton} ${styles.delete}`}
                            onClick={() => setIsConfirmingDelete(offer.id)}
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
          })}
        </ul>
      </div>
    </div>
  );
}
