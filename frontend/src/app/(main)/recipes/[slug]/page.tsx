"use client";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { recipesApi, type RecipePost } from "@/lib/recipesApi";
import { MarkdownArticle } from "@/components/content/MarkdownArticle";
import styles from "./recipe.module.scss";

export default function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [recipe, setRecipe] = useState<RecipePost | null>(null);
  const [error, setError] = useState("");
  useEffect(() => { recipesApi.get(decodeURIComponent(slug)).then(setRecipe).catch((e) => setError(e.message)); }, [slug]);
  if (error) return <main className={styles.state}><h1>{error}</h1><Link href="/">Назад към рецептите</Link></main>;
  if (!recipe) return <main className={styles.state}>Рецептата се сервира…</main>;
  return <main className={styles.page}>
    <header className={styles.hero}><Link href="/">← Всички рецепти</Link><span>Кулинарна литература · {new Intl.DateTimeFormat("bg-BG", { day: "numeric", month: "long", year: "numeric" }).format(new Date(recipe.published_at))}</span><h1>{recipe.title}</h1><p>{recipe.excerpt}</p></header>
    <article className={styles.paper}><MarkdownArticle content={recipe.content} /></article>
    <aside className={styles.callout}><span>🥄</span><div><h2>Сготвихте ли я?</h2><p>Разкажете ни по телефона. Приемаме комплименти, въпроси и разумно количество семейни спорове.</p></div><a href="tel:+359885899908">+359 885899908</a></aside>
  </main>;
}
