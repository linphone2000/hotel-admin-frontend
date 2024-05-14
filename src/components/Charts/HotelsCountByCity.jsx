import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HotelsCountByCity = ({ hotels }) => {
  const [data, setData] = useState();

  useEffect(() => {
    const hotelCountByCity = hotels.reduce((acc, hotel) => {
      const city = hotel.city;
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {});

    const cities = Object.keys(hotelCountByCity);
    const counts = Object.values(hotelCountByCity);

    setData({
      labels: cities,
      datasets: [
        {
          label: "Hotel Counts by City",
          data: counts,
          backgroundColor: "rgba(34, 197, 93, 1)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    });
  }, [hotels]);

  let options = {};
  if (data) {
    options = {
      responsive: true,
      scales: {
        y: {
          ticks: {
            stepSize: 1,
            suggestedMin: 0,
            suggestedMax: Math.max(...data?.datasets[0]?.data) + 1 || 10,
          },
        },
      },
    };
  }

  return data && <Bar options={options} data={data}></Bar>;
};

export default HotelsCountByCity;
