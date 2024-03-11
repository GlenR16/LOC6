import { Pie } from "react-chartjs-2";
import React, { useState } from "react";

import Chart from "chart.js/auto";
import useAxiosAuth from "../api/api";

export default function GameDistributionChart(props) {
    const api = useAxiosAuth();
    const convertDataForChart = (dataArray) => {
        const lf = [];
        const df = [];
        dataArray.forEach((obj) => {
            const { game, active_time } = obj;
            const index = lf.indexOf(game.name);
            if (index === -1) {
                lf.push(game.name);
                df.push(active_time);
            } else {
                df[index] += active_time;
            }
        });
        return { l: lf, d: df };
    }

    const { l, d } = convertDataForChart(props.data);
    
    
    const dataSet = {
        labels: l,
        datasets: [
            {
                label: "Game Distribution",
                data: d,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <div>
            <h2>Game Distribution Chart</h2>
            <Pie data={dataSet} />
        </div>
    );
}