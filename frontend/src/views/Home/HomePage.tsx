"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaBookOpen, FaBowlFood, FaChampagneGlasses } from "react-icons/fa6";
import { recipesApi, type RecipePost } from "@/lib/recipesApi";
import styles from "./HomePage.module.scss";

export default function HomePage() {
  const [recipes, setRecipes] = useState<RecipePost[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { recipesApi.list().then(setRecipes).catch(() => setRecipes([])).finally(() => setLoading(false)); }, []);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>SofiaFood представя</span>
          <h1>Рецепти, които се четат до последната троха.</h1>
          <p>Всяка седмица — нова кулинарна история с точна рецепта, български характер и умерено количество семейна драма.</p>
          <a href="#latest" className={styles.primaryButton}>Към рецептите <FaArrowRight /></a>
        </div>
        <div className={styles.heroAside}>
          <span className={styles.bigEmoji}>🍲</span>
          <p>Храната е сериозна работа. За щастие, текстът не е длъжен да бъде.</p>
        </div>
      </section>

      <section className={styles.paths} aria-label="Услуги">
        <Link href="/" className={`${styles.pathCard} ${styles.yellow}`}><FaBookOpen /><div><b>Рецепти</b><span>Седмичният ни кулинарен разказ</span></div></Link>
        <Link href="/subscriptions" className={`${styles.pathCard} ${styles.green}`}><FaBowlFood /><div><b>Супскрипшън</b><span>Топла супа всеки работен ден</span></div></Link>
        <Link href="/specialties" className={`${styles.pathCard} ${styles.dark}`}><FaChampagneGlasses /><div><b>Специалитети</b><span>Кетъринг за малки и големи поводи</span></div></Link>
      </section>

      <section id="latest" className={styles.latest}>
        <div className={styles.sectionHeading}><div><span>Прясно от редакцията</span><h2>Последни рецепти</h2></div><p>Практични инструкции, подправени с текст, който не звучи като упътване за пералня.</p></div>
        {loading ? <p className={styles.state}>Зареждаме тенджерата…</p> : recipes.length ? (
          <div className={styles.recipeGrid}>{recipes.map((recipe, index) => (
            <article key={recipe.id} className={styles.recipeCard}>
              <div className={styles.cardVisual}><span>{["🥘","🍝","🥧","🍲"][index % 4]}</span><small>{new Intl.DateTimeFormat("bg-BG", { day: "numeric", month: "long", year: "numeric" }).format(new Date(recipe.published_at))}</small></div>
              <div className={styles.cardBody}><h3>{recipe.title}</h3><p>{recipe.excerpt}</p><Link href={`/recipes/${recipe.slug}`}>Прочети и сготви <FaArrowRight /></Link></div>
            </article>
          ))}</div>
        ) : <div className={styles.empty}><span>🥄</span><h3>Първата рецепта къкри.</h3><p>Щом редакторът каже „готово“, тя ще се появи тук.</p></div>}
      </section>
    </main>
  );
}
