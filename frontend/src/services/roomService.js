import http from "./httpBookingService";

const roomsAPIEndpoint = "/rooms/";

export const getRooms = () => {
  return http.get(roomsAPIEndpoint);
};
