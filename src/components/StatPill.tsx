import styles from "@/components/components.module.css";

type StatPillProps = {
  label: string;
  value: string | number;
};

export function StatPill({ label, value }: StatPillProps) {
  return (
    <span className={styles.statPill}>
      <strong>{value}</strong>
      <small>{label}</small>
    </span>
  );
}
