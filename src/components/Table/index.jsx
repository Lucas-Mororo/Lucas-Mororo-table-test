import { FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import countriesData from "../../data/countries";
import { Chart } from 'primereact/chart';
import useTable from "../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";

const Table = ({ data, rowsPerPage, setCountries }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  const { handleSubmit, register, reset, getValues, setValue, control, formState: { errors }, } = useForm();
  const [cnpjCpf, setCnpjCpf] = useState('');
  const [fone, setFone] = useState('');
  const [chartData] = useState({
    labels: ['A', 'B', 'C'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: [
          "#42A5F5",
          "#66BB6A",
          "#FFA726"
        ],
        hoverBackgroundColor: [
          "#64B5F6",
          "#81C784",
          "#FFB74D"
        ]
      }
    ]
  });

  const [lightOptions] = useState({
    plugins: {
      legend: {
        labels: {
          color: '#495057'
        }
      }
    }
  });

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

  function CNPJ(value) {
    return value
      .replace(/\D+/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }

  function CPF(value) {
    return value
      .replace(/\D+/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
  }

  function exibirInputCPFCNPJ() {
    return (
      <FormControl size={"small"} fullWidth>
        <TextField
          variant='outlined'
          label='CPF/CNPJ:'
          type="text"
          value={cnpjCpf}
          {...register("CPFCNPJ", { required: true })}
          inputProps={{
            minLength: 14,
            maxLength: 18,
          }}
          onChange={(e) => {
            switch (e.target.value.length) {
              case 14:
                setCnpjCpf(CPF(e.target.value));
                break;
              case 18:
                setCnpjCpf(CNPJ(e.target.value));
                break;
              default:
                setCnpjCpf(CPF(e.target.value));
                break;
            }
          }}
          error={errors.CPFCNPJ?.type === "required"}
          helperText={errors.CPFCNPJ?.type === "required" && (<span>O campo "CPFCNPJ" é obrigatório!</span>)}
        />
      </FormControl>
    )
  };

  function phone(value) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
  }

  function exibirInputFone() {
    return (
      <FormControl size={"small"} fullWidth>
        <TextField
          variant='outlined'
          label='Telefone:'
          type="text"
          value={fone}
          {...register("fone", { required: true })}
          inputProps={{
            minLength: 15,
            maxLength: 15,
          }}
          onChange={(e) => {
            setFone(phone(e.target.value));
          }}
          error={errors.fone?.type === "required"}
          helperText={errors.fone?.type === "required" && (<span>O campo "fone" é obrigatório!</span>)}
        />
      </FormControl>
    )
  };

  return (
    <>
      <div className="card flex justify-content-center">
        <Chart type="pie" data={chartData} options={lightOptions} style={{ position: 'relative', width: '40%' }} />
      </div>
      <div style={{ margin: "10px" }}>
        {exibirInputFone()}
      </div>
      <div style={{ margin: "10px" }}>
        {exibirInputCPFCNPJ()}
      </div>
      <div style={{ margin: "10px" }}>
        {exibirFiltroUsuario()}
      </div>
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
