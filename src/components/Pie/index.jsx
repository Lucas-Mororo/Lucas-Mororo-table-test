import React, { useState } from "react";
import { Chart } from 'primereact/chart';
import servicos from "./data/servicos";
import atendimentos from "./data/atendimentos"; "";

const ChartPie = () => {

    let array = [];
    const count = [];

    servicos.map((serv) => {
        atendimentos.map((atend) => {
            atend.servicos.map((element) => {
                if (serv.id === element.id) {
                    array.push({
                        atendimentoId: atend.id,
                        servicoId: serv.id,
                    });
                };
            });
        });
        count.push({ name: serv.name, quant: 0, id: serv.id })
    });

    count.map((count) => {
        array.map((array) => {
            if (count.id === array.servicoId) {
                count.quant = ++count.quant;
            }
        })
    })

    const [chartData] = useState({
        labels: count.map((elemento) => (elemento.name)),
        datasets: [
            {
                data: count.map((elemento) => (elemento.quant)),
                backgroundColor: [
                    "#42A5F5",
                    "#66BB6A",
                    "#FFA726",
                    "#0CF07A",
                    "#A418F0",
                    "#1AF001",
                    "#C2F00C",
                    "#F02E18",
                ],
                hoverBackgroundColor: [
                    "#64B5F6",
                    "#81C784",
                    "#FFB74D",
                    "#0CF07A",
                    "#A418F0",
                    "#1AF001",
                    "#C2F00C",
                    "#F02E18",
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

    return (
        <>
            <div className="card flex justify-content-center">
                <Chart type="pie" data={chartData} options={lightOptions} style={{ position: 'relative', width: '40%' }} />
            </div>
        </>
    );
};

export default ChartPie;
