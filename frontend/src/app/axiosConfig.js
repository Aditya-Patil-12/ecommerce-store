import axios from "axios";
import { baseServerURL } from "./constants";
const modifiedAxios = axios.create({
  baseURL: baseServerURL,
  withCredentials:true,
});

export default modifiedAxios;