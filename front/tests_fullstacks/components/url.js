import axios from "axios";
const url = axios.create({
  baseURL: "http://192.168.1.174:3000",
});

const stateUrl = "http://192.168.1.174:3000";

export { url, stateUrl };
