import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function AttentivenessChart(props) {
	const [data, setData] = useState([]);
	const [labels, setLabels] = useState([]);

	const dataSet = {
		labels: labels,
		datasets: [
			{
				label: "Attentiveness in %",
				data: data,
				fill: false,
				borderColor: "rgb(75, 192, 192)",
				tension: 0.1,
			},
		],
	};

	for (let i = 0; i < props.data.length; i++) {
		labels.push(i);
		data.push(props.data[i].active_time);
	}

	

	return (
		<div>
			<h2>Attentiveness Chart</h2>
			<Line data={dataSet} />
		</div>
	);
};

