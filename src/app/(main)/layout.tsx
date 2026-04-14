import { Footer } from "@/components/layout/Footer/Footer";
import styles from "./MainLayout.module.scss";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      {children}
      <Footer />
    </div>
  );
}
