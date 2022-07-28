import { Pagination, Stack } from "@mui/material";
import React, { useEffect } from "react";
import styles from "./TableFooter.module.css";

const TableFooter = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);

  function handleChangePage(event, page) {
    console.log("🚀 ~ page", page)
    setPage(page);
  }

  return (
    <div className={styles.tableFooter}>
      <Stack alignItems="center" spacing={2}>
        <Pagination
          count={range.length}
          onChange={handleChangePage}
        />
      </Stack>
    </div>
  );
};

export default TableFooter;
