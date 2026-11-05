"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { adminMenuApi } from "@/lib/adminMenuApi";
import { resolveApiImage } from "@/lib/api";
import styles from "./special-offer.module.scss";

type Offer = {
  id: number;
  text: string;
  banner: string | null;
};

export default function AdminSpecialOfferPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [newText, setNewText] = useState("");
  const [newBanner, setNewBanner] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setError("");
    try {
      const [allOffers, today] = await Promise.all([
        adminMenuApi.getSpecialOffers(),
        adminMenuApi.getTodaySpecialOfferSelectionData(),
      ]);
      setOffers(allOffers);
      setSelectedIds(new Set(today.ids.map(Number)));
    } catch {
      setError("Спецпредложенията не можаха да бъдат заредени.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const toggleOffer = (id: number) => {
    setMessage("");
    setError("");
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < 3) {
        next.add(id);
      } else {
        setError("Можете да изберете най-много 3 спецпредложения.");
      }
      return next;
    });
  };

  const saveSelection = async () => {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await adminMenuApi.saveTodaySpecialOfferSelection(Array.from(selectedIds));
      setMessage("Спецпредложенията за днес са запазени.");
    } catch {
      setError("Изборът не можа да бъде запазен.");
    } finally {
      setBusy(false);
    }
  };

  const createOffer = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!newText.trim() || !newBanner) {
      setError("Добавете текст и изображение за новото спецпредложение.");
      return;
    }

    setBusy(true);
    try {
      await adminMenuApi.createSpecialOffer({ text: newText.trim(), banner: newBanner });
      setNewText("");
      setNewBanner(null);
      setMessage("Новото спецпредложение е създадено.");
      await load();
    } catch {
      setError("Спецпредложението не можа да бъде създадено.");
    } finally {
      setBusy(false);
    }
  };

  const deleteOffer = async (offer: Offer) => {
    if (!window.confirm(`Да изтрием ли „${offer.text}“?`)) return;

    setBusy(true);
    setError("");
    setMessage("");
    try {
      await adminMenuApi.deleteSpecialOffer(offer.id);
      setSelectedIds((current) => {
        const next = new Set(current);
        next.delete(offer.id);
        return next;
      });
      setMessage("Спецпредложението е изтрито.");
      await load();
    } catch {
      setError("Спецпредложението не можа да бъде изтрито.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <span>Съдържание</span>
          <h1>Спецпредложения</h1>
          <p>Изберете до три предложения, които да се показват днес.</p>
        </div>
        <button type="button" onClick={() => void saveSelection()} disabled={busy || loading}>
          {busy ? "Запазване…" : `Запази избора (${selectedIds.size}/3)`}
        </button>
      </header>

      {message ? <p className={styles.message}>{message}</p> : null}
      {error ? <p className={styles.error}>{error}</p> : null}

      <form className={styles.createPanel} onSubmit={createOffer}>
        <div>
          <h2>Ново спецпредложение</h2>
          <p>Добавете кратък текст и изображение за банера.</p>
        </div>
        <input
          value={newText}
          onChange={(event) => setNewText(event.target.value)}
          placeholder="Текст на предложението"
          disabled={busy}
        />
        <label className={styles.fileInput}>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setNewBanner(event.target.files?.[0] ?? null)}
            disabled={busy}
          />
          <span>{newBanner?.name ?? "Избери изображение"}</span>
        </label>
        <button type="submit" disabled={busy}>Създай</button>
      </form>

      {loading ? (
        <p className={styles.state}>Зареждане…</p>
      ) : offers.length === 0 ? (
        <p className={styles.state}>Все още няма създадени спецпредложения.</p>
      ) : (
        <section className={styles.grid} aria-label="Всички спецпредложения">
          {offers.map((offer) => {
            const selected = selectedIds.has(offer.id);
            const image = resolveApiImage(offer.banner);
            return (
              <article className={`${styles.card} ${selected ? styles.selected : ""}`} key={offer.id}>
                <button
                  type="button"
                  className={styles.selectArea}
                  onClick={() => toggleOffer(offer.id)}
                  aria-pressed={selected}
                >
                  <span className={styles.imageWrap}>
                    {image ? <Image src={image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" unoptimized /> : null}
                    <span className={styles.check}>{selected ? "✓" : "+"}</span>
                  </span>
                  <strong>{offer.text || "Без текст"}</strong>
                </button>
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() => void deleteOffer(offer)}
                  disabled={busy}
                >
                  Изтрий
                </button>
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
}
