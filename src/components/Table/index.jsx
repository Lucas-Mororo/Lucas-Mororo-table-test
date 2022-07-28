import { FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import countriesData from "../../data/countries";

import useTable from "../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";

const Table = ({ data, rowsPerPage, setCountries }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);

  function filterCompany(e) {
    if (e.target.value === "") {
      setCountries(countriesData)
    } else {
      let newDate = countriesData.filter((value) => {
        return (
          value.name.match(new RegExp(`^${e.target.value}`, 'gi'))
        )
      });
      setCountries([...newDate]);
    }
  };

  function exibirFiltroUsuario() {
    return (
      <FormControl size="small" fullWidth  >
        <TextField
          fullWidth
          label="Filtrar"
          onChange={(e) => filterCompany(e)}
        />
      </FormControl>
    )
  };

  return (
    <>
      {exibirFiltroUsuario()}
      <table className={styles.table}>
        <thead className={styles.tableRowHeader}>
          <tr>
            <th className={styles.tableHeader}>
              Country
            </th>
            <th className={styles.tableHeader}>
              Capital
            </th>
            <th className={styles.tableHeader}>
              Language
            </th>
          </tr>
        </thead>
        <tbody>
          {slice.map((el) => (
            <tr className={styles.tableRowItems} key={el.id}>
              <td className={styles.tableCell}>{el.name}</td>
              <td className={styles.tableCell}>{el.capital}</td>
              <td className={styles.tableCell}>{el.language}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;
