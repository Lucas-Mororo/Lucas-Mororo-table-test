import { FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function Inputs() {
    const { register, formState: { errors }, } = useForm();
    const [cnpjCpf, setCnpjCpf] = useState('');
    const [fone, setFone] = useState('');

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
                // error={errors.CPFCNPJ?.type === "required"}
                // helperText={errors.CPFCNPJ?.type === "required" && (<span>O campo "CPFCNPJ" é obrigatório!</span>)}
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
                //   error={errors.fone?.type === "required"}
                //   helperText={errors.fone?.type === "required" && (<span>O campo "fone" é obrigatório!</span>)}
                />
            </FormControl>
        )
    };

    return (
        <>
            <div style={{ margin: "10px" }}>
                {exibirInputFone()}
            </div>
            <div style={{ margin: "10px" }}>
                {exibirInputCPFCNPJ()}
            </div>
        </>
    );
};