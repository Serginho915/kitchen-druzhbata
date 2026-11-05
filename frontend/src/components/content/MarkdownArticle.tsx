import styles from "./MarkdownArticle.module.scss";

export function MarkdownArticle({ content }: { content: string }) {
  const lines = content.split(/\r?\n/);
  return <div className={styles.article}>{lines.map((line, index) => {
    const key = `${index}-${line.slice(0, 12)}`;
    if (!line.trim()) return <div className={styles.spacer} key={key} />;
    if (line.startsWith("### ")) return <h3 key={key}>{line.slice(4)}</h3>;
    if (line.startsWith("## ")) return <h2 key={key}>{line.slice(3)}</h2>;
    if (line.startsWith("# ")) return <h2 key={key}>{line.slice(2)}</h2>;
    if (/^\d+\.\s/.test(line)) return <p className={styles.step} key={key}><b>{line.match(/^\d+/)?.[0]}.</b>{line.replace(/^\d+\.\s*/, "")}</p>;
    if (/^[-*]\s/.test(line)) return <p className={styles.bullet} key={key}>• {line.slice(2)}</p>;
    return <p key={key}>{line.replace(/\*\*/g, "")}</p>;
  })}</div>;
}
