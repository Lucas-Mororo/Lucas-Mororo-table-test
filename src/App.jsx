import React, { useState } from "react";

import countriesData from "./data/countries";
import styles from "./App.module.css";
import Table from "./components/Table";
import PublicRouter from "./router/Public.router";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  const [countries, setCountries] = useState([...countriesData]);

  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <BrowserRouter>
          <PublicRouter />
        </BrowserRouter>
      </div>
    </main>
  );
};

export default App;
