import React, { useEffect } from "react";

const BookingRow = ({ booking }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <tr className="border-b text-gray-700 border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-6 text-left">{booking.userFullName}</td>
      <td className="py-3 px-6 text-left">{booking.roomNumber}</td>
      <td className="py-3 px-6 text-left">{booking.hotelName}</td>
      <td className="py-3 px-6 text-left">
        <ul>
          {booking.stayDates.map((date, index) => (
            <li key={index}>{formatDate(date)}</li>
          ))}
        </ul>
      </td>
      <td className="py-3 px-6 text-left">${booking.totalPrice}</td>
      <td className="py-3 px-6 text-left">
        {formatDate(booking.creationDate)}
      </td>
    </tr>
  );
};

export default BookingRow;
