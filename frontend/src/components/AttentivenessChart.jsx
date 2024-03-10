

/*
    [
        {
            created_at: '2021-08-01T12:00:00Z',
            game_id: 1,
            active_time: 300,
        },
        ...
    ]
*/
import React, {useState, useEffect} from "react";
import { Bar } from "react-chartjs-2";
import useAxiosAuth from "../api/api.js"
import {useSearchParams} from "react-router-dom";

const AttentivenessChart = () => {
	const[data, setData] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();
	const api = useAxiosAuth();

     const dummydata = {
			labels: ["0", "15", "30", "45", "60"], // X-axis labels in minutes
			datasets: [
				{
					label: "Attentiveness", // Y-axis label
					data: [80, 70, 85, 90, 75], // Attentiveness data (on a scale of 100)
					fill: false, // Don't fill area under the line
					borderColor: "rgba(54, 162, 235, 1)", // Line color
					borderWidth: 2,
				},
			],
		};


	

	useEffect(() => {
		const id = searchParams.get("id");
		if(id){
			api.get(`/sessionDataPoints/${id}/`)
			.then((response) => {
				console.log(response.data);
				setData(response.data);
			}).catch((error) => {
				console.log(error);
			});
		}
	}, []);

	return (
		<div>
			<h2>Attentiveness Chart</h2>
			{/* <Bar data={data} options={options} /> */}
		</div>
	);
};

export default AttentivenessChart;
