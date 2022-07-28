import React, { useState } from "react";

import countriesData from "./data/countries";
import styles from "./App.module.css";
import Table from "./components/Table";

const App = () => {
  const [countries, setCountries] = useState([...countriesData]);

  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <Table data={countries} setCountries={setCountries} rowsPerPage={2} />
      </div>
    </main>
  );
};

export default App;
