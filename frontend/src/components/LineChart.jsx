import React, { useEffect, useState } from "react";
import zoom from "chartjs-plugin-zoom";
import { enUS } from "date-fns/locale";
import { Chart } from "chart.js";
import { CategoryScale } from "chart.js";
import { LinearScale } from "chart.js";
import { PointElement } from "chart.js";
import { LineElement } from "chart.js";
import { Title } from "chart.js";
import { Tooltip } from "chart.js";
import { Legend } from "chart.js";
import { TimeScale } from "chart.js";
import "chartjs-adapter-moment";
import { Line } from "react-chartjs-2";

Chart.register(
  zoom,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const options = {
  devicePixelRatio: 1.5,
  responsive: true,
  interaction: {
    intersect: false,
    mode: "nearest",
  },
  scales: {
    x: {
      position: "bottom",
      type: "time",
      ticks: {
        autoSkip: true,
        autoSkipPadding: 50,
        maxRotation: 0,
      },
      time: {
        displayFormats: {
          hour: "HH:mm",
          minute: "HH:mm",
          second: "HH:mm:ss",
        },
      },
    },
    y: {
      type: "linear",
      position: "left",
    },
  },
  plugins: {
    zoom: {
      limits: {
        x: { min: "original", minRange: 30 * 1000 },
      },
      pan: {
        enabled: true,
        mode: "x",
      },
      zoom: {
        // enabled: true,
        wheel: {
          enabled: true,
        },
        mode: "x",
      },
    },
  },
};

function LineChart({ temp, data }) {
  return (
    <Line
      className=" min-h-[250px] max-h-[200px]"
      options={options}
      data={data}
    />
  );
}

export default LineChart;

/* PREVIOUS CONFIG
const [points, setPoints] = useState([]);
  const [data, setData] = useState({
    datasets: [
      {
        label: "Temp",
        lineTension: 0.5,
        data: points,
        borderColor: "#3B82F6",
        pointStyle: "circle",
        pointRadius: 7,
        pointHoverRadius: 10,
      },
    ],
  });
  useEffect(() => {
    const interval = setInterval(() => {
      let updatedPoints = points;
      updatedPoints.push({ x: Date.now(), y: Math.random() * 10 });
      setPoints(updatedPoints);
      setData({
        datasets: [
          {
            label: "Temp",
            data: points,
          },
        ],
      });
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);
*/