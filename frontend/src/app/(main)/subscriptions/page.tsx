import styles from "../content-pages.module.scss";
import { FaBowlFood, FaEuroSign, FaPhone, FaQuoteLeft } from "react-icons/fa6";

const soups = [
  ["🐔","Пилешка супа","Класика, която лекува и понеделнишкото настроение."],["🥩","Телешко варено","Сериозна супа за сериозни хора."],["🍄","Гъбена крем супа","Нежна, ароматна и почти аристократична."],["🫘","Боб чорба","Национално богатство, което още не е приватизирано."],["🥕","Зеленчукова супа","Витаминна дипломация между моркова и картофа."],["🍅","Доматена крем супа","Средиземноморско слънце в купичка."],["🥔","Картофена крем супа","Доказателство, че щастието не изисква скъпи продукти."],["🐟","Рибена чорба","Вкус на море, без да вземате отпуск."],["🥣","Шкембе чорба","За смелите и оцелелите след фирменото парти."],["🌿","Супа от леща","Скромна на вид, богата по душа."],["🍲","Супа топчета","Малките кюфтенца с големи амбиции."],["🧀","Броколи с чедър","Зеленчуците най-после получават заслужено уважение."],["🇺🇦","Украински борш","Международна класика с характер и цвят."],["🥬","Спаначена крем супа","Попай би си поръчал втора порция."],["🇮🇹","Минестроне","Италианска ваканция между две срещи в Teams."],["🎃","Тиквена крем супа","Кадифена, ароматна и без нужда от приказна фея."],
];

export default function SubscriptionsPage() { return <main className={styles.page}>
  <section className={`${styles.hero} ${styles.subscriptionHero}`}>
    <div className={styles.heroCopy}>
      <span className={styles.kicker}>Супскрипшън за офиса</span>
      <h1>Топла супа. Всеки работен ден.</h1>
      <p>Прясно приготвена, гореща и доставена директно във вашия офис — точно навреме за обяд.</p>
      <div className={styles.heroActions}>
        <a className={styles.heroCta} href="tel:+359885899908"><FaPhone /> Обадете се: +359 885899908</a>
        <span className={styles.heroNote}>Без готвене. Без опашки.</span>
      </div>
    </div>
    <aside className={styles.planCard}>
      <div className={styles.planTop}><span>Месечен абонамент</span><span className={styles.planIcon}><FaBowlFood /></span></div>
      <div className={styles.planPrice}><strong>50 €</strong><span>на месец</span></div>
      <ul>
        <li>Доставка всеки работен ден</li>
        <li>16 различни супи в менюто</li>
        <li>Термос или индивидуална опаковка</li>
      </ul>
    </aside>
  </section>
  <section className={styles.introGrid}><div className={styles.quote}><span className={styles.cardIcon}><FaQuoteLeft /></span><span>„Netflix има сериали. Spotify има музика. А ние имаме супа!“</span></div><div className={styles.priceCard}><span className={styles.cardIcon}><FaEuroSign /></span><div><h2>От 50 € / месец</h2><p>Една топла супа всеки работен ден. Разнообразно меню. Доставка директно до офиса.</p></div></div></section>
  <section className={styles.section}><h2>🥣 16 супи, с които скуката няма шанс</h2><p>Без опашки, без губене на време и без драматичния въпрос „Какво ще ядем днес?“</p><div className={styles.soupGrid}>{soups.map(([icon,name,text],i)=><div className={styles.soup} key={name}><span>{icon}</span><div><b>{i+1}. {name}</b><p>{text}</p></div></div>)}</div></section>
  <section className={styles.section}><h2>♻️ Вие избирате как да пристига</h2><p>16 различни причини да очаквате обедната почивка с нетърпение.</p><div className={styles.options}><div className={styles.option}><span>🌱</span><b>В термос за многократна употреба</b><br/>Топло, удобно и с грижа за природата.</div><div className={styles.option}><span>🥡</span><b>В индивидуална опаковка</b><br/>Отваряте, хапвате и продължавате да покорявате корпоративния свят.</div></div></section>
  <section className={styles.finalCta}><span className={styles.contactIcon}><FaPhone /></span><div><span className={styles.contactLabel}>Поръчки по телефона</span><h2>Единственият абонамент, който можете да изядете с лъжица.</h2><p>Никакво готвене. Никакво тичане до магазина. Никакви студени сандвичи пред монитора.</p></div><a className={styles.phone} href="tel:+359885899908">+359 885899908</a></section>
  </main>; }
