import http from "./httpBookingService";

const bookingsAPIEndpoint = "/bookings/";

export const getBookings = (id) => {
  return http.get(`${bookingsAPIEndpoint}${id}`);
};

export const addBooking = (booking) => {
  return http.post(`${bookingsAPIEndpoint}`, {
    customerID: booking.customerID,
    type: booking.type,
    active: true,
  });
};
