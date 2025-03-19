import { useState, useEffect } from "react";


import useAxios from "../../../utils/useAxios";
const url = import.meta.env.VITE_BASE_URL_DB;
const Booking = () => {
  const api = useAxios();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);




  useEffect(() => {

    const fetchBookings = async () => { 
      try {
        const response = await api.get(`${url}/Booking/get-all-booking`);
        setBookings(response.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchBookings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div> 
      <h1>Bookings</h1>
      {
        bookings.map((booking) => (
          <div key={booking.id}>
            <h2>{booking.id}</h2>
            <p>{booking.status}</p>
          </div>
        ))
      }
    </div>
  );





};

export default Booking;