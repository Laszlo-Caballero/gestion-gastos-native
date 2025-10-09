import axiosBase from "axios";
import { ENV } from "../config/env";

const axios = axiosBase.create({
  baseURL: ENV.API_URL,
});

export default axios;
