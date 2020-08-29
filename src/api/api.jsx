import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {},
});
/////////////////---------Example---------///////////////////////////////
export const exampleAPI = {
  example() {
    return instance.get(`/getData`);
  },
};
