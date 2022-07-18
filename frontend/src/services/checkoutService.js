import http from "./httpBookingService";

const checkoutAPIEndpoint = "/checkout/";

export const checkout = (checkoutBody) => {
  return http.post(`${checkoutAPIEndpoint}`, {
    type: checkoutBody.type,
    customerID: checkoutBody.customerID,
  });
};
