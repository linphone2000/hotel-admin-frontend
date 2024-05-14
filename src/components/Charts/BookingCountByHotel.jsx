import React, { useEffect, useState } from "react";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const BookingsCountByHotel = ({ bookings, hotels }) => {
  const [data, setData] = useState();

  useEffect(() => {
    const bookingsCountByHotel = bookings.reduce((acc, booking) => {
      const hotelId = booking.hotelID;
      acc[hotelId] = (acc[hotelId] || 0) + 1;
      return acc;
    }, {});

    const hotelNames = bookings.reduce((acc, booking) => {
      acc[booking.hotelID] = booking.hotelName;
      return acc;
    }, {});

    const hotelIds = Object.keys(bookingsCountByHotel);
    const counts = Object.values(bookingsCountByHotel).map((count) =>
      Math.round(count)
    );

    const hotelNamesForIds = hotelIds.map((id) => hotelNames[id]);

    const backgroundColors = generateRandomColors(counts.length);

    setData({
      labels: hotelNamesForIds,
      datasets: [
        {
          label: "Bookings Count by Hotel",
          data: counts,
          backgroundColor: backgroundColors,
          borderColor: "white",
          borderWidth: 1,
        },
      ],
    });
  }, [bookings, hotels]);

  // Function to generate bright colors
  // https://stackoverflow.com/questions/1484506/random-color-generator/60074497
  const generateRandomColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const hue = Math.round(Math.random() * 360);
      const saturation = 85;
      const brightness = 70;
      const color = `hsl(${hue}, ${saturation}%, ${brightness}%)`;
      colors.push(color);
    }
    return colors;
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return data && <Doughnut options={options} data={data}></Doughnut>;
};

export default BookingsCountByHotel;
