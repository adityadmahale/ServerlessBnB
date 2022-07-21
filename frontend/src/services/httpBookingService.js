//ref : https://github.com/adityadmahale/adopt/blob/master/src/services/httpService.js
import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL =
  "https://xqet4nlofotprm2yiiz6rvrcm40giliq.lambda-url.us-east-1.on.aws/";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error("Unexpected error occurred");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  put: axios.put,
  post: axios.post,
  delete: axios.delete,
};
