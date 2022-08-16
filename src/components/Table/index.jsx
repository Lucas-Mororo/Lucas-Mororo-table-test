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
  const { register, formState: { errors }, } = useForm();
  const [cnpjCpf, setCnpjCpf] = useState('');
  const [fone, setFone] = useState('');

  const initialMinute = 10, initialSeconds = 0;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);

  React.useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval)
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000)
    return () => {
      clearInterval(myInterval);
    };

    
  });

  const [timer, setTimer] = React.useState(0);
  const [toggle, setToggle] = React.useState(false);

  React.useEffect(() => {
    let counter;
    if (toggle) {
      counter = setInterval(() => setTimer(timer => timer + 1), 1000);
    }
    return () => {
      clearInterval(counter);
    };
  }, [toggle]);

  const handleStart = () => {
    setToggle(true);
  };

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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        {minutes === 0 && seconds === 0
          ? null
          : <>
            <h1> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
          </>
        }
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p>Current timer - {timer}</p>
        <button onClick={handleStart}>Start</button>
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
