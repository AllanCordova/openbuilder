"use client";

import styles from "./Spinner.module.css";

export const Spinner = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className={styles.spinner} role="status" aria-label="Loading" />
    </div>
  );
};
