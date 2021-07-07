import styles from "../../styles/Home.module.css";
import React from "react";

import { RandomQuote } from "../RandomQuote";

export const HomepageView = () => (
  <>
    <h1 className={styles.title}>Cool Quote</h1>
    <RandomQuote />
  </>
);
